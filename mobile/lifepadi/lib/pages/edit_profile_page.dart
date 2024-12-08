import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/validation.dart';
import 'package:lifepadi/widgets/date_picker_field.dart';
import 'package:lifepadi/widgets/widgets.dart';

class EditProfilePage extends HookConsumerWidget {
  const EditProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(authControllerProvider);

    final firstName = useState('');
    final lastName = useState('');
    final email = useState('');
    final phone = useState('');
    final gender = useState('');
    final address = useState('');
    final birthDate = useState<DateTime?>(null);
    final formKey = useMemoized(GlobalKey<FormState>.new);

    const genders = [
      'Male',
      'Female',
    ];

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Edit Profile',
      ),
      body: userAsync.when(
        data: (User user) {
          if (user is Customer) {
            // initialize fields with existing data
            if (firstName.value.isEmpty) {
              firstName.value = user.firstName;
            }
            if (lastName.value.isEmpty) {
              lastName.value = user.lastName;
            }
            if (email.value.isEmpty) {
              email.value = user.email;
            }
            if (phone.value.isEmpty) {
              phone.value = user.phoneNumber;
            }
            if (birthDate.value == null && user.dateOfBirth != null) {
              birthDate.value = user.dateOfBirth;
            }
            if (gender.value.isEmpty && user.gender != null) {
              gender.value = user.gender!;
            }
          }

          return _EditProfileContent(
            ref: ref,
            formKey: formKey,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            birthDate: birthDate,
            genders: genders,
            gender: gender,
          );
        },
        error: (error, _) => MyErrorWidget(error: error),
        loading: () => const Center(child: GreenyLoadingWheel()),
      ),
    );
  }
}

class _EditProfileContent extends StatelessWidget {
  const _EditProfileContent({
    required this.formKey,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phone,
    required this.address,
    required this.birthDate,
    required this.genders,
    required this.gender,
    required this.ref,
  });

  final GlobalKey<FormState> formKey;
  final ValueNotifier<String> firstName;
  final ValueNotifier<String> lastName;
  final ValueNotifier<String> email;
  final ValueNotifier<String> phone;
  final ValueNotifier<String> address;
  final ValueNotifier<DateTime?> birthDate;
  final List<String> genders;
  final ValueNotifier<String> gender;
  final WidgetRef ref;

  @override
  Widget build(BuildContext context) {
    return Form(
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
              initialValue: firstName.value,
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
              initialValue: lastName.value,
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
              initialValue: email.value,
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
              initialValue: address.value,
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
          PrimaryActionButton(
            text: 'Update',
            onPressed: () async {
              // Validate the input fields
              if (!formKey.currentState!.validate()) return;
              final userAsync = ref.read(authControllerProvider);
              final user = userAsync.maybeWhen(
                data: (user) => user,
                orElse: () => null,
              );

              if (user is Customer) {
                // Update the user's profile
                await ref
                    .read(authControllerProvider.notifier)
                    .updateProfile(
                      customer: user.copyWith(
                        firstName: firstName.value,
                        lastName: lastName.value,
                        email: email.value,
                        phoneNumber: phone.value,
                        address: address.value,
                        dateOfBirth: birthDate.value,
                        gender: gender.value,
                      ),
                    )
                    .then((_) {
                  // Show a success dialog
                  if (context.mounted) {
                    openSuccessDialog(
                      context: context,
                      title: 'Profile Updated',
                      description: 'Your profile has been successfully updated',
                      onOk: () => context.pop(),
                    );
                  }
                }).onError((error, _) async {
                  await handleError(
                    error,
                    context.mounted ? context : null,
                  );
                });
              }
            },
          ),
        ],
      ),
    );
  }
}
