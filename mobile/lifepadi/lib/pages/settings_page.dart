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
          SettingTile(
            name: 'Biometrics',
            child: Consumer(
              builder: (context, ref, child) {
                return SwitchInput(
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
                );
              },
            ),
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
                        context.go(const GetStartedRoute().location);
                      }
                      await showToast('Account deleted successfully');
                    } catch (e) {
                      await showToast(getErrorInfo(e).description);
                    }
                  }
                },
                textColor: kDangerColor,
              );
            },
          ),
        ],
      ),
    );
  }
}
