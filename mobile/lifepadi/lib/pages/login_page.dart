import 'package:dio/dio.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/validation.dart';
import 'package:lifepadi/widgets/widgets.dart';

import '../state/auth_controller.dart';

class LoginPage extends HookConsumerWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = context.textTheme;
    final hidePassword = useState(true);
    final usePhone = useState(false);
    final formKey = useMemoized(GlobalKey<FormState>.new);
    // Create the input states
    final email = useState('');
    final password = useState('');
    final phone = useState('');

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Assets.images.authHeros.login.image(
              height: 0.49.sh,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 0.51.sh,
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
                    child: AutofillGroup(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Login',
                            style: textTheme.titleMedium?.copyWith(
                              color: const Color(0xFF151522),
                              fontSize: 28.sp,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          7.verticalSpace,
                          Text(
                            'Sign in to your account.',
                            style: textTheme.bodyMedium?.copyWith(
                              color: const Color(0xFF999999),
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w300,
                            ),
                          ),
                          16.28.verticalSpace,
                          if (usePhone.value)
                            PhoneInputField(
                              phone: phone,
                              onChildTap: () {
                                // Hide this, show email input field
                                usePhone.value = false;
                                // Remove keyboard
                                FocusScope.of(context).unfocus();
                                // Clear the phone input field
                                phone.value = '';
                              },
                              child: Padding(
                                padding: const EdgeInsets.only(
                                  top: 13,
                                  right: 9.76,
                                ).r,
                                child: Text(
                                  'Use Email',
                                  style: textTheme.bodySmall?.copyWith(
                                    color: kDarkPrimaryColor,
                                    fontSize: 15.sp,
                                    fontWeight: FontWeight.w400,
                                    letterSpacing: 0.12.r,
                                  ),
                                ),
                              ),
                            )
                          else
                            InputField(
                              hintText: 'Enter Email',
                              labelText: 'Email',
                              onChanged: (value) => email.value = value,
                              onChildTap: () {
                                // Hide this, show phone number input field
                                usePhone.value = true;
                                // Remove keyboard
                                FocusScope.of(context).unfocus();
                                // Clear the email input field
                                email.value = '';
                              },
                              keyboardType: TextInputType.emailAddress,
                              hasValue: email.value.isNotEmpty,
                              autofillHints: const [
                                AutofillHints.username,
                                AutofillHints.email,
                              ],
                              validator: buildEmailValidator(),
                              child: Padding(
                                padding: const EdgeInsets.only(
                                  top: 13,
                                  right: 9.76,
                                ).r,
                                child: Text(
                                  'Use Phone',
                                  style: textTheme.bodySmall?.copyWith(
                                    color: kDarkPrimaryColor,
                                    fontSize: 15.sp,
                                    fontWeight: FontWeight.w400,
                                    letterSpacing: 0.12.r,
                                  ),
                                ),
                              ),
                            ),
                          19.verticalSpace,
                          InputField(
                            hintText: 'Enter Password',
                            labelText: 'Password',
                            onChanged: (value) => password.value = value,
                            onChildTap: () =>
                                hidePassword.value = !hidePassword.value,
                            keyboardType: TextInputType.visiblePassword,
                            textInputAction: TextInputAction.done,
                            hideText: hidePassword.value,
                            hasValue: password.value.isNotEmpty,
                            autofillHints: const [AutofillHints.password],
                            validator: ValidationBuilder(
                              requiredMessage: 'Password is required',
                            ).build(),
                            child: Icon(
                              hidePassword.value
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: const Color(0xFF858585),
                              size: 19.52.r,
                            ),
                          ),
                          13.01.verticalSpace,
                          GestureDetector(
                            onTap: () => context.go(
                              const ForgotPasswordRoute().location,
                            ),
                            child: Text(
                              'Forgot Password?',
                              style: textTheme.bodySmall?.copyWith(
                                color: kDarkPrimaryColor,
                                fontSize: 14.sp,
                                fontWeight: FontWeight.w400,
                                letterSpacing: 0.12.r,
                              ),
                            ),
                          ),
                          25.verticalSpace,
                          PrimaryActionButton(
                            label: 'Login',
                            onPressed: () async {
                              if (!formKey.currentState!.validate()) return;

                              // Make request to login
                              await ref
                                  .read(authControllerProvider.notifier)
                                  .login(
                                    email: email.value,
                                    password: password.value,
                                    phoneNumber: phone.value,
                                    usePhone: usePhone.value,
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
                              question: "Don't have an account?",
                              action: 'Register',
                              onPressed: () => context.go(
                                const RegisterRoute().location,
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
