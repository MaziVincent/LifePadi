import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';

import '../widgets/category_card.dart';

class CategoriesPage extends StatelessWidget {
  const CategoriesPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Categories'),
      body: Padding(
        padding: kHorizontalPadding.copyWith(top: 8.h),
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 8.6.r,
            mainAxisSpacing: 12.05.r,
          ),
          itemCount: categories.length,
          itemBuilder: (context, index) =>
              CategoryCard(category: categories[index]),
        ),
      ),
    );
  }
}
