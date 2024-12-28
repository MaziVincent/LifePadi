import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/customer_support.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class SupportPage extends HookConsumerWidget {
  const SupportPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final subject = useState('');
    final message = useState('');
    final formKey = useMemoized(GlobalKey<FormState>.new);

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Customer Support',
      ),
      body: Form(
        key: formKey,
        child: SuperListView(
          padding: kHorizontalPadding.copyWith(top: 29.h, bottom: 20.h),
          children: [
            InputField(
              hintText: 'Caption your message',
              labelText: 'Subject',
              onChanged: (value) => subject.value = value,
              keyboardType: TextInputType.text,
              hasValue: subject.value.isNotEmpty,
              validator: ValidationBuilder(
                requiredMessage: 'Subject is required',
              )
                  .minLength(3, 'Subject must be at least 3 characters')
                  .maxLength(100, 'Subject is too long')
                  .build(),
            ),
            InputField(
              hintText: 'Enter your message',
              labelText: 'Message',
              onChanged: (value) => message.value = value,
              keyboardType: TextInputType.multiline,
              hasValue: message.value.isNotEmpty,
              maxLines: 3,
              textInputAction: TextInputAction.newline,
              validator: ValidationBuilder(
                requiredMessage: 'Message is required',
              )
                  .minLength(10, 'Message must be at least 10 characters')
                  .maxLength(500, 'Message is too long')
                  .build(),
            ),
            33.verticalSpace,
            PrimaryActionButton(
              text: 'Submit Complaint',
              onPressed: () async {
                if (!formKey.currentState!.validate()) return;

                try {
                  await ref.read(
                    customerSupportProvider(
                      subject: subject.value,
                      message: message.value,
                    ).future,
                  );

                  // Clear the input fields
                  subject.value = '';
                  message.value = '';
                  formKey.currentState?.reset();

                  if (context.mounted) {
                    // Show success dialog
                    await openSuccessDialog(
                      context: context,
                      title: 'Complaint Sent!',
                      description:
                          'Your complaint was successfully sent, we will look into it as soon as possible.',
                    );
                  }
                } catch (e) {
                  await handleError(e, context.mounted ? context : null);
                }
              },
            ),
          ].separatedBy(16.verticalSpace),
        ),
      ),
    );
  }
}
