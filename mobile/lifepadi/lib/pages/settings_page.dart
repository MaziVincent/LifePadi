import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart';

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
            onTap: () {
              // TODO: Go to terms and conditions page
            },
          ),
          SettingTile(
            name: 'Privacy Policy',
            onTap: () {
              // TODO: Go to privacy policy page
            },
          ),
          SettingTile(
            name: 'FAQ',
            onTap: () {
              // TODO: Go to FAQ page
            },
          ),
          SettingTile(
            name: 'Delete Account',
            onTap: () {
              // TODO: Go to FAQ page
            },
            textColor: const Color(0xFFF52311),
          ),
        ],
      ),
    );
  }
}
