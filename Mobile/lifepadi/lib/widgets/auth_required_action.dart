import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/buttons/primary_button.dart';
import 'package:lifepadi/widgets/buttons/primary_outline_button.dart';

/// A widget that displays a dialog prompting the user to log in or register
/// if they try to access a feature that requires authentication.
class AuthRequiredAction {
  /// Shows a dialog prompting the user to log in or register.
  /// Returns true if the user is already authenticated or if they navigate to login/register screens.
  /// Returns false if the user cancels the dialog without logging in.
  static Future<bool> showAuthDialog(BuildContext context) async {
    final result = await showDialog<bool>(
      context: context,
      builder: (BuildContext context) {
        return Consumer(
          builder: (context, ref, child) {
            final user = ref.watch(authControllerProvider);

            // If user is already authenticated, dismiss the dialog with true
            if (user.value?.isAuth ?? false) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                Navigator.of(context).pop(true);
              });
              return const SizedBox();
            }

            return Dialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16.r),
              ),
              child: Padding(
                padding: EdgeInsets.all(24.r),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Sign in Required',
                      style: context.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: kDarkPrimaryColor,
                      ),
                    ),
                    16.verticalSpace,
                    Text(
                      'This feature requires you to sign in to your account.',
                      style: context.textTheme.bodyMedium,
                      textAlign: TextAlign.center,
                    ),
                    24.verticalSpace,
                    PrimaryButton(
                      text: 'LOG IN',
                      onPressed: () {
                        Navigator.of(context).pop(true);
                        context.go(const LoginRoute().location);
                      },
                    ),
                    12.verticalSpace,
                    PrimaryOutlineButton(
                      text: 'CREATE ACCOUNT',
                      onPressed: () {
                        Navigator.of(context).pop(true);
                        context.go(const RegisterRoute().location);
                      },
                    ),
                    12.verticalSpace,
                    TextButton(
                      onPressed: () => Navigator.of(context).pop(false),
                      child: Text(
                        'Not now',
                        style: context.textTheme.bodyMedium?.copyWith(
                          color: Colors.grey[600],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );

    return result ?? false;
  }

  /// Checks if a user is authenticated and shows the auth dialog if not.
  /// Returns true if authenticated or if the user chooses to log in/register.
  /// Returns false if the user cancels.
  static Future<bool> checkAuth(BuildContext context, WidgetRef ref) async {
    final user = ref.read(authControllerProvider);

    if (user.value?.isAuth ?? false) {
      return true;
    }

    return showAuthDialog(context);
  }
}
