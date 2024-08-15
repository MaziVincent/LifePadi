import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/my_icon_button.dart';

/// Customer app bar title that can either be a [String] or a [Widget].
typedef TitleType = Object;

/// Extension on [TitleType] to determine its type.
extension TitleTypeExtension on TitleType {
  bool get isString => this is String;
  bool get isWidget => this is Widget;
}

/// Custom app bar for the application.
class MyAppBar extends StatelessWidget implements PreferredSizeWidget {
  const MyAppBar({
    super.key,
    required this.title,
    this.actions,
    this.textStyle,
    this.selectedColor = Colors.black,
    this.bottom,
    this.height,
  }) : assert(
          bottom == null || height != null,
          'Height must be provided when bottom is not null',
        );

  final TitleType title;
  final List<Widget>? actions;
  final TextStyle? textStyle;
  final Color selectedColor;
  final PreferredSizeWidget? bottom;
  final double? height;

  @override
  Size get preferredSize => Size.fromHeight(height ?? 75.h);

  @override
  Widget build(BuildContext context) {
    final canPop = ModalRoute.of(context)?.canPop ?? false;

    return Padding(
      padding: EdgeInsets.only(
        top: 16.h,
        bottom: 16.h,
        right: 24.w,
        left: canPop ? 24.w : 0,
      ),
      child: AppBar(
        title: _buildTitle(context),
        titleSpacing: canPop ? 14.w : 24.w,
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        actions: actions,
        bottom: bottom,
        leading: canPop
            ? MyIconButton(
                icon: IconsaxPlusLinear.arrow_left_1,
                onPressed: () => context.pop(),
              )
            : null,
        leadingWidth: 38.w,
      ),
    );
  }

  /// Builds the title of the app bar.
  Widget _buildTitle(BuildContext context) {
    final defaultStyle = context.textTheme.titleLarge?.copyWith(
      fontSize: 20.sp,
      fontWeight: FontWeight.w700,
    );

    if (title.isString) {
      return Text(
        title as String,
        style: textStyle ?? defaultStyle,
      );
    } else if (title.isWidget) {
      return title as Widget;
    } else {
      throw ArgumentError('Title must be either a String or a Widget');
    }
  }
}
