import 'package:hooks_riverpod/hooks_riverpod.dart';

import 'network_condition.dart';

final connectivityServiceProvider = Provider<ConnectivityService>((ref) {
  return ConnectivityService();
});

class ConnectivityService {
  // Check current connectivity state
  Future<bool> isConnected() async {
    if ($networkCondition.value == null) {
      await $networkCondition.initState();
      // Wait a moment for the initial check to complete
      await Future<Duration>.delayed(const Duration(milliseconds: 300));
    }
    return $networkCondition.value ?? false;
  }

  // Stream of connectivity changes
  Stream<bool> get connectivityStream =>
      Stream<bool>.periodic(const Duration(seconds: 1))
          .asyncMap((_) => isConnected());
}
