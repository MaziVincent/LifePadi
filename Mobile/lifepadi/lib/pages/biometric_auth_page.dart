import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/biometric_service.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:remixicon/remixicon.dart';

class BiometricAuthPage extends HookConsumerWidget {
  const BiometricAuthPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = context.textTheme;
    final authenticating = useState(true);
    final errorMessage = useState<String?>(null);

    Future<void> authenticateWithBiometrics() async {
      try {
        authenticating.value = true;
        errorMessage.value = null;
        final authenticated = await BiometricService().authenticate();

        if (authenticated) {
          // Attempt to restore previous login
          final user = await ref
              .read(authControllerProvider.notifier)
              .attemptLoginRecovery();

          if (user.isAuth) {
            // If user is authenticated, go to home
            // ignore: use_build_context_synchronously
            context.go(const HomeRoute().location);
          } else {
            // Authentication failed
            // ignore: use_build_context_synchronously
            errorMessage.value =
                'Authentication failed. Please try again or use password.';
            authenticating.value = false;
          }
        } else {
          errorMessage.value =
              'Biometric authentication canceled. Please try again or use password.';
          authenticating.value = false;
        }
      } catch (e) {
        logger.e(
          'Error authenticating with biometrics',
          error: e,
        );
        errorMessage.value =
            'Authentication failed. Please try again or use password.';
        authenticating.value = false;
      }
    }

    // Trigger biometric authentication when page loads
    useEffect(
      () {
        WidgetsBinding.instance.addPostFrameCallback((_) async {
          await authenticateWithBiometrics();
        });
        return null;
      },
      const [],
    );

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Assets.images.authHeros.login.image(
              height: 0.49.sh,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 0.51.sh,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.vertical(
                    top: Radius.circular(28.r),
                  ),
                ),
                padding: EdgeInsets.only(
                  left: 24.w,
                  right: 24.w,
                  top: 34.72.h,
                ),
                child: Column(
                  children: [
                    Text(
                      'Biometric Authentication',
                      style: textTheme.titleMedium?.copyWith(
                        color: const Color(0xFF151522),
                        fontSize: 28.sp,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    16.verticalSpace,
                    Text(
                      'Tap to authenticate with biometrics',
                      style: textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF999999),
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w300,
                      ),
                    ),
                    40.verticalSpace,
                    Column(
                      children: [
                        GestureDetector(
                          onTap: authenticateWithBiometrics,
                          child: Icon(
                            Remix.fingerprint_line,
                            size: 80.sp,
                            color: kDarkPrimaryColor,
                          ),
                        ),
                        16.verticalSpace,
                        if (errorMessage.value != null) ...[
                          Text(
                            errorMessage.value!,
                            style: textTheme.bodyMedium?.copyWith(
                              color: Colors.red,
                              fontSize: 14.sp,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          14.verticalSpace,
                        ],
                      ],
                    ),
                    20.verticalSpace,
                    TextButton(
                      onPressed: () {
                        // Navigate to login page
                        context.push(const LoginRoute().location);
                      },
                      child: Text(
                        'Login with Password',
                        style: textTheme.bodySmall?.copyWith(
                          color: kDarkPrimaryColor,
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
