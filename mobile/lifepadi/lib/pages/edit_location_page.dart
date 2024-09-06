import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class EditLocationPage extends HookWidget {
  const EditLocationPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    final address = useState('');
    final phone = useState('');

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Edit Location',
      ),
      body: Form(
        child: ListView(
          padding: kHorizontalPadding.copyWith(top: 29.h, bottom: 20.h),
          children: [
            InputField(
              hintText: 'Soja, Lekki Lagos',
              labelText: 'Location',
              onChanged: (value) => address.value = value,
              keyboardType: TextInputType.streetAddress,
              hasValue: address.value.isNotEmpty,
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
            InputField(
              hintText: '0901 234 5678',
              labelText: 'Active Phone Number',
              onChanged: (value) => phone.value = value,
              keyboardType: TextInputType.phone,
              hasValue: phone.value.isNotEmpty,
            ),
            PrimaryButton(
              text: 'Save Location',
              onPressed: () {
                // TODO: Update the user's profile

                // Clear the input fields

                // Show a success dialog
              },
            ),
          ].separatedBy(16.verticalSpace),
        ),
      ),
    );
  }
}
