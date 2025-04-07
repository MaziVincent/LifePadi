import 'dart:async';

import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:url_launcher/url_launcher.dart';

class SettingsPage extends HookWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final biometricsEnabled = useState(
      PreferencesHelper.getBool(kBiometricsKey) ?? false,
    );

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Settings',
      ),
      body: SuperListView(
        padding: kHorizontalPadding,
        children: [
          Consumer(
            builder: (context, ref, child) {
              final user = ref.watch(authControllerProvider);
              final isAuthenticated = user.value?.isAuth ?? false;

              // Only show biometrics option if user is logged in
              if (isAuthenticated) {
                return SettingTile(
                  name: 'Biometrics',
                  child: SwitchInput(
                    value: biometricsEnabled.value,
                    onChanged: (value) async {
                      try {
                        await ref
                            .read(authControllerProvider.notifier)
                            .setBiometricsEnabled(enabled: value);
                        biometricsEnabled.value = value;
                      } catch (e) {
                        await showToast(getErrorInfo(e).description);
                      }
                    },
                  ),
                );
              }

              return const SizedBox
                  .shrink(); // Return empty widget if not authenticated
            },
          ),
          SettingTile(
            name: 'Terms and Conditions',
            onTap: () async => launchUrl(Uri.parse(kTermsAndConditionsUrl)),
          ),
          SettingTile(
            name: 'Privacy Policy',
            onTap: () async => launchUrl(Uri.parse(kPrivacyPolicyUrl)),
          ),
          SettingTile(
            name: 'FAQ',
            onTap: () async => launchUrl(Uri.parse(kFaqUrl)),
          ),
          Consumer(
            builder: (context, ref, child) {
              final user = ref.watch(authControllerProvider);
              final isAuthenticated = user.value?.isAuth ?? false;

              // Only show delete account option if user is logged in
              if (isAuthenticated) {
                return SettingTile(
                  name: 'Delete Account',
                  onTap: () async {
                    final confirm = await openChoiceDialog(
                      context: context,
                      title: 'Delete Account',
                      description:
                          'Are you sure you want to delete your account? This action can not be undone.',
                      icon: IconsaxPlusLinear.trash,
                    );

                    if (confirm == true) {
                      try {
                        await ref
                            .read(authControllerProvider.notifier)
                            .deleteAccount();
                        if (context.mounted) {
                          unawaited(context.push(const LoginRoute().location));
                        }
                        await showToast('Account deleted successfully');
                      } catch (e) {
                        await showToast(getErrorInfo(e).description);
                      }
                    }
                  },
                  textColor: kDangerColor,
                );
              }

              return const SizedBox
                  .shrink(); // Return empty widget if not authenticated
            },
          ),
        ],
      ),
    );
  }
}
