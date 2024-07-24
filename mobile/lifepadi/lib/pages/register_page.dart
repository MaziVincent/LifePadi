import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/primary_button.dart';
import 'package:lifepadi/widgets/toggle_auth_page.dart';

import '../widgets/input_field.dart';

class RegisterPage extends HookConsumerWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;
    final hidePassword = useState(true);
    final hideConfirmPassword = useState(true);
    final usePhone = useState(true);
    final formKey = useMemoized(GlobalKey<FormState>.new);
    // Create the input states
    final email = useState('');
    final password = useState('');
    final phone = useState('');
    final confirmPassword = useState('');

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
                  // TODO: Validate the form inputs properly
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
                        if (usePhone.value)
                          InputField(
                            hintText: 'Enter Phone',
                            labelText: 'Phone',
                            onChanged: (value) => phone.value = value,
                            onTap: () {
                              // Hide this, show email input field
                              usePhone.value = false;
                              // Remove keyboard
                              FocusScope.of(context).unfocus();
                              // Clear the phone input field
                              phone.value = '';
                            },
                            keyboardType: TextInputType.phone,
                            hasValue: phone.value.isNotEmpty,
                            child: Padding(
                              padding: const EdgeInsets.only(
                                top: 13,
                                right: 9.76,
                              ).r,
                              child: Text(
                                'Use Email',
                                style: textTheme.bodySmall?.copyWith(
                                  color: kDarkPrimaryColor,
                                  fontSize: 14.sp,
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
                            onTap: () {
                              // Hide this, show phone number input field
                              usePhone.value = true;
                              // Remove keyboard
                              FocusScope.of(context).unfocus();
                              // Clear the email input field
                              email.value = '';
                            },
                            keyboardType: TextInputType.emailAddress,
                            hasValue: email.value.isNotEmpty,
                            child: Padding(
                              padding: const EdgeInsets.only(
                                top: 13,
                                right: 9.76,
                              ).r,
                              child: Text(
                                'Use Phone',
                                style: textTheme.bodySmall?.copyWith(
                                  color: kDarkPrimaryColor,
                                  fontSize: 14.sp,
                                  fontWeight: FontWeight.w400,
                                  letterSpacing: 0.12.r,
                                ),
                              ),
                            ),
                          ),
                        19.verticalSpace,
                        InputField(
                          hintText: 'Enter New Password',
                          labelText: 'Password',
                          onChanged: (value) => password.value = value,
                          onTap: () => hidePassword.value = !hidePassword.value,
                          keyboardType: TextInputType.visiblePassword,
                          hideText: hidePassword.value,
                          hasValue: password.value.isNotEmpty,
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
                          onTap: () => hideConfirmPassword.value =
                              !hideConfirmPassword.value,
                          keyboardType: TextInputType.visiblePassword,
                          textInputAction: TextInputAction.done,
                          hideText: hideConfirmPassword.value,
                          hasValue: confirmPassword.value.isNotEmpty,
                          child: Icon(
                            hideConfirmPassword.value
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: const Color(0xFF858585),
                            size: 19.52.r,
                          ),
                        ),
                        25.verticalSpace,
                        PrimaryButton(
                          text: 'Register',
                          onPressed: () {
                            if (!formKey.currentState!.validate()) return;

                            // TODO: Make request to register

                            // For now, go to code verification
                            context.go(const VerificationRoute().location);
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
                        15.verticalSpace,
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20).w,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Expanded(
                                child: Divider(
                                  thickness: 0.81.r,
                                  color: const Color(0xFFC2C8D0),
                                ),
                              ),
                              13.01.horizontalSpace,
                              Text(
                                'OR',
                                style: GoogleFonts.roboto(
                                  color: const Color(0xFF2D333A),
                                  fontSize: 9.76.sp,
                                  fontWeight: FontWeight.w400,
                                  letterSpacing: 0.33.r,
                                ),
                              ),
                              13.01.horizontalSpace,
                              Expanded(
                                child: Divider(
                                  thickness: 0.81.r,
                                  color: const Color(0xFFC2C8D0),
                                ),
                              ),
                            ],
                          ),
                        ),
                        16.verticalSpace,
                        Container(
                          width: double.infinity,
                          height: 41.15.h,
                          margin: const EdgeInsets.symmetric(horizontal: 28).w,
                          padding:
                              const EdgeInsets.symmetric(vertical: 10.57).h,
                          decoration: ShapeDecoration(
                            color: Colors.white,
                            shape: RoundedRectangleBorder(
                              side: const BorderSide(
                                width: 0.81,
                                color: Color(0xFFC2C8D0),
                              ),
                              borderRadius: BorderRadius.circular(44),
                            ),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Assets.images.icons.google.svg(
                                width: 16.27.r,
                                height: 16.27.r,
                              ),
                              9.76.horizontalSpace,
                              Text(
                                'Continue with Google',
                                style: textTheme.bodyMedium?.copyWith(
                                  color: const Color(0xFF2D333A),
                                  fontSize: 13.01.sp,
                                  fontWeight: FontWeight.w500,
                                  letterSpacing: 0.12.r,
                                ),
                              ),
                            ],
                          ),
                        ),
                        33.85.verticalSpace,
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
                child: IconButton(
                  onPressed: () => context.pop(),
                  icon: Icon(
                    Icons.arrow_back_ios,
                    color: Colors.white,
                    size: 18.r,
                  ),
                  style: IconButton.styleFrom(
                    backgroundColor: const Color(0x19F5F5F5),
                    fixedSize: Size.square(34.r),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4.r),
                    ),
                    padding: EdgeInsets.only(left: 8.r),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
