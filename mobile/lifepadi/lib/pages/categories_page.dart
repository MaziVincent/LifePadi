import 'dart:math';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

class CategoriesPage extends ConsumerWidget {
  const CategoriesPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categories = ref.watch(categoriesProvider());
    final random = Random();

    return Scaffold(
      appBar: const MyAppBar(title: 'Categories'),
      body: Padding(
        padding: kHorizontalPadding.copyWith(top: 8.h),
        child: switch (categories) {
          AsyncError(:final error) => Text(error.toString()),
          AsyncData(value: final categories) => GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                crossAxisSpacing: 8.6.r,
                mainAxisSpacing: 12.05.r,
              ),
              itemCount: categories.length,
              itemBuilder: (context, index) => CategoryCard(
                category: Category(
                  id: categories[index].id,
                  name: categories[index].name,
                ),
              ),
            ),
          _ => Skeletonizer(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 3,
                  crossAxisSpacing: 8.6.r,
                  mainAxisSpacing: 12.05.r,
                ),
                itemCount: 12,
                itemBuilder: (context, index) => CategoryCard(
                  category: Category(
                    id: random.nextInt(20),
                    name: BoneMock.name,
                  ),
                ),
              ),
            ),
        },
      ),
    );
  }
}
