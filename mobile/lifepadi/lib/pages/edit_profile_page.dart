import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/validation.dart';
import 'package:lifepadi/widgets/date_picker_field.dart';
import 'package:lifepadi/widgets/widgets.dart';

class EditProfilePage extends HookConsumerWidget {
  const EditProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider);

    final firstName = useState('');
    final lastName = useState('');
    final email = useState('');
    final phone = useState('');
    final gender = useState('');
    final address = useState('');
    final birthDate = useState<DateTime?>(null);
    final formKey = useMemoized(GlobalKey<FormState>.new);

    // Add useEffect to set initial birth date if user has one
    useEffect(
      () {
        if (user is AsyncData &&
            user.valueOrNull != null &&
            birthDate.value == null) {
          final userValue = user.valueOrNull!;
          if (userValue is Customer && userValue.dateOfBirth != null) {
            birthDate.value = userValue.dateOfBirth;
          }
          return null;
        }
        return null;
      },
      [user.valueOrNull],
    );

    const genders = [
      'Male',
      'Female',
    ];

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Edit Profile',
      ),
      body: Form(
        key: formKey,
        child: ListView(
          padding: kHorizontalPadding.copyWith(top: 29.h, bottom: 20.h),
          children: [
            ...[
              InputField(
                hintText: 'Enter first name',
                labelText: 'First name',
                onChanged: (value) => firstName.value = value,
                keyboardType: TextInputType.text,
                hasValue: firstName.value.isNotEmpty,
                initialValue: user.valueOrNull?.firstName,
                autofillHints: const [
                  AutofillHints.givenName,
                  AutofillHints.name,
                ],
                validator: ValidationBuilder(
                  requiredMessage: 'First name is required',
                )
                    .minLength(
                      2,
                      'First name must be at least 2 characters',
                    )
                    .build(),
              ),
              InputField(
                hintText: 'Enter last name',
                labelText: 'Last name',
                onChanged: (value) => lastName.value = value,
                keyboardType: TextInputType.text,
                hasValue: lastName.value.isNotEmpty,
                initialValue: user.valueOrNull?.lastName,
                autofillHints: const [
                  AutofillHints.familyName,
                  AutofillHints.name,
                ],
                validator: ValidationBuilder(
                  requiredMessage: 'Last name is required',
                )
                    .minLength(
                      3,
                      'Last name must be at least 3 characters',
                    )
                    .build(),
              ),
              InputField(
                hintText: 'Your email address',
                labelText: 'Email',
                onChanged: (value) => email.value = value,
                keyboardType: TextInputType.emailAddress,
                hasValue: email.value.isNotEmpty,
                initialValue: user.valueOrNull?.email,
                autofillHints: const [
                  AutofillHints.username,
                  AutofillHints.email,
                ],
                validator: buildEmailValidator(),
              ),
              PhoneInputField(
                phone: phone,
              ),
              InputField(
                hintText: 'Your street address',
                labelText: 'Contact Address',
                onChanged: (value) => address.value = value,
                keyboardType: TextInputType.streetAddress,
                hasValue: address.value.isNotEmpty,
                initialValue: user.valueOrNull?.address,
                autofillHints: const [AutofillHints.streetAddressLine1],
                validator: ValidationBuilder(
                  requiredMessage: 'Address is required',
                ).build(),
              ),
              Row(
                children: [
                  /// Date of birth picker
                  Expanded(
                    child: DatePickerField(
                      labelText: 'Date of Birth',
                      hintText: 'Select date',
                      selectedDate: birthDate.value,
                      onDateSelected: (dates) {
                        birthDate.value = dates[0];
                      },
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
                // Validate the input fields
                if (!formKey.currentState!.validate()) return;

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
