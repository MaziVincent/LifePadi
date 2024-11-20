import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/user_role.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/choice_alert_dialog.dart';
import 'package:logger/logger.dart';
import 'package:skeletonizer/skeletonizer.dart';

import 'constants.dart';

/// Onboarding Feature information.
typedef OnboardingInfo = ({String info, String description, String image});

/// A map with string keys and dynamic values.
typedef JsonMap = Map<String, dynamic>;

Logger logger = Logger(
  printer: PrettyPrinter(
    methodCount: 0,
  ),
);

/// Show a toast message.
Future<bool?> showToast(
  String message, {
  bool isLong = false,
  Color? backgroundColor,
  double? fontSize,
  Color? textColor,
  ToastGravity? gravity,
}) {
  return Fluttertoast.showToast(
    msg: message,
    backgroundColor: backgroundColor ?? Colors.black54,
    toastLength: isLong ? Toast.LENGTH_LONG : Toast.LENGTH_SHORT,
    fontSize: fontSize,
    textColor: textColor,
    gravity: gravity,
  );
}

TextStyle? inputTextStyle(
  BuildContext context, {
  Color? color,
  double? fontSize,
  bool forUserEnteredText = false,
}) {
  return forUserEnteredText
      ? inputTextStyleForUserEnteredText(context)
      : context.textTheme.bodySmall?.copyWith(
          color: color ?? const Color(0xFFC2C8D0),
          fontSize: fontSize ?? 14.sp,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.12.r,
        );
}

OutlineInputBorder inputBorder({Color? color}) {
  return OutlineInputBorder(
    borderRadius: BorderRadius.circular(3.25.r),
    borderSide: BorderSide(
      color: color ?? const Color(0xFFC2C8D0),
      width: 0.81.r,
    ),
  );
}

TextStyle? floatingLabelTextStyle() => GoogleFonts.roboto(
      color: const Color(0xFF21D1A5),
      fontSize: 14.sp,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.33.r,
    );

TextStyle? inputTextStyleForUserEnteredText(BuildContext context) {
  return context.textTheme.bodyLarge?.copyWith(
    color: Colors.black,
    fontSize: 15.sp,
    fontWeight: FontWeight.w400,
    letterSpacing: 0.12.r,
  );
}

Future<bool?> displayBottomPanel(
  BuildContext context, {
  required Widget child,
}) {
  return showModalBottomSheet<bool>(
    context: context,
    builder: (BuildContext context) {
      return Container(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        width: double.infinity,
        child: Padding(
          padding: kHorizontalPadding.copyWith(bottom: 20.h),
          child: child,
        ),
      );
    },
    useRootNavigator: true,
  );
}

Future<bool?> openChoiceDialog({
  required BuildContext context,
  VoidCallback? onYes,
  VoidCallback? onCancel,
  required String title,
  required String description,
  String? yesText,
  String? cancelText,
  required IconData icon,
  Color? iconColor,
  Color? iconBackgroundColor,
  bool? hasCancel,
}) {
  return showDialog<bool>(
    context: context,
    builder: (context) {
      return Dialog(
        child: ChoiceAlertDialog(
          onYes: onYes,
          onCancel: onCancel,
          title: title,
          description: description,
          yesText: yesText,
          cancelText: cancelText,
          icon: icon,
          iconColor: iconColor,
          iconBackgroundColor: iconBackgroundColor,
          hasCancel: hasCancel ?? true,
        ),
      );
    },
  );
}

/// Success dialog
Future<bool?> openSuccessDialog({
  required BuildContext context,
  VoidCallback? onOk,
  VoidCallback? onCancel,
  required String title,
  required String description,
  String? yesText,
  String? cancelText,
  IconData icon = MdiIcons.check,
  Color iconColor = Colors.white,
  Color? iconBackgroundColor = kDarkPrimaryColor,
  bool hasClose = false,
}) async {
  return openChoiceDialog(
    context: context,
    title: title,
    description: description,
    yesText: 'Okay',
    cancelText: 'Close',
    onYes: onOk,
    onCancel: onCancel,
    icon: icon,
    iconColor: iconColor,
    iconBackgroundColor: iconBackgroundColor,
    hasCancel: hasClose,
  );
}

/// Display error.
Future<bool?> displayError(
  BuildContext context, {
  required String description,
  String? title,
  VoidCallback? onOk,
}) {
  return openChoiceDialog(
    context: context,
    title: title ?? 'An error occurred',
    description: description,
    icon: Icons.error,
    iconColor: Colors.red,
    iconBackgroundColor: Colors.red[100],
    yesText: 'Try again',
    cancelText: 'Close',
    onYes: onOk,
  );
}

Future<void> handleError(
  dynamic error,
  BuildContext? context,
) async {
  String? title;
  var description = error.toString();

  if (error is DioException) {
    title = error.error is SocketException ? 'No Internet Connection' : null;
    description = error.error is SocketException
        ? 'Please check your internet connection and try again'
        : error.response?.data.toString() ?? // Has a response
            error.message ?? // Dio Exception
            error.error.toString(); // Not Dio Exception
  }

  context != null
      ? await displayError(
          context,
          title: title,
          description: description,
        )
      : await showToast(
          description,
          isLong: true,
        );
}

JsonMap stripAuth(JsonMap json) {
  json['Email'] = '';
  json['accessToken'] = '';
  json['refreshToken'] = '';
  json['Role'] = UserRole.guest.toValue();
  return json;
}

Product makeFakeProduct({required int id}) {
  return Product(
    id: id,
    name: 'Product $id',
    imageUrl: 'foobarbaz',
    price: 2000,
    description: BoneMock.paragraph,
    vendor: Vendor(
      id: 1,
      name: 'Vendor $id',
      imageUrl: 'foobarbaz',
      phoneNumber: BoneMock.phone,
      address: LocationDetails(
        id: 1,
        address: BoneMock.address,
        city: BoneMock.city,
        state: BoneMock.subtitle,
        country: BoneMock.country,
        postalCode: BoneMock.subtitle,
        latitude: 0,
        longitude: 0,
        sublocality: BoneMock.subtitle,
        localGovernmentArea: BoneMock.subtitle,
      ),
    ),
    category: Category(
      id: 1,
      name: BoneMock.name,
      icon: 'http://${BoneMock.city}',
    ),
  );
}
