import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/validation.dart';
import 'package:lifepadi/widgets/widgets.dart';

class RegisterPage extends HookConsumerWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = context.textTheme;
    final hidePassword = useState(true);
    final hideConfirmPassword = useState(true);
    final formKey = useMemoized(GlobalKey<FormState>.new);
    // Create the input states
    final email = useState('');
    final password = useState('');
    final phone = useState('');
    final confirmPassword = useState('');
    final firstName = useState('');
    final lastName = useState('');
    final isPhoneVerified = useState(false);

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Assets.images.authHeros.register.image(
              height: 0.3.sh,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 0.7.sh,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.vertical(
                    top: Radius.circular(28.r),
                  ),
                ),
                padding: EdgeInsets.only(
                  left: 24.w,
                  right: 24.w,
                  top: 34.72.h,
                ),
                child: SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  child: Form(
                    key: formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Register',
                          style: textTheme.titleMedium?.copyWith(
                            color: const Color(0xFF151522),
                            fontSize: 28.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        7.verticalSpace,
                        Text(
                          'Signup to get started with setting up your lifepadi account.',
                          style: textTheme.bodyMedium?.copyWith(
                            color: const Color(0xFF999999),
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w300,
                          ),
                        ),
                        16.28.verticalSpace,
                        InputField(
                          hintText: 'Enter first name',
                          labelText: 'First name',
                          onChanged: (value) => firstName.value = value,
                          keyboardType: TextInputType.text,
                          hasValue: firstName.value.isNotEmpty,
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
                        19.verticalSpace,
                        InputField(
                          hintText: 'Enter last name',
                          labelText: 'Last name',
                          onChanged: (value) => lastName.value = value,
                          keyboardType: TextInputType.text,
                          hasValue: lastName.value.isNotEmpty,
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
                        19.verticalSpace,
                        InputField(
                          hintText: 'Enter Email',
                          labelText: 'Email',
                          onChanged: (value) => email.value = value,
                          keyboardType: TextInputType.emailAddress,
                          hasValue: email.value.isNotEmpty,
                          autofillHints: const [
                            AutofillHints.newUsername,
                            AutofillHints.email,
                          ],
                          validator: buildEmailValidator(),
                        ),
                        19.verticalSpace,
                        Row(
                          children: [
                            Flexible(
                              flex: isPhoneVerified.value ? 5 : 3,
                              child: PhoneInputField(phone: phone),
                            ),
                            10.horizontalSpace,

                            /// Verify phone number button
                            Flexible(
                              child: PrimaryActionButton(
                                label: isPhoneVerified.value ? '' : 'Verify',
                                radius: 8.r,
                                iconWidget: isPhoneVerified.value
                                    ? const Icon(
                                        Icons.verified_sharp,
                                        color: Colors.white,
                                      )
                                    : null,
                                loadingWheelSize: 18.sp,
                                onPressed: isPhoneVerified.value
                                    ? null
                                    : () async {
                                        if (phone.value.isEmpty) {
                                          await showToast('Enter phone number');
                                          return;
                                        }
                                        final isValid =
                                            await isValidPhoneNumber(
                                          phone.value,
                                        );
                                        if (!isValid) {
                                          await showToast(
                                            'Invalid phone number',
                                          );
                                          return;
                                        }

                                        await ref
                                            .read(
                                              authControllerProvider.notifier,
                                            )
                                            .sendVerificationCode(phone.value)
                                            .then(
                                          (String pinId) async {
                                            await showToast(
                                              'Verification code sent to ${phone.value}',
                                            );

                                            if (context.mounted) {
                                              await displayBottomPanel(
                                                context,
                                                child: PhoneVerificationWidget(
                                                  phoneNumber: phone.value,
                                                  pinId: pinId,
                                                  onVerified: () {
                                                    isPhoneVerified.value =
                                                        true;
                                                    context.pop();
                                                  },
                                                ),
                                              );
                                            }
                                          },
                                          onError: (dynamic error) async {
                                            await handleError(
                                              error,
                                              context.mounted ? context : null,
                                            );
                                          },
                                        );
                                      },
                              ),
                            ),
                          ],
                        ),
                        19.verticalSpace,
                        InputField(
                          hintText: 'Enter New Password',
                          labelText: 'Password',
                          onChanged: (value) => password.value = value,
                          onChildTap: () =>
                              hidePassword.value = !hidePassword.value,
                          keyboardType: TextInputType.visiblePassword,
                          hideText: hidePassword.value,
                          hasValue: password.value.isNotEmpty,
                          autofillHints: const [AutofillHints.newPassword],
                          validator: buildPasswordValidator(),
                          child: Icon(
                            hidePassword.value
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: const Color(0xFF858585),
                            size: 19.52.r,
                          ),
                        ),
                        19.verticalSpace,
                        InputField(
                          hintText: 'Confirm Password',
                          labelText: 'Confirm Password',
                          onChanged: (value) => confirmPassword.value = value,
                          onChildTap: () => hideConfirmPassword.value =
                              !hideConfirmPassword.value,
                          keyboardType: TextInputType.visiblePassword,
                          textInputAction: TextInputAction.done,
                          hideText: hideConfirmPassword.value,
                          hasValue: confirmPassword.value.isNotEmpty,
                          autofillHints: const [AutofillHints.newPassword],
                          validator: (v) => validateConfirmPassword(
                            value: v,
                            password: password.value,
                          ),
                          child: Icon(
                            hideConfirmPassword.value
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: const Color(0xFF858585),
                            size: 19.52.r,
                          ),
                        ),
                        25.verticalSpace,
                        PrimaryActionButton(
                          label: 'Register',
                          onPressed: () async {
                            if (!formKey.currentState!.validate()) return;

                            await ref
                                .read(authControllerProvider.notifier)
                                .register(
                                  firstName: firstName.value,
                                  lastName: lastName.value,
                                  email: email.value,
                                  phoneNumber: phone.value,
                                  password: password.value,
                                )
                                .onError<DioException>(
                                  (error, stackTrace) => handleError(
                                    error,
                                    context.mounted ? context : null,
                                  ),
                                );
                          },
                        ),
                        17.verticalSpace,
                        Center(
                          child: ToggleAuthPage(
                            question: 'Already have account?',
                            action: 'Login',
                            onPressed: () => context.go(
                              const LoginRoute().location,
                            ),
                          ),
                        ),
                        20.verticalSpace,
                      ],
                    ),
                  ),
                ),
              ),
            ),
            Align(
              alignment: Alignment.topLeft,
              child: Padding(
                padding: EdgeInsets.only(top: 16.h, left: 24.w),
                child: const GlassmorphicBackButton(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
