import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

class MockProductsSkeleton extends StatelessWidget {
  const MockProductsSkeleton({
    super.key,
    this.count = 3,
  });

  final int count;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (final product in mockProducts.take(count))
          Skeletonizer(
            child: ProductTile(
              id: product.id,
              image: AssetImage(product.imageUrl),
              name: product.name,
              vendor: product.vendor.name,
              price: product.price,
            ),
          ),
      ].separatedBy(14.verticalSpace),
    );
  }
}
