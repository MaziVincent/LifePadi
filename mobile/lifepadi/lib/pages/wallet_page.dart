import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/wallet_action.dart';
import 'package:lifepadi/widgets/wallet_card.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/constants.dart';
import '../widgets/glassmorphic_back_button.dart';
import '../widgets/my_icon_button.dart';

class WalletPage extends StatelessWidget {
  const WalletPage({super.key});

  @override
  Widget build(BuildContext context) {
    final montserratStyle = GoogleFonts.montserrat(
      color: kDarkTextColor,
      fontSize: 16.sp,
      fontWeight: FontWeight.w600,
    );

    return Scaffold(
      backgroundColor: kDarkPrimaryColor,
      appBar: AppBar(
        title: Text(
          'Wallet',
          style: context.textTheme.titleLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 20.sp,
          ),
        ),
        titleSpacing: 14.w,
        backgroundColor: kDarkPrimaryColor,
        surfaceTintColor: kDarkPrimaryColor,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: kRadialGradient,
          ),
          padding: EdgeInsets.only(top: 75.h),
        ),
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {},
            backgroundColor: const Color(0x19F5F5F5),
            iconColor: Colors.white,
          ),
          24.horizontalSpace,
        ],
        leading: Padding(
          padding: EdgeInsets.only(left: 16.w),
          child: const Align(
            child: GlassmorphicBackButton(),
          ),
        ),
        // toolbarHeight: 0.16.sh,
      ),
      body: Stack(
        children: [
          /// Balance
          Align(
            alignment: Alignment.topCenter,
            child: SizedBox(
              height: 0.3.sh,
              child: Column(
                children: [
                  24.verticalSpace,
                  Text(
                    'Available Balance',
                    style: context.textTheme.titleSmall?.copyWith(
                      color: const Color(0xFFF0F0F0),
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  4.verticalSpace,
                  Text(
                    51547.currency,
                    style: context.textTheme.displaySmall?.copyWith(
                      color: Colors.white,
                      fontSize: 40.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  // 40.verticalSpace,
                ],
              ),
            ),
          ),

          Stack(
            children: [
              Align(
                alignment: Alignment.bottomCenter,
                child: Container(
                  width: double.infinity,
                  height: 0.7.sh,
                  decoration: ShapeDecoration(
                    color: const Color(0xFFFBFBFB),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(30.r),
                        topRight: Radius.circular(30.r),
                      ),
                    ),
                  ),
                  padding: kHorizontalPadding.copyWith(top: 79.h),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      /// Manage Cards
                      Text(
                        'Manage Cards',
                        style: montserratStyle,
                      ),
                      for (final paymentMethod in paymentMethods.skip(1))
                        WalletCard(paymentMethod: paymentMethod),

                      /// Transaction History
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Transaction History',
                            style: montserratStyle,
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: Text(
                              'See all',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium
                                  ?.copyWith(
                                    color: kDarkPrimaryColor,
                                    fontSize: 14.sp,
                                    fontWeight: FontWeight.w500,
                                  ),
                            ),
                          ),
                        ],
                      ),
                    ].separatedBy(14.verticalSpace),
                  ),
                ),
              ),

              /// Wallet actions tile
              Positioned(
                top: 0.15.sh, // Half the height of the balance widget
                left: 24.w,
                right: 24.w,
                child: Container(
                  width: double.infinity,
                  padding:
                      EdgeInsets.symmetric(horizontal: 32.w, vertical: 24.h),
                  decoration: ShapeDecoration(
                    color: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16.r),
                    ),
                    shadows: const [
                      BoxShadow(
                        color: Color(0x14000000),
                        blurRadius: 12,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      /// Wallet actions
                      WalletAction(
                        onTap: () {},
                        label: 'Top Up',
                        icon: Remix.upload_line,
                      ),
                      WalletAction(
                        onTap: () {},
                        label: 'Add Card',
                        icon: Remix.download_line,
                      ),
                      WalletAction(
                        onTap: () {},
                        label: 'History',
                        icon: Remix.exchange_funds_line,
                      ),
                    ].separatedBy(
                      SizedBox(height: 24.h, child: const VerticalDivider()),
                    ),
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
