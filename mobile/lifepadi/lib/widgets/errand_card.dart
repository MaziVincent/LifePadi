import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:skeletonizer/skeletonizer.dart';

class ErrandCard extends StatelessWidget {
  const ErrandCard({
    super.key,
    required this.name,
    required this.imageUrl,
    required this.onTap,
    this.isNetworkImage = true,
  });

  final String name;
  final String imageUrl;
  final VoidCallback onTap;
  final bool isNetworkImage;

  @override
  Widget build(BuildContext context) {
    final (:outerColor, :innerColor) = _generateColors();

    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        height: 100.13.r,
        width: 73.63.r,
        child: Column(
          children: [
            Skeleton.leaf(
              child: Container(
                height: 73.63.r,
                width: 73.63.r,
                decoration: ShapeDecoration(
                  color: outerColor,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(25.99.r),
                  ),
                ),
                padding: const EdgeInsets.fromLTRB(14, 13.87, 13.38, 13.51).r,
                child: Container(
                  width: 46.24.r,
                  height: 46.24.r,
                  decoration: ShapeDecoration(
                    color: innerColor,
                    shape: const CircleBorder(),
                  ),
                  padding: const EdgeInsets.all(11).r,
                  child: isNetworkImage
                      ? CachedNetworkImage(
                          imageUrl: imageUrl,
                          placeholder: (_, __) =>
                              const CircularProgressIndicator.adaptive(),
                          errorWidget: (_, __, ___) => const Icon(Icons.error),
                          width: 24.r,
                          height: 24.r,
                        )
                      : Image.asset(
                          imageUrl,
                          width: 24.r,
                          height: 24.r,
                        ),
                ),
              ),
            ),
            6.5.verticalSpace,
            Text(
              name,
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFF2D4379),
                fontSize: 12.sp,
                fontWeight: FontWeight.w400,
                overflow: TextOverflow.ellipsis,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Color _colorFromHash({
    required double brightness,
    required double saturation,
  }) {
    final hash = name.hashCode;
    final hue = (hash % 360).toDouble(); // Base hue from 0 to 360
    return HSVColor.fromAHSV(1, hue, saturation, brightness).toColor();
  }

  ({Color outerColor, Color innerColor}) _generateColors() {
    const baseBrightness = 1.0;
    const baseSaturation = 0.1;

    // Generate outer and inner colors by slightly varying the hue
    final outerColor = _colorFromHash(
      brightness: baseBrightness,
      saturation: baseSaturation,
    );
    final innerColor = _colorFromHash(
      brightness: baseBrightness - 0.05,
      saturation: baseSaturation + 0.2,
    );

    return (outerColor: outerColor, innerColor: innerColor);
  }
}
