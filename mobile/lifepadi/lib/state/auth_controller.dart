import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/utils/secure_storage_service.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../entities/user.dart';

part 'auth_controller.g.dart';

/// This controller is an [AsyncNotifier] that holds and handles our authentication state
@riverpod
class AuthController extends _$AuthController {
  final SecureStorageService _secureStorage = SecureStorageService();
  final PreferencesHelper _prefs = PreferencesHelper();
  final _credentialsKey = 'currentUser';

  @override
  Future<User> build() async {
    /// [Fixes iOS issue] Keychain items are not deleted when app is uninstalled:
    /// Because FlutterSecureStorage stores any info in the keychain,
    /// the data doesn't get deleted even if the app is uninstalled.
    // check whether the app is starting for the first time after a fresh install
    const firstRun = 'LifepadiFirstRun';
    if (_prefs.getBool(firstRun) ?? true) {
      // delete FlutterSecureStorage items during uninstall/install
      await _secureStorage.removeAll();

      _prefs.setBool(key: firstRun, value: false);
    }

    _persistenceRefreshLogic();

    return _loginRecoveryAttempt();
  }

  /// Tries to perform a login with the saved token on the persistant storage.
  ///
  // ignore: comment_references
  /// If _anything_ goes wrong, deletes the internal token and returns a [Auth.signedOut].
  Future<User> _loginRecoveryAttempt() async {
    try {
      final credentials = await _secureStorage.get(_credentialsKey);
      if (credentials == null) {
        throw const UnauthorizedException('No credentials found');
      }

      return User.fromJson(jsonDecode(credentials) as JsonMap);
    } catch (_, __) {
      await _secureStorage.remove(_credentialsKey);
      return Future.value(const User.signedOut());
    }
  }

  Future<void> logout() async {
    state = const AsyncData(User.signedOut());
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

      // Add the type to the response data
      response.data!['type'] = 'SignedIn';
      // Extract the refresh token from the response headers
      final refreshToken = response.headers['set-cookie']!
          .toString()
          .split(';')
          .firstWhere((element) => element.contains('refreshToken'))
          .split('=')
          .last;
      response.data!['refreshToken'] = refreshToken;

      final user = User.fromJson(response.data!);
      // Save the user data to the secure storage
      await _saveDetailsToStorage(user);
      final hasEverLoggedIn = _prefs.getBool('hasEverLoggedIn');
      if (hasEverLoggedIn == null) {
        _prefs.setBool(key: 'hasEverLoggedIn', value: true);
      }
      state = AsyncData(user);
    } catch (e) {
      rethrow;
    }
  }

  Future<void> _saveDetailsToStorage(User user) async => _secureStorage.add(
        key: _credentialsKey,
        value: jsonEncode(user.toJson()),
      );

  /// Internal method used to listen authentication state changes.
  /// When the auth object is in a loading state, nothing happens.
  /// When the auth object is in an error state, we choose to remove the token
  /// Otherwise, we expect the current auth value to be reflected in our persitence API
  void _persistenceRefreshLogic() {
    ref.listenSelf((_, next) {
      if (next.isLoading) return;
      if (next.hasError) {
        _secureStorage.remove(_credentialsKey).ignore();
        return;
      }

      next.requireValue.map<void>(
        signedIn: (signedIn) async => _saveDetailsToStorage(signedIn),
        signedOut: (signedOut) async => _secureStorage.remove(_credentialsKey),
      );
    });
  }

  /// Refresh the access token with the refresh token.
  /// If the request fails, it logs out the user.
  /// If the request succeeds, it updates the access token.
  /// Returns the new access token.
  Future<String> refreshToken() async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final refreshToken = state.requireValue.maybeMap(
        signedIn: (signedIn) => signedIn.refreshToken,
        orElse: () => null,
      );
      final options = Options(
        headers: {
          'Cookie': 'refreshToken=$refreshToken',
        },
      );
      final response = await client.post<Map<String, dynamic>>(
        '/auth/refreshToken',
        options: options,
      );

      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      final user = User.fromJson(response.data!);
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
}

/// Exception thrown when a request is unauthorized.
class UnauthorizedException implements Exception {
  const UnauthorizedException(this.message);
  final String message;
}

/// Exception thrown when a request returns 500.
class ServerErrorException implements Exception {
  const ServerErrorException(this.message);
  final String message;
}

/// Phone number verification failed.
class PhoneVerificationFailedException implements Exception {
  const PhoneVerificationFailedException(this.message);
  final String message;
}
