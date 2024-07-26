import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/loading_wheel.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Align(
            child: Assets.animations.logo.lottie(
              repeat: false,
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const LoadingWheel(),
              16.verticalSpace,
              Align(
                alignment: Alignment.bottomCenter,
                child: Text(
                  'Easy Life with padi',
                  style: context.textTheme.titleSmall?.copyWith(
                    color: const Color(0xFFC7C7C7),
                    fontWeight: FontWeight.w400,
                    fontSize: 8.98.sp,
                    letterSpacing: 2.64.r,
                    height: 0.25.r,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              29.verticalSpace,
            ],
          ),
        ],
      ),
    );
  }
}
