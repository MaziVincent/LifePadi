import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/section_title.dart';

class ErrandTile extends HookWidget {
  const ErrandTile({
    super.key,
    this.image,
    required this.name,
    required this.errand,
    required this.price,
    required this.id,
  });

  final ImageProvider<Object>? image;
  final String name, errand;
  final double price;
  final int id;

  @override
  Widget build(BuildContext context) {
    final isInWishlist = useState(false);
    final urbanistStyle = GoogleFonts.urbanist(
      color: const Color(0xFF616161),
      fontSize: 12.05.sp,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.17.r,
    );

    return InkWell(
      onTap: () {
        // TODO: Open errand details
      },
      customBorder: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(13.77.r),
      ),
      child: Ink(
        height: 127.36.h,
        width: double.infinity,
        padding: EdgeInsets.only(
          top: 12.05.h,
          left: 12.05.w,
          right: 15.49.w,
          bottom: 12.05.h,
        ),
        decoration: ShapeDecoration(
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(13.77.r),
          ),
          shadows: const [
            BoxShadow(
              color: Color(0x0C04060F),
              blurRadius: 51.63,
              offset: Offset(0, 3.44),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 103.26.h,
              height: 103.26.h,
              decoration: ShapeDecoration(
                color: const Color(0xFFB9B9B9),
                image: image != null
                    ? DecorationImage(
                        image: image!,
                        fit: BoxFit.fill,
                      )
                    : null,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10).r,
                ),
              ),
            ),
            13.77.horizontalSpace,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SectionTitle(
                          name,
                          color: const Color(0xFF212121),
                        ),
                        IconButton(
                          onPressed: () {
                            isInWishlist.value = !isInWishlist.value;

                            // TODO: Toggle in wishlist
                          },
                          icon: Icon(
                            isInWishlist.value
                                ? MdiIcons.heart
                                : MdiIcons.heartOutline,
                            color: const Color(0xFFF14336),
                          ),
                          iconSize: 20.r,
                        ),
                      ],
                    ),
                  ),
                  Text(
                    errand,
                    style: context.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFFA1A5B0),
                      fontWeight: FontWeight.w400,
                      fontSize: 12.sp,
                    ),
                  ),
                  5.verticalSpace,
                  Row(
                    children: [
                      Text(
                        '1.2 km away |',
                        style: urbanistStyle,
                      ),
                      Assets.icons.star.image(
                        height: 12.05.h,
                        width: 12.05.h,
                      ),
                      Text(
                        '4.9',
                        style: urbanistStyle,
                      ),
                      Text(
                        '(2.3k)',
                        style: urbanistStyle,
                      ),
                    ].separatedBy(5.16.horizontalSpace),
                  ),
                  5.verticalSpace,
                  Text(
                    '${price.currency} /KG',
                    style: context.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF1BAC4B),
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
