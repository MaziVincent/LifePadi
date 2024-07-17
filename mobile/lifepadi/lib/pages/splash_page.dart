import 'package:flutter/material.dart';
import 'package:lifepadi/widgets/loading_wheel.dart';
import 'package:lottie/lottie.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Align(
            child: Lottie.asset(
              'assets/animations/comp2.json',
              repeat: false,
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const LoadingWheel(),
              Padding(
                padding: const EdgeInsets.only(bottom: 30, top: 20),
                child: Align(
                  alignment: Alignment.bottomCenter,
                  child: Text(
                    'Easy Life with padi',
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                          color: const Color(0xFFC7C7C7),
                          fontWeight: FontWeight.w400,
                          fontSize: 8.98,
                          letterSpacing: 2.64,
                          height: 0.25,
                        ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
