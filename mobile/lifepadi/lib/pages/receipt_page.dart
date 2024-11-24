import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/assets.gen.dart';
import '../utils/constants.dart';

class ReceiptPage extends StatelessWidget {
  const ReceiptPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kDarkPrimaryColor,
      appBar: AppBar(
        title: Text(
          'Receipt',
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
        toolbarHeight: 0.16.sh,
      ),
      body: Container(
        width: double.infinity,
        height: 0.84.sh,
        decoration: ShapeDecoration(
          color: const Color(0xFFFBFBFB),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(30.r),
              topRight: Radius.circular(30.r),
            ),
          ),
        ),
        padding: kHorizontalPadding.copyWith(top: 28.h),
        child: Column(
          children: [
            Assets.icons.success.svg(),
            10.verticalSpace,
            Text(
              'Payment Successful!',
              style: context.textTheme.titleLarge?.copyWith(
                color: Colors.black,
                fontSize: 18.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
            8.verticalSpace,
            Text(
              'Payment made successfully',
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFFB3B3B5),
                fontSize: 12.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
            25.66.verticalSpace,
            ReceiptInfoTile(left: 'Amount paid', right: 43000.currency),
            ReceiptInfoTile(left: 'Payment fee', right: 0.currency),
            ReceiptInfoTile(left: 'Total', right: 43000.currency),
            ReceiptInfoTile(
              left: 'Date & Time',
              right: DateTime.now().readable,
            ),
            const ReceiptInfoTile(
              left: 'Narration',
              right:
                  'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur',
            ),
            const MyDivider(),
            const Spacer(),
            PrimaryButton(
              onPressed: () => context.go(const OrdersRoute().location),
              text: 'Go to Orders',
            ),
            const Spacer(),
          ],
        ),
      ),
    );
  }
}
