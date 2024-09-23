import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/countdown_transition.dart';
import 'package:lifepadi/widgets/loading_wheel.dart';
import 'package:pinput/pinput.dart';

class PhoneVerificationWidget extends HookWidget {
  const PhoneVerificationWidget({
    super.key,
    required this.phoneNumber,
    required this.onVerified,
    required this.pinId,
  });

  /// The phone number to verify
  final String phoneNumber;

  /// Callback to call when the phone number is verified
  final VoidCallback onVerified;

  /// The pin ID to verify the phone number
  final String pinId;

  @override
  Widget build(BuildContext context) {
    final textTheme = context.textTheme;
    const focusedBorderColor = Color(0xFF21D1A5);
    const borderColor = Color(0xFFD9DFE6);
    final focusNode = FocusNode();
    final formKey = GlobalKey<FormState>();
    final loading = useState(false);
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
    final isWaiting = useState(true);
    final controller = useAnimationController(duration: 60.seconds)
      ..addStatusListener((status) {
        if (status == AnimationStatus.forward) isWaiting.value = true;
        if (status == AnimationStatus.completed) isWaiting.value = false;
      })
      ..forward();

    return SingleChildScrollView(
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
          if (loading.value)
            const GreenyLoadingWheel()
          else
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
                    text: ' $phoneNumber',
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
            padding: const EdgeInsets.symmetric(horizontal: 10.5).w,
            child: Center(
              child: Form(
                key: formKey,
                child: Consumer(
                  builder: (context, ref, child) => Pinput(
                    focusNode: focusNode,
                    defaultPinTheme: defaultPinTheme,
                    hapticFeedbackType: HapticFeedbackType.lightImpact,
                    onCompleted: (pin) async {
                      if (formKey.currentState!.validate()) {
                        loading.value = true;

                        // Make API call to verify the code
                        await ref
                            .read(authControllerProvider.notifier)
                            .verifyPhoneNumber(
                              pinId: pinId,
                              pin: pin,
                            )
                            .then(
                          (verified) async {
                            if (verified) {
                              await showToast(
                                'Phone number verified successfully',
                                isLong: true,
                              );

                              onVerified();
                            }
                          },
                          onError: (dynamic err) => handleError(
                            err is PhoneVerificationFailedException
                                ? err.message
                                : err,
                            context.mounted ? context : null,
                          ),
                        ).whenComplete(() => loading.value = false);
                      }
                    },
                    cursor: Column(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Container(
                          margin: const EdgeInsets.only(bottom: 9).r,
                          width: 22.w,
                          height: 1.h,
                          color: focusedBorderColor,
                        ),
                      ],
                    ),
                    focusedPinTheme: defaultPinTheme.copyWith(
                      decoration: defaultPinTheme.decoration!.copyWith(
                        borderRadius: BorderRadius.circular(8.r),
                        border: Border.all(color: focusedBorderColor),
                      ),
                    ),
                    submittedPinTheme: defaultPinTheme.copyWith(
                      decoration: defaultPinTheme.decoration!.copyWith(
                        borderRadius: BorderRadius.circular(14.r),
                        border: Border.all(color: focusedBorderColor),
                      ),
                    ),
                    errorPinTheme: defaultPinTheme.copyBorderWith(
                      border: Border.all(color: Colors.redAccent),
                    ),
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
              Consumer(
                builder: (context, ref, child) {
                  return GestureDetector(
                    onTap: isWaiting.value
                        ? null
                        : () async {
                            controller
                              ..reset()
                              ..forward();

                            await ref
                                .read(
                                  authControllerProvider.notifier,
                                )
                                .sendVerificationCode(phoneNumber)
                                .then(
                              (String pinId) async {
                                await showToast(
                                  'Verification code sent to $phoneNumber',
                                );
                              },
                              onError: (dynamic error) async {
                                await handleError(
                                  error,
                                  context.mounted ? context : null,
                                );
                              },
                            );
                          },
                    child: child,
                  );
                },
                child: Text(
                  isWaiting.value ? 'Please wait' : 'Resend code',
                  style: textTheme.bodyMedium?.copyWith(
                    color: isWaiting.value ? Colors.grey : kDarkPrimaryColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              8.horizontalSpace,
              CountdownTransition(
                animation: StepTween(begin: 60, end: 0).animate(controller),
              ),
            ],
          ),
          // 27.verticalSpace,
        ],
      ),
    );
  }
}
