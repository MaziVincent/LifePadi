import 'dart:async';
import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:native_storage/native_storage.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../entities/user.dart';

part 'auth_controller.g.dart';

/// This controller is an [AsyncNotifier] that holds and handles our authentication state
@riverpod
class AuthController extends _$AuthController {
  IsolatedNativeStorage? _secureStorage;
  NativeStorage? _storage;
  static const _credentialsKey = 'currentUser';

  @override
  Future<User> build() async {
    if (_storage == null) {
      _storage = NativeStorage();
      _secureStorage = _storage!.secure.isolated;
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
      final credentials = await _secureStorage?.read(_credentialsKey);
      if (credentials == null) {
        throw const UnauthorizedException('No credentials found');
      }

      return User.fromJson(jsonDecode(credentials) as JsonMap);
    } catch (_, __) {
      await _secureStorage?.delete(_credentialsKey);
      return Future.value(const User.signedOut());
    }
  }

  Future<void> logout() async {
    state = const AsyncData(User.signedOut());
  }

  /// Login method that performs a request to the server.
  Future<void> login(String email, String password) async {
    final client = ref.read(dioProvider(secured: false));

    try {
      final response = await client.post<JsonMap>(
        '/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );
      if (response.data == null) {
        throw const ServerErrorException('No data returned from the server');
      }

      // Add the type to the response data
      response.data!['type'] = 'SignedIn';
      // Extract the refresh token from the response headers
      final refreshToken = response.headers['Set-Cookie']!
          .toString()
          .split(';')
          .firstWhere((element) => element.contains('refreshToken'))
          .split('=')
          .last;
      response.data!['refreshToken'] = refreshToken;

      final user = User.fromJson(response.data!);
      // Save the user data to the secure storage
      await _saveDetailsToStorage(user);
      final hasEverLoggedIn = _storage?.read('hasEverLoggedIn');
      if (hasEverLoggedIn == null) {
        _storage?.write('hasEverLoggedIn', 'true');
      }
      state = AsyncData(user);
    } catch (e) {
      rethrow;
    }
  }

  Future<String> _saveDetailsToStorage(User user) async =>
      _secureStorage!.write(_credentialsKey, jsonEncode(user.toJson()));

  /// Internal method used to listen authentication state changes.
  /// When the auth object is in a loading state, nothing happens.
  /// When the auth object is in an error state, we choose to remove the token
  /// Otherwise, we expect the current auth value to be reflected in our persitence API
  void _persistenceRefreshLogic() {
    ref.listenSelf((_, next) {
      if (next.isLoading) return;
      if (next.hasError) {
        _secureStorage?.delete(_credentialsKey).ignore();
        return;
      }

      next.requireValue.map<void>(
        signedIn: (signedIn) async => _saveDetailsToStorage(signedIn),
        signedOut: (signedOut) async => _secureStorage?.delete(_credentialsKey),
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
