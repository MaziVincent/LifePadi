import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/countries.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class EditProfilePage extends HookWidget {
  const EditProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final name = useState('');
    final email = useState('');
    final phone = useState('');
    final country = useState('');
    final gender = useState('');
    final address = useState('');

    const genders = [
      'Male',
      'Female',
      'Other',
    ];

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Edit Profile',
      ),
      body: Form(
        child: ListView(
          padding: kHorizontalPadding.copyWith(top: 29.h, bottom: 20.h),
          children: [
            ...[
              InputField(
                hintText: 'Your full name',
                labelText: 'Full name',
                onChanged: (value) => name.value = value,
                keyboardType: TextInputType.text,
                hasValue: name.value.isNotEmpty,
              ),
              InputField(
                hintText: 'Your email address',
                labelText: 'Email',
                onChanged: (value) => email.value = value,
                keyboardType: TextInputType.emailAddress,
                hasValue: email.value.isNotEmpty,
              ),
              InputField(
                hintText: 'Your phone number',
                labelText: 'Phone',
                onChanged: (value) => phone.value = value,
                keyboardType: TextInputType.phone,
                hasValue: phone.value.isNotEmpty,
              ),
              InputField(
                hintText: 'Your street address',
                labelText: 'Address',
                onChanged: (value) => address.value = value,
                keyboardType: TextInputType.streetAddress,
                hasValue: address.value.isNotEmpty,
              ),
              Row(
                children: [
                  /// Select country
                  Expanded(
                    child: SelectInputField<String>(
                      hintText: 'Select country',
                      labelText: 'Country',
                      items: countries.map((e) => e.name).toList(),
                      onChanged: (value) => country.value = value ?? '',
                    ),
                  ),
                  15.horizontalSpace,

                  /// Select gender
                  Expanded(
                    child: SelectInputField<String>(
                      hintText: 'Select gender',
                      labelText: 'Gender',
                      items: genders,
                      onChanged: (value) => gender.value = value ?? '',
                    ),
                  ),
                ],
              ),
            ].separatedBy(16.verticalSpace),
            33.verticalSpace,
            PrimaryButton(
              text: 'Update',
              onPressed: () {
                // TODO: Update the user's profile

                // Clear the input fields

                // Show a success dialog
              },
            ),
          ],
        ),
      ),
    );
  }
}
