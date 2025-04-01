import 'dart:async';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/network_connectivity.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ConnectionFailedPage extends StatefulWidget {
  const ConnectionFailedPage({super.key});

  @override
  State<ConnectionFailedPage> createState() => _ConnectionFailedPageState();
}

class _ConnectionFailedPageState extends State<ConnectionFailedPage> {
  StreamSubscription<InternetConnectionStatus>? _subscription;
  bool _isChecking = false;

  @override
  void initState() {
    super.initState();
    // Listen for connection changes
    _subscription = NetworkConnectivity.onConnectionChange.listen(
      (InternetConnectionStatus status) {
        // If connection is restored, navigate to splash
        if (status == InternetConnectionStatus.connected && mounted) {
          context.go(const SplashRoute().location);
        }
      },
    );
  }

  @override
  void dispose() {
    // Cancel subscription to avoid memory leaks
    _subscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 24.w),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.signal_wifi_off,
                size: 80.r,
                color: kDarkPrimaryColor,
              ),
              24.verticalSpace,
              Text(
                'No Internet Connection',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                textAlign: TextAlign.center,
              ),
              16.verticalSpace,
              Text(
                'Please check your internet connection and try again.',
                style: Theme.of(context).textTheme.bodyLarge,
                textAlign: TextAlign.center,
              ),
              40.verticalSpace,
              PrimaryButton(
                onPressed: _isChecking
                    ? null
                    : () async {
                        if (_isChecking) return;

                        setState(() {
                          _isChecking = true;
                        });

                        // Show loading indicator
                        await showDialog(
                          context: context,
                          barrierDismissible: false,
                          builder: (context) =>
                              const Center(child: GreenyLoadingWheel()),
                        );

                        // Check for connectivity
                        final hasConnection =
                            await NetworkConnectivity.isConnected;

                        // Close loading dialog
                        if (context.mounted) {
                          context.pop();
                        }

                        setState(() {
                          _isChecking = false;
                        });

                        // Navigate to splash if connection is restored
                        if (hasConnection && context.mounted) {
                          context.go(const SplashRoute().location);
                        } else {
                          // Show error toast if still disconnected
                          await showToast(
                            'Still no internet connection. Please try again.',
                            isLong: true,
                            backgroundColor: kDangerColor,
                          );
                        }
                      },
                text: 'Retry',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
