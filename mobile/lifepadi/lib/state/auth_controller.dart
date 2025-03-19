import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/state/product.dart';
import 'package:lifepadi/state/services.dart';
import 'package:lifepadi/state/vendors.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/state/wishlist.dart';
import 'package:lifepadi/utils/biometric_service.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/utils/secure_storage_service.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/user.dart';

part 'auth_controller.g.dart';

/// This controller is an [AsyncNotifier] that holds and handles our authentication state
@riverpod
class AuthController extends _$AuthController {
  final SecureStorageService _secureStorage = SecureStorageService();
  final BiometricService _biometricService = BiometricService();

  @override
  Future<User> build() async {
    /// [Fixes iOS issue] Keychain items are not deleted when app is uninstalled:
    /// Because FlutterSecureStorage stores any info in the keychain,
    /// the data doesn't get deleted even if the app is uninstalled.
    // check whether the app is starting for the first time after a fresh install
    const firstRun = 'LifepadiFirstRun';
    if (PreferencesHelper.getBool(firstRun) ?? true) {
      // delete FlutterSecureStorage items during uninstall/install
      await _secureStorage.removeAll();

      await PreferencesHelper.setBool(key: firstRun, value: false);
    }

    _persistenceRefreshLogic();

    if (await canRestoreAuth()) {
      final isBiometricEnabled =
          PreferencesHelper.getBool(kBiometricsKey) ?? false;
      if (isBiometricEnabled) {
        return const Guest();
      }
    }

    return attemptLoginRecovery();
  }

  /// Tries to perform a login with the saved token on the persistant storage.
  ///
  // ignore: comment_references
  /// If _anything_ goes wrong, deletes the internal token and returns a [Auth.signedOut].
  Future<User> attemptLoginRecovery() async {
    try {
      final credentials = await _secureStorage.get(kCredentialsKey);
      if (credentials == null) {
        throw const UnauthorizedException('No credentials found');
      }

      await FirebaseMessaging.instance.subscribeToTopic(
        'orders-${UserMapper.fromJson(credentials).id}',
      );
      final user = UserMapper.fromJson(credentials);
      state = AsyncData(user);
      return user;
    } catch (_, __) {
      if (!(await canRestoreAuth())) {
        await _secureStorage.remove(kCredentialsKey);
      }
      return Future.value(const Guest());
    }
  }

  Future<void> logout() async {
    final notificationsEnabled = PreferencesHelper.getNotificationsEnabled();
    if (notificationsEnabled) {
      await FirebaseMessaging.instance.unsubscribeFromTopic('general');
      await FirebaseMessaging.instance.unsubscribeFromTopic(
        'orders-${state.requireValue.id}',
      );
    }

    await PreferencesHelper.clear();
    // So that onboarding page is not shown again
    await PreferencesHelper.setBool(key: kHasSeenOnboarding, value: true);
    await PreferencesHelper.setBool(key: kHasEverLoggedIn, value: true);

    // Clear all the cached data
    ref
      ..invalidate(cartStateProvider)
      ..invalidate(productCategoriesProvider)
      ..invalidate(categoryProductsProvider)
      ..invalidate(categoryVendorsProvider)
      ..invalidate(locationsProvider)
      ..invalidate(ordersProvider)
      ..invalidate(orderProvider)
      ..invalidate(riderOrdersProvider)
      ..invalidate(productProvider)
      ..invalidate(servicesProvider)
      ..invalidate(vendorsProvider)
      ..invalidate(vendorProductsProvider)
      ..invalidate(vendorsByServiceIdProvider)
      ..invalidate(wishlistProvider)
      ..invalidate(transactionHistoryProvider);

    await _secureStorage.remove(kCredentialsKey);
    state = const AsyncData(Guest());
  }

