import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class FilterModal extends HookWidget {
  const FilterModal({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final location = useState('');
    final selectedDistance = useState(5);
    final category = useState('');
    final categories = [
      'Clothes',
      'Food',
      'Fuel',
    ];
    final selectedPrice = useState('');

    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SectionTitle(
            'Location',
            color: Color(0xFF1C1C20),
          ),
          InputField(
            hintText: 'Soja, Lekki Lagos',
            labelText: 'Location',
            onChanged: (value) => location.value = value,
            keyboardType: TextInputType.streetAddress,
            hasValue: location.value.isNotEmpty,
          ),
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
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SectionTitle(
                'Maximum Distance',
                color: Color(0xFF1C1C20),
              ),
              10.verticalSpace,
              Text(
                'Stores further away will show if you run out of result',
                style: context.textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF5F5F5F),
                  fontSize: 12.sp,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ],
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 10.w, vertical: 6.h),
            child: Row(
              children: [
                for (final int i in [5, 10, 20])
                  DistanceTab(
                    distance: i,
                    selectedDistance: selectedDistance,
                  ),
              ],
            ),
          ),
          const SectionTitle(
            'Category',
            color: Color(0xFF1C1C20),
          ),
          SelectInputField<String>(
            hintText: 'Select category',
            labelText: 'Category',
            items: categories,
            onChanged: (value) => category.value = value ?? '',
          ),
          const SectionTitle(
            'Price',
            color: Color(0xFF1C1C20),
          ),
          Row(
            children: [
              PriceFilterTab(
                selectedPrice: selectedPrice,
                price: 'min',
              ),
              9.horizontalSpace,
              PriceFilterTab(
                selectedPrice: selectedPrice,
                price: 'max',
              ),
            ],
          ),
          const MyDivider(),
          30.verticalSpace,
          SizedBox(
            height: 42.h,
            width: double.infinity,
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 13.w),
              child: Row(
                children: [
                  Expanded(
                    child: PrimaryOutlineChoiceButton(
                      onPressed: () {},
                      text: 'Clear Filter',
                    ),
                  ),
                  16.horizontalSpace,
                  Expanded(
                    child: PrimaryChoiceButton(
                      onPressed: () {},
                      text: 'Apply Filter',
                    ),
                  ),
                ],
              ),
            ),
          ),
        ].separatedBy(16.verticalSpace),
      ),
    );
  }
}
