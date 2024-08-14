import 'dart:async';

import 'package:flutter_animate/flutter_animate.dart';
import 'package:native_storage/native_storage.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../entities/auth.dart';

part 'auth_controller.g.dart';

/// A mock of an Authenticated User
const _dummyUser = Auth.signedIn(
  id: -1,
  displayName: 'My Name',
  email: 'My Email',
  token: 'some-updated-secret-auth-token',
);

/// This controller is an [AsyncNotifier] that holds and handles our authentication state
@riverpod
class AuthController extends _$AuthController {
  late final IsolatedNativeStorage _secureStorage;
  static const _storageKey = 'token';

  @override
  Future<Auth> build() async {
    final storage = NativeStorage();
    _secureStorage = storage.secure.isolated;

    _persistenceRefreshLogic();

    return _loginRecoveryAttempt();
  }

  /// Tries to perform a login with the saved token on the persistant storage.
  /// If _anything_ goes wrong, deletes the internal token and returns a [Auth.signedOut].
  Future<Auth> _loginRecoveryAttempt() async {
    try {
      final savedToken = await _secureStorage.read(_storageKey);
      if (savedToken == null) {
        throw const UnauthorizedException('No auth token found');
      }

      return _loginWithToken(savedToken);
    } catch (_, __) {
      _secureStorage.delete(_storageKey).ignore();
      return Future.value(const Auth.signedOut());
    }
  }

  /// Mock of a request performed on logout (might be common, or not, whatevs).
  Future<void> logout() async {
    await Future<void>.delayed(networkRoundTripTime);
    state = const AsyncData(Auth.signedOut());
  }

  /// Mock of a successful login attempt, which results come from the network.
  Future<void> login(String email, String password) async {
    final result = await Future.delayed(
      networkRoundTripTime,
      () => _dummyUser,
    );
    state = AsyncData(result);
  }

  /// Mock of a login request performed with a saved token.
  /// If such request fails, this method will throw an [UnauthorizedException].
  Future<Auth> _loginWithToken(String token) async {
    final logInAttempt = await Future.delayed(
      networkRoundTripTime,
      () => true, // edit this if you wanna play around
    );

    if (logInAttempt) return _dummyUser;

    throw const UnauthorizedException('401 Unauthorized');
  }

  /// Internal method used to listen authentication state changes.
  /// When the auth object is in a loading state, nothing happens.
  /// When the auth object is in an error state, we choose to remove the token
  /// Otherwise, we expect the current auth value to be reflected in our persitence API
  void _persistenceRefreshLogic() {
    ref.listenSelf((_, next) {
      if (next.isLoading) return;
      if (next.hasError) {
        _secureStorage.delete(_storageKey).ignore();
        return;
      }

      next.requireValue.map<void>(
        signedIn: (signedIn) async =>
            _secureStorage.write(_storageKey, signedIn.token),
        signedOut: (signedOut) async => _secureStorage.delete(_storageKey),
      );
    });
  }
}

/// Exception thrown when a request is unauthorized.
class UnauthorizedException implements Exception {
  const UnauthorizedException(this.message);
  final String message;
}

/// Mock of the duration of a network request
final networkRoundTripTime = 2.seconds;
