import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LocationsPage extends HookWidget {
  const LocationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final location1 = useState(true);
    final location2 = useState(false);

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Locations',
      ),
      body: Form(
        child: ListView(
          padding: kHorizontalPadding.copyWith(top: 24.h, bottom: 20.h),
          children: [
            /// Location card with switch that is on
            LocationCard(
              onTap: () {
                // TODO: Open bottom sheet with options to edit or delete location

                // For now, just go to edit location page
                context.push(EditLocationRoute(id: 1).location);
              },
              place: 'Soja, Lekki Lagos...',
              phoneNumber: '0901 234 5678',
              isDefault: true,
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
              child: SwitchInput(
                value: location1.value,
                onChanged: (value) {
                  // TODO: Toggle location active/inactive state

                  // For now, just update the UI
                  location1.value = value;
                },
              ),
            ),

            /// Location card with switch that is off
            LocationCard(
              onTap: () {
                // TODO: Open bottom sheet with options to edit or delete location
              },
              place: 'Soja, Lekki Lagos...',
              phoneNumber: '0901 234 5678',
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
              child: SwitchInput(
                value: location2.value,
                onChanged: (value) {
                  // TODO: Toggle location active/inactive state

                  // For now, just update the UI
                  location2.value = value;
                },
              ),
            ),

            PrimaryOutlineButton(
              text: 'Add new location'.toUpperCase(),
              onPressed: () {
                // Open add new location bottom sheet with drag handle.
              },
              textStyle: context.textTheme.bodyLarge?.copyWith(
                color: kDarkPrimaryColor,
                fontWeight: FontWeight.w700,
                fontSize: 14.sp,
              ),
              icon: IconsaxPlusLinear.location_add,
            ),
          ].separatedBy(16.verticalSpace),
        ),
      ),
    );
  }
}
