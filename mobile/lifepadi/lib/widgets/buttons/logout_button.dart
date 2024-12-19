import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/buttons/primary_outline_button.dart';

class LogoutButton extends ConsumerWidget {
  const LogoutButton({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return PrimaryOutlineButton(
      text: 'Logout'.toUpperCase(),
      onPressed: () async {
        await openChoiceDialog(
          context: context,
          title: 'Logout of Lifepadi?',
          description: 'Are you sure you want to log out?',
          icon: IconsaxPlusLinear.logout,
          onYes: () async {
            await ref.read(authControllerProvider.notifier).logout().then((_) {
              if (context.mounted) context.go(const LoginRoute().location);
            });
          },
        );
      },
      textStyle: context.textTheme.bodyLarge?.copyWith(
        color: kDangerColor,
        fontWeight: FontWeight.w700,
        fontSize: 14.sp,
      ),
      icon: IconsaxPlusLinear.logout,
      iconColor: const Color(0xFFF67C72),
    );
  }
}
