import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class NewLocationPage extends StatelessWidget {
  const NewLocationPage({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Maps'),
      body: Stack(
        children: [
          Container(
            height: MediaQuery.sizeOf(context).height,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: Assets.images.map.provider(),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Align(
            child: Padding(
              padding: EdgeInsets.only(top: 0.2.sh),
              child: Column(
                children: [
                  Assets.icons.mapPin.svg(
                    width: 62.5.h,
                    height: 62.5.h,
                  ),
                  Container(
                    width: 40.h,
                    height: 40.h,
                    decoration: ShapeDecoration(
                      shape: const OvalBorder(
                        side: BorderSide(
                          color: Color(0xFF4FAF5A),
                          width: 2,
                        ),
                      ),
                      image: DecorationImage(
                        image: Assets.images.profileAvatar.provider(),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          BottomPanel(
            height: 240.h,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Remix.map_pin_5_line,
                          size: 18.sp,
                          color: kDarkPrimaryColor,
                        ),
                        5.horizontalSpace,
                        const SectionTitle(
                          'Lekki, Lagos',
                          color: Color(0xFF1C1C20),
                        ),
                      ],
                    ),

                    /// Search icon
                    IconButton(
                      onPressed: () {
                        // TODO: Implement map
                      },
                      icon: Icon(
                        IconsaxPlusLinear.search_normal,
                        size: 20.sp,
                        color: const Color(0xFF878787),
                      ),
                    ),
                  ],
                ),
                10.verticalSpace,
                Text(
                  'Drag map to set your delivery location ',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF5F5F5F),
                    fontSize: 12.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                16.verticalSpace,
                GestureDetector(
                  onTap: () {
                    // TODO: Show dialog/input to add phone number
                  },
                  child: Text(
                    'Add a phone number to this location',
                    textAlign: TextAlign.center,
                    style: GoogleFonts.roboto(
                      color: const Color(0xFF629D03),
                      fontSize: 15.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
                16.verticalSpace,
                const MyDivider(),
                12.22.verticalSpace,
                PrimaryButton(
                  text: 'Confirm Address',
                  onPressed: () {
                    // TODO: Save location to user's locations
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
