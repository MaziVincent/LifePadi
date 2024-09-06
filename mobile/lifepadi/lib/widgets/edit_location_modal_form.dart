import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class EditLocationModalForm extends HookWidget {
  const EditLocationModalForm({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final location = useState('');
    final locations = useState([
      'Lekki, Lagos',
      'Soja, Lekki, Lagos',
      'Victoria Island, Lagos',
      'Ikeja, Lagos',
    ]);

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
              const SectionTitle(
                'Delivery Location',
                color: Color(0xFF1C1C20),
              ),
            ],
          ),
          10.verticalSpace,
          Text(
            'Enter the address where you need the delivery',
            style: context.textTheme.bodySmall?.copyWith(
              color: const Color(0xFF5F5F5F),
              fontSize: 12.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
          16.verticalSpace,
          InputField(
            hintText: 'Soja, Lekki Lagos',
            labelText: 'Location',
            onChanged: (value) => location.value = value,
            keyboardType: TextInputType.streetAddress,
            hasValue: location.value.isNotEmpty,
          ),
          16.verticalSpace,
          GestureDetector(
            onTap: () => context.push(NewLocationRoute().location),
            child: Text(
              'Use current map location',
              style: GoogleFonts.roboto(
                color: kDarkPrimaryColor,
                fontSize: 15.sp,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
          16.verticalSpace,
          Text(
            'Select from address book',
            style: context.textTheme.bodyLarge?.copyWith(
              color: const Color(0xFF1C1C20),
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
            ),
          ),
          16.verticalSpace,
          ...[
            for (final location in locations.value.asMap().entries)
              _buildLocation(location, context),
          ].separatedBy(16.verticalSpace),
          16.verticalSpace,
          const MyDivider(),
          7.verticalSpace,
          PrimaryButton(
            onPressed: () {},
            text: 'Confirm Address',
          ),
        ],
      ),
    );
  }

  Widget _buildLocation(
    MapEntry<int, String> location,
    BuildContext context,
  ) {
    return GestureDetector(
      onTap: () {},
      child: Row(
        children: [
          Icon(
            Remix.map_pin_5_line,
            size: 18.sp,
            color:
                location.key == 1 ? kDarkPrimaryColor : const Color(0xFF464646),
          ),
          5.horizontalSpace,
          Text(
            location.value,
            style: context.textTheme.bodySmall?.copyWith(
              color: location.key == 1
                  ? kDarkPrimaryColor
                  : const Color(0xFF5F5F5F),
              fontSize: 12.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
    );
  }
}
