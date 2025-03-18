import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/buttons/logout_button.dart';
import 'package:lifepadi/widgets/buttons/primary_button.dart';
import 'package:lifepadi/widgets/buttons/primary_outline_button.dart';

/// A widget that displays either login/signup buttons or logout button
/// depending on the authenticahotion state.
class ProfileAuthActions extends ConsumerWidget {
  const ProfileAuthActions({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider);

    // Check if user is authenticated
    final isAuthenticated = user.value?.isAuth ?? false;

    if (isAuthenticated) {
      // Show logout button for authenticated users
      return const LogoutButton();
    } else {
      // Show login and signup buttons for unauthenticated users
      return Column(
        children: [
          PrimaryButton(
            text: 'Login'.toUpperCase(),
            onPressed: () => context.go(const LoginRoute().location),
            textStyle: context.textTheme.bodyLarge?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w700,
              fontSize: 14.sp,
            ),
          ),
          12.verticalSpace,
          PrimaryOutlineButton(
            text: 'Create account'.toUpperCase(),
            onPressed: () => context.go(const RegisterRoute().location),
            textStyle: context.textTheme.bodyLarge?.copyWith(
              color: kDarkPrimaryColor,
              fontWeight: FontWeight.w700,
              fontSize: 14.sp,
            ),
            icon: IconsaxPlusLinear.user_add,
          ),
        ],
      );
    }
  }
}
