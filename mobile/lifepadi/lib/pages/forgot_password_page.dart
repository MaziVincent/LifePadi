import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/input_field.dart';
import 'package:lifepadi/widgets/primary_button.dart';

class ForgotPasswordPage extends HookConsumerWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;
    final usePhone = useState(true);
    final formKey = useMemoized(GlobalKey<FormState>.new);
    // Create the input states
    final email = useState('');
    final phone = useState('');

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Assets.images.authHeros.forgotPassword.image(
              height: 0.6.sh,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 0.4.sh,
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
                child: SizedBox.expand(
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    child: Form(
                      key: formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Forgot password?',
                            style: textTheme.titleMedium?.copyWith(
                              color: const Color(0xFF151522),
                              fontSize: 28.sp,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          10.28.verticalSpace,
                          Text(
                            "Don't worry! It happens. Please enter the email/phone number associated with your account.",
                            style: textTheme.bodyMedium?.copyWith(
                              color: const Color(0xFF999999),
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w300,
                            ),
                          ),
                          16.verticalSpace,
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
                          25.verticalSpace,
                          PrimaryButton(
                            text: 'Continue',
                            onPressed: () {
                              // Go to reset password page
                            },
                          ),
                          30.verticalSpace,
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
