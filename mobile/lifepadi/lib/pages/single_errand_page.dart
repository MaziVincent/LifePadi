import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class SingleErrandPage extends StatelessWidget {
  const SingleErrandPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: 'Cooking gas',
        actions: [
          MyIconButton(
            icon: IconsaxPlusLinear.search_normal,
            onPressed: () {
              // TODO: Implement search
            },
          ),
          6.horizontalSpace,
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        padding: kHorizontalPadding.copyWith(top: 5.h, bottom: 30.h),
        children: [
          const SectionTitle('People Near You'),
          16.verticalSpace,
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  for (final i in [1, 2, 3])
                    ErrandTile(
                      id: i,
                      image: Assets.images.johnLukman.provider(),
                      name: 'John Lukman',
                      errand: 'Cooking gas',
                      price: 33000,
                    ),
                ].separatedBy(11.verticalSpace),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
