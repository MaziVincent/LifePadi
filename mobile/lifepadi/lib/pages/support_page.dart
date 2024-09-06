import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class SupportPage extends HookWidget {
  const SupportPage({super.key});

  @override
  Widget build(BuildContext context) {
    final subject = useState('');
    final message = useState('');

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Customer Support',
      ),
      body: ListView(
        padding: kHorizontalPadding.copyWith(top: 29.h, bottom: 20.h),
        children: [
          InputField(
            hintText: 'Caption your message',
            labelText: 'Subject',
            onChanged: (value) => subject.value = value,
            keyboardType: TextInputType.text,
            hasValue: subject.value.isNotEmpty,
          ),
          InputField(
            hintText: 'Enter your message',
            labelText: 'Message',
            onChanged: (value) => message.value = value,
            keyboardType: TextInputType.multiline,
            hasValue: message.value.isNotEmpty,
            maxLines: 3,
            textInputAction: TextInputAction.newline,
          ),
          33.verticalSpace,
          PrimaryButton(
            text: 'Submit Compliant',
            onPressed: () async {
              // TODO: Submit the compliant
              // Use current user's name and email address if they are required

              // Clear the input fields

              // Show a success dialog
              await openChoiceDialog(
                context: context,
                title: 'Complaint Sent!',
                description:
                    'Your complaint was successfully sent, we will look into it as soon as possible.',
                icon: MdiIcons.check,
                yesText: 'Okay',
                cancelText: 'Close',
                iconBackgroundColor: kDarkPrimaryColor,
                iconColor: Colors.white,
              );
            },
          ),
        ].separatedBy(16.verticalSpace),
      ),
    );
  }
}
