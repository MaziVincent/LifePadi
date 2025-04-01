import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

final connectivityServiceProvider = Provider<ConnectivityService>((ref) {
  return ConnectivityService();
});

class ConnectivityService {
  final Connectivity _connectivity = Connectivity();

  // Check current connectivity state
  Future<bool> isConnected() async {
    final result = await _connectivity.checkConnectivity();
    return !result.contains(ConnectivityResult.none);
  }

  // Stream of connectivity changes
  Stream<bool> get connectivityStream => _connectivity.onConnectivityChanged
      .map((result) => !result.contains(ConnectivityResult.none));
}
