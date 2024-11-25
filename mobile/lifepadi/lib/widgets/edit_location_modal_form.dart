import 'package:flutter/gestures.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class EditLocationModalForm extends HookConsumerWidget {
  const EditLocationModalForm({
    super.key,
    this.title = 'Delivery Location',
    this.onLocationSelected,
    this.selectedLocationId,
  });

  final String title;
  final void Function(LocationDetails location)? onLocationSelected;
  final int? selectedLocationId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locations = ref.watch(locationsProvider);

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Remix.map_pin_5_line,
                size: 18.sp,
                color: kDarkPrimaryColor,
              ),
              5.horizontalSpace,
              SectionTitle(
                title,
                color: const Color(0xFF1C1C20),
              ),
            ],
          ),
          16.verticalSpace,
          RichText(
            text: TextSpan(
              style: context.textTheme.bodyLarge?.copyWith(
                color: const Color(0xFF1C1C20),
                fontSize: 16.sp,
                fontWeight: FontWeight.w400,
              ),
              children: [
                const TextSpan(
                  text: 'Select from address book',
                ),
                TextSpan(
                  text: ' or ',
                  style: GoogleFonts.roboto(
                    color: const Color(0xFF5F5F5F),
                  ),
                ),
                TextSpan(
                  text: 'add new',
                  style: GoogleFonts.roboto(
                    color: kDarkPrimaryColor,
                    fontWeight: FontWeight.w600,
                  ),
                  recognizer: TapGestureRecognizer()
                    ..onTap = () => context.push(NewLocationRoute().location),
                ),
              ],
            ),
          ),
          16.verticalSpace,
          ...switch (locations) {
            AsyncData(:final value) => [
                for (final location in value)
                  _buildLocation(
                    context,
                    location: location,
                    isDefault: location.id == selectedLocationId,
                    onTap: () {
                      onLocationSelected?.call(location);
                      context.pop();
                    },
                  ),
              ].separatedBy(16.verticalSpace),
            AsyncError(:final error) => [
                Center(
                  child: Text(
                    error.toString(),
                    style: context.textTheme.bodyLarge?.copyWith(
                      color: kDarkPrimaryColor,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
              ],
            _ => [const Center(child: GreenyLoadingWheel())],
          },
          16.verticalSpace,
          const MyDivider(),
          7.verticalSpace,
          PrimaryButton(
            onPressed: () => context.pop(),
            text: 'Confirm Address',
          ),
        ],
      ),
    );
  }

  Widget _buildLocation(
    BuildContext context, {
    required LocationDetails location,
    required bool isDefault,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        children: [
          Icon(
            Remix.map_pin_5_line,
            size: 18.sp,
            color: isDefault ? kDarkPrimaryColor : const Color(0xFF464646),
          ),
          5.horizontalSpace,
          Text(
            location.address,
            style: context.textTheme.bodySmall?.copyWith(
              color: isDefault ? kDarkPrimaryColor : const Color(0xFF5F5F5F),
              fontSize: 12.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}
