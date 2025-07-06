import 'dart:async';

import 'package:dio/dio.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:lifepadi/services/background_location_service.dart';
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
  final BackgroundLocationService _backgroundLocationService =
      BackgroundLocationService();

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

    // Check if we can restore auth
    final canRestore = await canRestoreAuth();
    logger.i('Can restore auth: $canRestore');

    if (canRestore) {
      final isBiometricEnabled =
          PreferencesHelper.getBool(kBiometricsKey) ?? false;
      final biometricSupported = await _biometricService.isSupported();

      logger.i(
        'Biometric enabled: $isBiometricEnabled, supported: $biometricSupported',
      );

      if (isBiometricEnabled && biometricSupported) {
        // Return Guest which will show login page, biometric auth will be shown first via router
        logger.i(
          'Biometric auth required - returning Guest to trigger biometric flow',
        );
        return const Guest();
      } else {
        // No biometrics or not supported, but we have saved credentials
        // Attempt to recover login directly
        logger.i(
          'Biometric not enabled/supported - attempting direct auth recovery',
        );
        return attemptLoginRecovery();
      }
    }

    // No saved auth, return guest user
    logger.i('No saved auth found - returning Guest');
    return const Guest();
  }

  /// Tries to perform a login with the saved token on the persistant storage.
  ///
  // ignore: comment_references
  /// If _anything_ goes wrong, deletes the internal token and returns a [Auth.signedOut].
  Future<User> attemptLoginRecovery() async {
    try {
      final credentials = await _secureStorage.get(kCredentialsKey);
      if (credentials == null) {
        logger.w('No credentials found for auth recovery');
        throw const UnauthorizedException('No credentials found');
      }

      final user = UserMapper.fromJson(credentials);
      logger.i('Attempting to restore auth for user: ${user.id}');

      state = AsyncData(user);

      // Subscribe to notifications if enabled (only if Firebase is initialized)
      try {
        final notificationsEnabled =
            PreferencesHelper.getNotificationsEnabled();
        if (notificationsEnabled) {
          await FirebaseMessaging.instance.subscribeToTopic(
            'orders-${user.id}',
          );
        }
      } catch (e) {
        logger.w(
          'Firebase not initialized yet, skipping notification subscription: $e',
        );
        // This is not a critical error for auth recovery, so we continue
      }

      // Start background location tracking if user is a rider
      if (user is Rider) {
        await _backgroundLocationService.onRiderLogin(user);
      }

      state = AsyncData(user);
      logger.i('Successfully restored auth for user: ${user.id}');
      return user;
    } catch (error, stackTrace) {
      logger.e('Auth recovery failed', error: error, stackTrace: stackTrace);

      // Only remove credentials if we can't restore auth at all
      if (!(await canRestoreAuth())) {
        await _secureStorage.remove(kCredentialsKey);
        logger.i('Removed invalid credentials from storage');
      }
      return Future.value(const Guest());
    }
  }

  Future<void> logout() async {
    final client = ref.read(dioProvider(secured: false));

    try {
      // Call the v2 logout endpoint with refresh token cookie
      final refreshToken = state.requireValue.refreshToken;
      final options = Options(
        headers: {
          'Cookie': 'refreshToken=$refreshToken',
        },
      );

      final response = await client.get<JsonMap>(
        '/auth/logout',
        options: options,
      );

      // Log the response but don't fail if the server logout fails
      if (response.data != null) {
        logger.d('Server logout successful: ${response.data}');
      }
    } catch (e) {
      // Don't fail the logout process if server logout fails
      logger.w('Server logout failed, continuing with local logout: $e');
    }

    final notificationsEnabled = PreferencesHelper.getNotificationsEnabled();
    if (notificationsEnabled) {
      await FirebaseMessaging.instance.unsubscribeFromTopic(
        'orders-${state.requireValue.id}',
      );
    }

    // Stop background location tracking if user is a rider
    final currentUser = state.requireValue;
    if (currentUser is Rider) {
      await _backgroundLocationService.onRiderLogout();
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

    // Note: Navigation and showing the dialog will be handled in the widget that calls logout
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

      // Extract user data from the new API v2 response structure
      final userData = response.data!['Data'] as JsonMap;

      // Extract the refresh token from the response data (v2 includes it in the response)
      final refreshToken = userData['refreshToken'] as String;

      // Add the refresh token to the user data for the User model
      userData['refreshToken'] = refreshToken;

      final user = User.fromMap(userData);
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

      // Start background location tracking if user is a rider
      if (user is Rider) {
        await _backgroundLocationService.onRiderLogin(user);
      }

      state = AsyncData(user);
    } catch (e) {
      logger.e('Login failed', error: e);
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
      final response = await client.get<JsonMap>(
        '/auth/refreshToken',
        queryParameters: {
          'refreshToken': refreshToken,
        },
      );

      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      // Extract user data from the new API v2 response structure
      final userData = response.data!['Data'] as JsonMap;

      final user = User.fromMap(userData);
      // Save the new token to the secure storage
      state = AsyncData(user);
      await _saveDetailsToStorage(state.requireValue);
      return userData['accessToken'] as String;
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

      // Check if registration was successful using v2 response structure
      final success = response.data!['Success'] as bool? ?? false;
      if (success) {
        return await login(
          email: email,
          password: password,
          phoneNumber: phoneNumber,
        );
      } else {
        final message =
            response.data!['Message'] as String? ?? 'Failed to register';
        throw ServerErrorException(message);
      }
    } catch (e) {
      rethrow;
    }
  }

  /// Send verification code to the user's phone number
  Future<String> sendVerificationCode(String phoneNumber) async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final response = await client.post<JsonMap>(
        '/customer/send-otp',
        data: FormData.fromMap({
          'phoneNumber': phoneNumber,
        }),
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      // Handle v2 API response structure
      final data = response.data!['Data'] as JsonMap;
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
      final response = await client.post<JsonMap>(
        '/customer/verify-otp',
        queryParameters: {
          'pinId': pinId,
          'pin': pin,
        },
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      // Handle v2 API response structure
      final data = response.data!['Data'] as JsonMap;

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
    required String phoneNumber,
  }) async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final response = await client.put<JsonMap>(
        '/auth/password-reset',
        data: FormData.fromMap({
          'NewPassword': newPassword,
          'PhoneNumber': phoneNumber,
        }),
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from server');
      }

      // Handle v2 API response structure
      return response.data!['Message'] as String? ??
          'Password reset successful';
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

      // Handle v2 API response structure
      final data = response.data!['Data'] as JsonMap;
      final customerData = CustomerMapper.fromMap(stripAuth(data));
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
      logger.e('Error updating profile: ', error: e);
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
    try {
      final credentials = await _secureStorage.get(kCredentialsKey);
      if (credentials != null) {
        final user = UserMapper.fromJson(credentials);
        final canRestore = user is! Rider;
        logger.d(
          'Found credentials for user ${user.id}, can restore: $canRestore',
        );
        return canRestore;
      }
      logger.d('No credentials found in secure storage');
      return false;
    } catch (e) {
      logger.w('Error checking if auth can be restored: $e');
      return false;
    }
  }

  /// Remove the user's account
  Future<void> deleteAccount() async {
    final client = ref.read(dioProvider());

    try {
      final response = await client
          .delete<JsonMap>('/customer/delete/${state.requireValue.id}');
      if (response.data == null) {
        throw const ServerErrorException('No data returned from server');
      }

      // Check if deletion was successful using v2 response structure
      final success = response.data!['Success'] as bool? ?? false;
      if (!success) {
        final message =
            response.data!['Message'] as String? ?? 'Failed to delete account';
        throw ServerErrorException(message);
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
