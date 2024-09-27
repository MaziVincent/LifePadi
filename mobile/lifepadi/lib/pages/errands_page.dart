import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ErrandsPage extends StatelessWidget {
  const ErrandsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Service Errands'),
      body: Padding(
        padding: kHorizontalPadding.copyWith(top: 8.h),
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
            crossAxisSpacing: 10.r,
            mainAxisSpacing: 10.r,
            childAspectRatio: 0.7.r,
          ),
          itemCount: mockErrands.length,
          itemBuilder: (context, index) {
            return ErrandCard(
              name: mockErrands[index].name,
              image: mockErrands[index].image,
              onTap: () => context.go(const SingleErrandRoute(id: 1).location),
            );
          },
        ),
      ),
    );
  }
}
