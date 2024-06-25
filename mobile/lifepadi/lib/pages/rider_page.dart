import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

import '../widgets/logout_button.dart';

class RiderPage extends ConsumerWidget {
  const RiderPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Rider Page', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 20),
            Text('Welcome, Rider'),
            SizedBox(height: 8),
            Text("You're currently viewing the Rider page."),
            SizedBox(height: 40),
            LogoutButton(),
          ],
        ),
      ),
    );
  }
}
