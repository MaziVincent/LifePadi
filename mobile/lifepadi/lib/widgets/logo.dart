import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';

class Logo extends StatelessWidget {
  const Logo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Image.asset(
          'assets/images/logo-dark.png',
          width: 32,
          height: 39.96,
        ),
        const SizedBox(width: 8),
        Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: 'Life',
                style: GoogleFonts.montserrat(
                  color: const Color(0xFF263238),
                  fontSize: 36,
                  fontWeight: FontWeight.w900,
                  height: 0,
                  letterSpacing: -0.36,
                ),
              ),
              TextSpan(
                text: 'padi',
                style: GoogleFonts.montserrat(
                  color: kLightPrimaryColor,
                  fontSize: 36,
                  fontWeight: FontWeight.w900,
                  height: 0,
                  letterSpacing: -0.36,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
