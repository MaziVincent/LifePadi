import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/widgets/input_field.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_divider.dart';
import 'package:lifepadi/widgets/primary_button.dart';
import 'package:lifepadi/widgets/section_title.dart';

import '../widgets/location_card.dart';

class LogisticsPage extends HookWidget {
  const LogisticsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final name = useState<String>('');
    final quantity = useState('');
    final description = useState('');

    return Scaffold(
      appBar: const MyAppBar(title: 'Logistics'),
      body: Padding(
        padding: const EdgeInsets.only(left: 23, right: 25),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              8.verticalSpace,
              const SectionTitle(
                'Item Details',
                color: Color(0xFF1C1C20),
              ),
              16.verticalSpace,
              InputField(
                hintText: 'Name of Item',
                labelText: 'Item Name',
                onChanged: (value) => name.value = value,
                keyboardType: TextInputType.text,
                hasValue: name.value.isNotEmpty,
              ),
              16.verticalSpace,
              InputField(
                hintText: 'Enter quantity',
                labelText: 'Quantity',
                onChanged: (value) => quantity.value = value,
                keyboardType: TextInputType.number,
                hasValue: quantity.value.isNotEmpty,
              ),
              16.verticalSpace,
              InputField(
                hintText: 'Enter description',
                labelText: 'Description',
                onChanged: (value) => description.value = value,
                keyboardType: TextInputType.multiline,
                hasValue: description.value.isNotEmpty,
                maxLines: 3,
                maxLength: 100,
                textInputAction: TextInputAction.newline,
              ),
              8.verticalSpace,
              const SectionTitle(
                'Pickup Location',
                color: Color(0xFF1C1C20),
              ),
              16.verticalSpace,
              LocationCard(
                onTap: () {
                  // TODO: Open bottom sheet to update location
                },
                place: 'Soja, Lekki Lagos...',
                phoneNumber: '0901 234 5678',
              ),
              16.verticalSpace,
              const SectionTitle(
                'Drop-off Location',
                color: Color(0xFF1C1C20),
              ),
              16.verticalSpace,
              LocationCard(
                onTap: () {
                  // TODO: Open bottom sheet to update location
                },
                place: '3RD FLOOR DREAMLINK CONCEPTS',
                phoneNumber: '0701 234 5678',
              ),
              16.verticalSpace,
              const MyDivider(
                color: Color(0xFFECECEC),
              ),
              40.verticalSpace,
              PrimaryButton(text: 'Proceed to Checkout', onPressed: () {}),
              30.verticalSpace,
            ],
          ),
        ),
      ),
    );
  }
}
