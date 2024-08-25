import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';

class Avatar extends StatelessWidget {
  /// Avatar widget
  ///
  /// This can be used to show the user's profile image.
  /// If the image is null, it will show the logo as default.
  const Avatar({
    super.key,
    this.image,
    this.size,
  });

  /// Avatar image
  final ImageProvider? image;

  /// Avatar size
  /// The size of the avatar which will be it's height and width.
  final double? size;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: size ?? 41.67.h,
      width: size ?? 41.67.h,
      decoration: BoxDecoration(
        color: const Color(0xFFE2E8F0),
        shape: BoxShape.circle,
        image: image != null
            ? DecorationImage(
                image: image!,
                fit: BoxFit
                    .cover, // Ensure the image fits well within the circle
              )
            : null, // No image decoration if image is null
      ),
      child: image == null
          ? Padding(
              padding: EdgeInsets.only(
                top: 8.83.h,
                left: 11.17.w,
                right: 10.48.w,
                bottom: 7.83.h,
              ),
              child: Assets.images.logoDark.image(
                fit: BoxFit
                    .contain, // Ensure the logo fits well within the padding
              ),
            )
          : null, // No child widget if the image is provided
    );
  }
}
