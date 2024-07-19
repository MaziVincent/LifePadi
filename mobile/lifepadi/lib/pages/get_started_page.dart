import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/utils/constants.dart';

import '../router/routes.dart';
import '../widgets/logo.dart';

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
                  Image.asset(
                    'assets/images/hand-pkg-to-lady.png',
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
            GestureDetector(
              onTap: () {
                // TODO: Go to register page
              },
              child: Container(
                width: 327.w,
                height: 51.h,
                padding: EdgeInsets.symmetric(
                  horizontal: 8.w,
                  vertical: 16.h,
                ),
                decoration: ShapeDecoration(
                  gradient: const LinearGradient(
                    begin: Alignment.centerRight,
                    end: Alignment.centerLeft,
                    colors: [kDarkPrimaryColor, kLightPrimaryColor],
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(40.r),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Get started',
                      style: textTheme.bodyLarge?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                        height: 0.07.r,
                        letterSpacing: -0.88.r,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            26.verticalSpace,
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: 'Already have account? ',
                    style: textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF5F5F5F),
                      height: 0.11.r,
                      fontSize: 14.sp,
                    ),
                  ),
                  TextSpan(
                    recognizer: TapGestureRecognizer()
                      ..onTap = () => context.go(const LoginRoute().location),
                    text: 'Login',
                    style: textTheme.bodyLarge?.copyWith(
                      color: kDarkPrimaryColor,
                      fontWeight: FontWeight.w600,
                      height: 0.11.r,
                      fontSize: 16.sp,
                    ),
                  ),
                ],
              ),
              textAlign: TextAlign.center,
            ),
            10.verticalSpace,
          ],
        ),
      ),
    );
  }
}
