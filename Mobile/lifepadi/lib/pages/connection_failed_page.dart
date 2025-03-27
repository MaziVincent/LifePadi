import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/widgets/buttons/buttons.dart';

class ConnectionFailedPage extends StatelessWidget {
  const ConnectionFailedPage({
    super.key,
    required this.onRetry,
  });
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24.0.r),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(),
              Assets.animations.logo.lottie(repeat: true),
              SizedBox(height: 32.h),
              Text(
                'No Internet Connection',
                style: TextStyle(
                  fontSize: 22.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16.h),
              Text(
                'Please check your internet connection and try again.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16.sp,
                  color: Colors.grey[600],
                ),
              ),
              const Spacer(),
              PrimaryButton(onPressed: onRetry, text: 'Retry'),
              SizedBox(height: 32.h),
            ],
          ),
        ),
      ),
    );
  }
}
