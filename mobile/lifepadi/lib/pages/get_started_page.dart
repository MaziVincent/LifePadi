import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/utils/constants.dart';

import '../router/routes.dart';
import '../widgets/logo.dart';

class GetStartedPage extends StatelessWidget {
  const GetStartedPage({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            children: [
              SizedBox(
                height: size.height * .48,
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
                padding: const EdgeInsets.symmetric(horizontal: 28),
                child: Column(
                  children: [
                    const SizedBox(height: 12),
                    const Logo(),
                    const SizedBox(height: 10),
                    Text(
                      'Your Innovative Digital Market and  Errand Friend',
                      style: textTheme.headlineLarge?.copyWith(
                        color: const Color(0xFF0F0F0F),
                        fontWeight: FontWeight.w600,
                        letterSpacing: -0.80,
                      ),
                    ),
                    const SizedBox(height: 10),
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
              const SizedBox(height: 16),
              GestureDetector(
                onTap: () {
                  // TODO: Go to register page
                },
                child: Container(
                  width: 327,
                  height: 51,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                  decoration: ShapeDecoration(
                    gradient: const LinearGradient(
                      begin: Alignment.centerRight,
                      end: Alignment.centerLeft,
                      colors: [kDarkPrimaryColor, kLightPrimaryColor],
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(40),
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
                          height: 0.07,
                          letterSpacing: -0.88,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 14),
              RichText(
                text: TextSpan(
                  children: [
                    const TextSpan(
                      text: 'Already have account? ',
                      style: TextStyle(
                        color: Color(0xFF5F5F5F),
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    TextSpan(
                      recognizer: TapGestureRecognizer()
                        ..onTap = () => context.go(const LoginRoute().location),
                      text: 'Login',
                      style: const TextStyle(
                        color: Color(0xFF629D03),
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
