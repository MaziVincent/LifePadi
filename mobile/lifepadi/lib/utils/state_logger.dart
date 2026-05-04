// ignore_for_file: strict_raw_type

import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/utils/helpers.dart';

/// Useful to log state change in our application
/// Read the logs and you'll better understand what's going on under the hood
class StateLogger extends ProviderObserver {
  const StateLogger();

  /// Names (or runtime types) of providers whose state contains sensitive
  /// data such as auth tokens; we log only that they changed, not the value.
  static const _redactedProviders = {
    'authController',
    'authControllerProvider',
    'AuthController',
  };

  bool _isSensitive(ProviderBase provider) {
    final name = provider.name ?? provider.runtimeType.toString();
    return _redactedProviders.any(name.contains);
  }

  @override
  void didUpdateProvider(
    ProviderBase provider,
    Object? previousValue,
    Object? newValue,
    ProviderContainer container,
  ) {
    if (_isSensitive(provider)) {
      logger.i({
        'provider': '${provider.name ?? provider.runtimeType}',
        'oldValue': '<redacted>',
        'newValue': '<redacted>',
      });
      return;
    }

    logger.i({
      'provider': '${provider.name ?? provider.runtimeType}',
      'oldValue': '$previousValue',
      'newValue': '$newValue',
    });
  }
}
