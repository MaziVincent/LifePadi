import 'dart:math';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:skeletonizer/skeletonizer.dart';

class CategoryCard extends StatelessWidget {
  const CategoryCard({
    super.key,
    required this.category,
    this.onTap,
  });

  final Category category;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final colors = _generateColors();
    final roundedRectangleBorder = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(4.30.r),
    );

    return InkWell(
      onTap: onTap,
      customBorder: roundedRectangleBorder,
      child: Ink(
        width: 103.26.h,
        height: 103.26.h,
        decoration: ShapeDecoration(
          color: const Color(0xFFFFFBFB),
          shape: roundedRectangleBorder,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Skeleton.leaf(
              child: Container(
                width: 56.79.h,
                height: 56.79.h,
                decoration: BoxDecoration(
                  color: colors.outer,
                  shape: BoxShape.circle,
                ),
                child: category.icon == null
                    ? Image.asset(
                        Assets.images.categories.fruit.path,
                        color: colors.inner,
                      )
                    : CachedNetworkImage(
                        imageUrl: category.icon!,
                        placeholder: (_, __) =>
                            const CircularProgressIndicator.adaptive(),
                        errorWidget: (_, __, ___) => const Icon(Icons.error),
                      ),
              ),
            ),
            7.75.verticalSpace,
            Text(
              category.name,
              textAlign: TextAlign.center,
              style: context.textTheme.bodyMedium?.copyWith(
                color: const Color(0xFF868889),
                fontSize: 12.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

  ({Color outer, Color inner}) _generateColors() {
    // Generate a hash from the category name
    final hash = category.name.hashCode;
    final random = Random(hash); // Use the hash as a seed for Random

    // Base hues for our color families
    final baseHues = <double>[
      120,
      15,
      270,
      180,
      330,
      210,
    ]; // Green, Red, Purple, Cyan, Pink, Blue

    // Select a base hue using the hash
    final baseHue = baseHues[hash % baseHues.length];

    // Generate the inner color
    final innerColor = HSLColor.fromAHSL(
      1,
      baseHue,
      0.6 + (random.nextDouble() * 0.4), // Saturation between 0.6 and 1.0
      0.4 + (random.nextDouble() * 0.3), // Lightness between 0.4 and 0.7
    ).toColor();

    // Generate the outer color based on the inner color
    final outerColor = HSLColor.fromColor(innerColor)
        .withLightness(
          0.85 + (random.nextDouble() * 0.1), // Lightness between 0.85 and 0.95
        )
        .withSaturation(
          0.1 + (random.nextDouble() * 0.2), // Saturation between 0.1 and 0.3
        )
        .toColor();

    return (outer: outerColor, inner: innerColor);
  }
}
