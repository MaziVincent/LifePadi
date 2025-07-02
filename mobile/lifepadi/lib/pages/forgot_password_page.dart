import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ForgotPasswordPage extends HookConsumerWidget {
  const ForgotPasswordPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final formKey = useMemoized(GlobalKey<FormState>.new);
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
                            style: context.textTheme.titleMedium?.copyWith(
                              color: const Color(0xFF151522),
                              fontSize: 28.sp,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          10.28.verticalSpace,
                          Text(
                            "Don't worry! It happens. Please enter the email/phone number associated with your account.",
                            style: context.textTheme.bodyMedium?.copyWith(
                              color: const Color(0xFF999999),
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w300,
                            ),
                          ),
                          16.verticalSpace,
                          PhoneInputField(
                            phone: phone,
                            onChildTap: () {
                              // Remove keyboard
                              FocusScope.of(context).unfocus();
                              // Clear the phone input field
                              phone.value = '';
                            },
                          ),
                          25.verticalSpace,
                          PrimaryActionButton(
                            text: 'Continue',
                            onPressed: () async {
                              if (!formKey.currentState!.validate()) return;

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
                                          // Go to reset password page
                                          context
                                            ..pop()
                                            ..go(
                                              ResetPasswordRoute(
                                                phoneNumber: phone.value,
                                              ).location,
                                            );
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
                child: const GlassmorphicBackButton(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