  /// Login method that performs a request to the server.
  Future<void> login({
    required String email,
    required String password,
    required String phoneNumber,
    bool usePhone = false,
  }) async {
    final client = ref.read(dioProvider(secured: false));
    final data = {'password': password}..addAll(
        usePhone ? {'phoneNumber': phoneNumber} : {'email': email},
      );

    try {
      final response = await client.post<JsonMap>(
        '/auth/login',
        data: data,
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      // Extract the refresh token from the response headers
      final refreshToken = response.headers['set-cookie']!
          .toString()
          .split(';')
          .firstWhere((element) => element.contains('refreshToken'))
          .split('=')
          .last;
      response.data!['refreshToken'] = refreshToken;

      final user = User.fromMap(response.data!);
      // Save the user data to the secure storage
      await _saveDetailsToStorage(user);
      final hasEverLoggedIn = PreferencesHelper.getBool(kHasEverLoggedIn);
      if (hasEverLoggedIn == null) {
        await PreferencesHelper.setBool(key: kHasEverLoggedIn, value: true);
      }
      final notificationsEnabled = PreferencesHelper.getNotificationsEnabled();
      if (notificationsEnabled) {
        await FirebaseMessaging.instance.subscribeToTopic('orders-${user.id}');
      }
      state = AsyncData(user);
    } catch (e) {
      rethrow;
    }
  }

  Future<void> _saveDetailsToStorage(User user) async => _secureStorage.add(
        key: kCredentialsKey,
        value: user.toJson(),
      );

  /// Internal method used to listen authentication state changes.
  /// When the auth object is in a loading state, nothing happens.
  /// When the auth object is in an error state, we choose to remove the token
  /// Otherwise, we expect the current auth value to be reflected in our persitence API
  void _persistenceRefreshLogic() {
    listenSelf((_, next) async {
      if (next.isLoading) return;
      if (next.hasError) {
        if (!(await canRestoreAuth())) {
          await _secureStorage.remove(kCredentialsKey);
        }
        return;
      }

      final user = next.requireValue;
      if (user.isAuth) {
        _saveDetailsToStorage(user).ignore();
      } else {
        if (!(await canRestoreAuth())) {
          await _secureStorage.remove(kCredentialsKey);
        }
      }
    });
  }

  /// Refresh the access token with the refresh token.
  /// If the request fails, it logs out the user.
  /// If the request succeeds, it updates the access token.
  /// Returns the new access token.
  Future<String> refreshToken() async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final refreshToken = state.requireValue.refreshToken;
      final options = Options(
        headers: {
          'Cookie': 'refreshToken=$refreshToken',
        },
      );
      final response = await client.post<JsonMap>(
        '/auth/refreshToken',
        options: options,
      );

      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      final user = User.fromMap(response.data!);
      // Save the new token to the secure storage
      state = AsyncData(user);
      await _saveDetailsToStorage(state.requireValue);
      return response.data!['accessToken'] as String;
    } catch (e) {
      rethrow;
    }
  }

  Future<void> register({
    required String firstName,
    required String lastName,
    required String email,
    required String phoneNumber,
    required String password,
  }) async {
    final client = ref.read(dioProvider(secured: false));
    final formData = FormData.fromMap({
      'FirstName': firstName,
      'LastName': lastName,
      'Email': email,
      'PhoneNumber': phoneNumber,
      'Password': password,
    });

    try {
      final response = await client.post<JsonMap>(
        '/customer/create',
        data: formData,
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      // Login the user after registration
      if (response.statusCode! >= 200) {
        return await login(
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        );
      } else {
        throw const ServerErrorException('Failed to register');
      }
    } catch (e) {
      rethrow;
    }
  }

  /// Send verification code to the user's phone number
  Future<String> sendVerificationCode(String phoneNumber) async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final response = await client.post<String>(
        '/customer/send-otp',
        data: FormData.fromMap({
          'phoneNumber': phoneNumber,
        }),
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }
      final data = jsonDecode(response.data!) as JsonMap;

      return data['pinId'].toString();
    } catch (e) {
      rethrow;
    }
  }

  /// Make a request to verify the user's phone number with the entered pin
  Future<bool> verifyPhoneNumber({
    required String pinId,
    required String pin,
  }) async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final response = await client.post<String>(
        '/customer/verify-otp',
        queryParameters: {
          'pinId': pinId,
          'pin': pin,
        },
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }
      final data = jsonDecode(response.data!) as JsonMap;

      final verified = data['verified'] as bool;
      if (!verified) {
        final attemptsLeft = data['attemptsRemaining'] as int;
        final message =
            'Verification failed. You have $attemptsLeft attempts remaining.';
        throw PhoneVerificationFailedException(message);
      }
      return verified;
    } catch (e) {
      rethrow;
    }
  }

  /// Make a request to reset the user's password
  Future<String> resetPassword({
    required String newPassword,
    required int userId,
  }) async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final response = await client.post<JsonMap>(
        '/auth/password-reset/$userId',
        data: FormData.fromMap({
          'NewPassword': newPassword,
        }),
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from server');
      }
      return response.data!['message'] as String;
    } catch (e) {
      rethrow;
    }
  }

  /// Update a customer's profile details
  ///
  /// This method makes a request to the server to update the user's profile details.
  /// If the request is successful, it updates the user's details in the secure storage.
  Future<void> updateProfile({
    required Customer customer,
  }) async {
    final client = ref.read(dioProvider());

    try {
      final response = await client.put<JsonMap>(
        '/customer/update/${customer.id}',
        data: FormData.fromMap(customer.toMap()),
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from server');
      }

      final customerData = CustomerMapper.fromMap(response.data!);
      final currentCustomer = state.requireValue as Customer;
      final updatedCustomer = currentCustomer.copyWith(
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
        address: customerData.address,
        dateOfBirth: customerData.dateOfBirth,
      );
      // Save the updated details to the secure storage
      await _saveDetailsToStorage(updatedCustomer);
      // Update the state with the new details
      state = AsyncData(updatedCustomer);
    } catch (e) {
      rethrow;
    }
  }

  /// Check if biometrics is supported on the device
  Future<bool> isBiometricsSupported() async {
    return _biometricService.isSupported();
  }

  /// Enable or disable biometric authentication
  Future<void> setBiometricsEnabled({required bool enabled}) async {
    if (enabled) {
      final isSupported = await isBiometricsSupported();
      if (!isSupported) {
        throw const BiometricAuthenticationException(
          'Device does not support biometric authentication',
        );
      }
      final authenticated = await _biometricService.authenticate();
      if (!authenticated) {
        throw const BiometricAuthenticationException(
          'Biometric authentication failed',
        );
      }
    }
    await PreferencesHelper.setBool(key: kBiometricsKey, value: enabled);
  }

  /// Check if there's auth to restore in secure storage
  Future<bool> canRestoreAuth() async {
    final credentials = await _secureStorage.get(kCredentialsKey);
    if (credentials != null) {
      final user = UserMapper.fromJson(credentials);
      return user is! Rider;
    }
    return false;
  }

  /// Remove the user's account
  Future<void> deleteAccount() async {
    final client = ref.read(dioProvider());

    try {
      final response = await client
          .delete<String>('/customer/delete/${state.requireValue.id}');
      if (response.data == null) {
        throw const ServerErrorException('No data returned from server');
      }
      await logout();
    } catch (e) {
      rethrow;
    }
  }

  /// Update the user's balance in the wallet
  Future<void> updateBalance(double balance) async {
    await state.maybeWhen(
      data: (user) async {
        if (user is Customer) {
          final updated =
              user.copyWith(wallet: user.wallet.copyWith(balance: balance));
          await _saveDetailsToStorage(updated);
          state = AsyncData(updated);
        }
      },
      orElse: () {},
    );
  }
}
