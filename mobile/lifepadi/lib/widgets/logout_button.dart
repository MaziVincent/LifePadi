import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/primary_outline_button.dart';

import '../state/auth_controller.dart';

class LogoutButton extends ConsumerWidget {
  const LogoutButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PrimaryOutlineButton(
      text: 'Logout'.toUpperCase(),
      onPressed: () async {
        // TODO: Open logout confirmation dialog.

        // TODO: Implement logout confirmation dialog.

        // * For now, just logout:
        showToast('Logging out').ignore();
        await ref
            .read(authControllerProvider.notifier)
            .logout()
            .then((_) => context.go(const LoginRoute().location));
      },
      textStyle: context.textTheme.bodyLarge?.copyWith(
        color: const Color(0xFFF52311),
        fontWeight: FontWeight.w700,
        fontSize: 14.sp,
      ),
      icon: IconsaxPlusLinear.logout,
      iconColor: const Color(0xFFF67C72),
    );
  }
}
