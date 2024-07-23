import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';

import '../utils/assets.gen.dart';
import '../utils/constants.dart';
import '../widgets/logo.dart';
import '../widgets/primary_button.dart';
import '../widgets/toggle_auth_page.dart';

class GetStartedPage extends StatelessWidget {
  const GetStartedPage({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(
              height: MediaQuery.sizeOf(context).height * .475,
              child: Stack(
                children: [
                  Assets.images.handPackageToLady.image(
                    fit: BoxFit.fill,
                    width: double.infinity,
                    height: double.infinity,
                  ),
                  Container(
                    width: double.infinity,
                    height: double.infinity,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.center,
                        stops: const [0.0, 0.3, 0.6],
                        colors: [
                          Colors.white.withOpacity(1),
                          Colors.white.withOpacity(0.6),
                          Colors.white.withOpacity(0),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.w),
              child: Column(
                children: [
                  12.verticalSpace,
                  const Logo(),
                  10.verticalSpace,
                  Text(
                    'Your Innovative Digital Market and  Errand Friend',
                    style: textTheme.headlineLarge?.copyWith(
                      color: const Color(0xFF0F0F0F),
                      fontWeight: FontWeight.w600,
                      letterSpacing: -0.80.r,
                    ),
                  ),
                  12.verticalSpace,
                  Text(
                    'Let us plan your next shopping and handle all your pick-up and delivery services.',
                    style: textTheme.bodyLarge?.copyWith(
                      color: kLightTextColor,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
            16.verticalSpace,
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.w),
              child: PrimaryButton(
                onPressed: () {
                  // TODO: Go to register page
                },
                text: 'Get started',
              ),
            ),
            24.verticalSpace,
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 24.w),
              child: ToggleAuthPage(
                question: 'Already have account?',
                action: 'Login',
                onPressed: () => context.go(const LoginRoute().location),
              ),
            ),
            20.verticalSpace,
          ],
        ),
      ),
    );
  }
}
