import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/widgets/buttons/my_icon_button.dart';

class GlassmorphicBackButton extends StatelessWidget {
  const GlassmorphicBackButton({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return MyIconButton(
      onPressed: () => context.pop(),
      icon: IconsaxPlusLinear.arrow_left_1,
      backgroundColor: const Color(0x19F5F5F5),
      iconColor: Colors.white,
    );
  }
}
