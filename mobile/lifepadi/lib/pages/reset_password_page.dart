import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/validation.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ResetPasswordPage extends HookConsumerWidget {
  const ResetPasswordPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = context.textTheme;
    final hidePassword = useState(true);
    final hideConfirmPassword = useState(true);
    final formKey = useMemoized(GlobalKey<FormState>.new);
    // Create the input states
    final password = useState('');
    final confirmPassword = useState('');

    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Assets.images.authHeros.resetPassword.image(
              height: 0.54.sh,
              width: double.infinity,
              fit: BoxFit.fill,
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                height: 0.46.sh,
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
                          'Reset password',
                          style: textTheme.titleMedium?.copyWith(
                            color: const Color(0xFF151522),
                            fontSize: 28.sp,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        7.verticalSpace,
                        Text(
                          'Make sure your new password is strong and secure to protect your account.',
                          style: textTheme.bodyMedium?.copyWith(
                            color: const Color(0xFF999999),
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w300,
                          ),
                        ),
                        16.28.verticalSpace,
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
                        24.verticalSpace,
                        PrimaryButton(
                          text: 'Proceed',
                          onPressed: () async {
                            if (formKey.currentState!.validate()) {
                              await ref
                                  .read(authControllerProvider.notifier)
                                  .resetPassword(
                                    newPassword: password.value,
                                    userId: 1000,
                                  )
                                  .then(
                                (String message) async {
                                  if (context.mounted) {
                                    await openSuccessDialog(
                                      context: context,
                                      title: 'Reset Password',
                                      description: message,
                                      onOk: () => context
                                        ..pop()
                                        ..go(const LoginRoute().location),
                                    );
                                  } else {
                                    await showToast(message, isLong: true).then(
                                      (_) {
                                        if (context.mounted) {
                                          context.go(
                                            const LoginRoute().location,
                                          );
                                        }
                                      },
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
                            }
                          },
                        ),
                        30.verticalSpace,
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
