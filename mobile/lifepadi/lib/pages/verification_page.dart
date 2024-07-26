import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/my_icon_button.dart';
import 'package:lifepadi/widgets/primary_button.dart';
import 'package:pinput/pinput.dart';

class VerificationPage extends HookConsumerWidget {
  const VerificationPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = context.textTheme;
    const focusedBorderColor = Color(0xFF21D1A5);
    const borderColor = Color(0xFFD9DFE6);
    final pinController = TextEditingController();
    final focusNode = FocusNode();
    final formKey = GlobalKey<FormState>();
    Future<void> login() => ref.read(authControllerProvider.notifier).login(
          'myEmail',
          'myPassword',
        );

    final defaultPinTheme = PinTheme(
      width: 54.h,
      height: 54.h,
      textStyle: textTheme.bodyLarge?.copyWith(
        fontSize: 20.sp,
        color: const Color(0xFF39434F),
        fontWeight: FontWeight.w500,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14.r),
        border: Border.all(color: borderColor),
      ),
      margin: EdgeInsets.only(right: 8.r),
    );

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Assets.images.authHeros.verification.image(
              height: 0.55.sh,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 0.45.sh,
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
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Code verification',
                          style: textTheme.titleMedium?.copyWith(
                            color: const Color(0xFF151522),
                            fontSize: 28.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        7.verticalSpace,
                        RichText(
                          text: TextSpan(
                            children: [
                              TextSpan(
                                text:
                                    'Please enter the 4 digit code sent to your mobile number',
                                style: textTheme.bodyMedium?.copyWith(
                                  color: const Color(0xFF808B9A),
                                  fontSize: 14.sp,
                                  fontWeight: FontWeight.w300,
                                ),
                              ),
                              TextSpan(
                                text: ' +40 700 000 000',
                                style: textTheme.bodyMedium?.copyWith(
                                  color: const Color(0xFF808B9A),
                                  fontSize: 16.sp,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),
                        19.28.verticalSpace,
                        Padding(
                          padding:
                              const EdgeInsets.symmetric(horizontal: 10.5).w,
                          child: Center(
                            child: Form(
                              key: formKey,
                              child: Pinput(
                                controller: pinController,
                                focusNode: focusNode,
                                defaultPinTheme: defaultPinTheme,
                                validator: (value) {
                                  return value == '3333'
                                      ? null
                                      : 'Code is incorrect';
                                },
                                hapticFeedbackType:
                                    HapticFeedbackType.lightImpact,
                                onCompleted: (pin) {
                                  logger.i('onCompleted: $pin');
                                  // TODO: Validate and login if pin is correct
                                },
                                cursor: Column(
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    Container(
                                      margin:
                                          const EdgeInsets.only(bottom: 9).r,
                                      width: 22.w,
                                      height: 1.h,
                                      color: focusedBorderColor,
                                    ),
                                  ],
                                ),
                                focusedPinTheme: defaultPinTheme.copyWith(
                                  decoration:
                                      defaultPinTheme.decoration!.copyWith(
                                    borderRadius: BorderRadius.circular(8.r),
                                    border:
                                        Border.all(color: focusedBorderColor),
                                  ),
                                ),
                                submittedPinTheme: defaultPinTheme.copyWith(
                                  decoration:
                                      defaultPinTheme.decoration!.copyWith(
                                    borderRadius: BorderRadius.circular(14.r),
                                    border:
                                        Border.all(color: focusedBorderColor),
                                  ),
                                ),
                                errorPinTheme: defaultPinTheme.copyBorderWith(
                                  border: Border.all(color: Colors.redAccent),
                                ),
                              ),
                            ),
                          ),
                        ),
                        20.verticalSpace,
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              "Didn't get the code?",
                              style: textTheme.bodyMedium?.copyWith(
                                color: const Color(0xFF606873),
                                fontSize: 14.sp,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            8.horizontalSpace,
                            Text(
                              'Resend code',
                              style: textTheme.bodyMedium?.copyWith(
                                color: kDarkPrimaryColor,
                                fontSize: 14.sp,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                        27.verticalSpace,
                        PrimaryButton(
                          text: 'Proceed',
                          onPressed: () {
                            if (formKey.currentState!.validate()) {
                              // TODO: Log registered user into home page

                              showToast('Verified successfully');

                              // For now, just call login
                              login();
                            }
                          },
                        ),
                        27.verticalSpace,
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
