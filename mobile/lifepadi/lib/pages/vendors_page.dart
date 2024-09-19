import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/widgets/widgets.dart';

import '../utils/constants.dart';

class VendorsPage extends StatelessWidget {
  const VendorsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Stores and Vendors'),
      body: Padding(
        padding: kHorizontalPadding.copyWith(top: 8.h),
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
            crossAxisSpacing: 10.8.r,
            mainAxisSpacing: 10.8.r,
            childAspectRatio: 0.7.r,
          ),
          itemCount: vendors.length,
          itemBuilder: (context, index) {
            final vendor = vendors[index];

            return VendorCard(
              name: vendor.name,
              image: vendor.image,
              onTap: () {
                // TODO: Go to vendors single
              },
            );
          },
        ),
      ),
    );
  }
}
