import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/widgets.dart';

class SettingsPage extends HookWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final biometricsEnabled = useState(true);

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Settings',
      ),
      body: ListView(
        padding: kHorizontalPadding,
        children: [
          SettingTile(
            name: 'Biometrics',
            child: SwitchInput(
              value: biometricsEnabled.value,
              onChanged: (value) {
                // TODO: Update biometrics setting

                // For now, just update the UI
                biometricsEnabled.value = value;
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
