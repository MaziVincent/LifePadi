import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/service_card.dart';

class ErrandsPage extends StatelessWidget {
  const ErrandsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Service Errands'),
      body: Padding(
        padding: k.copyWith(top: 8.h),
        child: GridView.builder(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
            crossAxisSpacing: 10.r,
            mainAxisSpacing: 10.r,
            childAspectRatio: 0.7.r,
          ),
          itemCount: services.length,
          itemBuilder: (context, index) {
            return ServiceCard(
              name: services[index].name,
              image: services[index].image,
            );
          },
        ),
      ),
    );
  }
}
