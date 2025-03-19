import 'dart:ui';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

import '../utils/assets.gen.dart';
import '../utils/constants.dart';

class GetStartedPage extends StatelessWidget {
  const GetStartedPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(
              height: .35.sh,
              child: Stack(
                children: [
                  Assets.images.handPackageToLady.image(
                    fit: BoxFit.fill,
                    width: double.infinity,
                    height: double.infinity,
                  ),
                  // Add glassmorphic home button at top left
                  Positioned(
                    left: 16.w,
                    top: 16.h,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(12.r),
                      child: BackdropFilter(
                        filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
                        child: Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 16.w,
                            vertical: 8.h,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.3),
                            borderRadius: BorderRadius.circular(12.r),
                            border: Border.all(
                              color: Colors.white.withOpacity(0.5),
                            ),
                          ),
                          child: GestureDetector(
                            onTap: () => context.pop(),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(Icons.home, color: Colors.white),
                                6.horizontalSpace,
                                Text(
                                  'Home',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w500,
                                    fontSize: 14.sp,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
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
            Column(
              children: [
                Padding(
                  padding: kHorizontalPadding,
                  child: Column(
                    children: [
                      10.verticalSpace,
                      const LogoWithName(),
                      10.verticalSpace,
                      Text(
                        'Your Innovative Digital Market and  Errand Friend',
                        style: context.textTheme.headlineLarge?.copyWith(
                          color: kDarkTextColor,
                          fontSize: 32.sp,
                          fontWeight: FontWeight.w600,
                          letterSpacing: -0.80.r,
                        ),
                      ),
                      12.verticalSpace,
                      Text(
                        'Let us plan your next shopping and handle all your pick-up and delivery services.',
                        style: context.textTheme.bodyLarge?.copyWith(
                          color: kLightTextColor,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),
                ),
                16.verticalSpace,
                Padding(
                  padding: kHorizontalPadding,
                  child: PrimaryButton(
                    onPressed: () => context.go(const RegisterRoute().location),
                    text: 'Get started',
                  ),
                ),
                12.verticalSpace,
                Padding(
                  padding: kHorizontalPadding,
                  child: PrimaryOutlineButton(
                    text: 'Login',
                    onPressed: () => context.go(const LoginRoute().location),
                  ),
                ),
                14.verticalSpace,
              ],
            ),
          ],
        ),
      ),
    );
  }
}
