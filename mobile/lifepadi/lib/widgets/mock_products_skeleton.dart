import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
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
        for (final i in List.generate(count, (index) => index))
          Skeletonizer(
            child: ProductTile(
              product: makeFakeProduct(id: i),
            ),
          ),
      ].separatedBy(14.verticalSpace),
    );
  }
}
