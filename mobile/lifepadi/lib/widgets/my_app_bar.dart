import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/buttons/my_icon_button.dart';

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
    this.backgroundColor,
    this.surfaceTintColor,
  })  : assert(
          bottom == null || height != null,
          'Height must be provided when bottom is not null',
        ),
        assert(
          title is String || title is Widget,
          'Title must be either a String or a Widget',
        );

  final Object title;
  final List<Widget>? actions;
  final TextStyle? textStyle;
  final Color selectedColor;
  final PreferredSizeWidget? bottom;
  final double? height;
  final Color? backgroundColor, surfaceTintColor;

  @override
  Size get preferredSize => Size.fromHeight(height ?? 75.h);

  @override
  Widget build(BuildContext context) {
    final canPop = ModalRoute.of(context)?.canPop ?? false;
    const backgroundColorBase = Colors.white;

    return Padding(
      padding: EdgeInsets.only(
        top: 16.h,
        bottom: 16.h,
      ),
      child: AppBar(
        title: _buildTitle(context),
        titleSpacing: canPop ? 14.w : 24.w,
        backgroundColor: backgroundColor ?? backgroundColorBase,
        surfaceTintColor:
            surfaceTintColor ?? backgroundColor ?? backgroundColorBase,
        actions: [
          if (actions != null) ...[
            ...actions!,
            16.horizontalSpace,
          ],
        ],
        bottom: bottom,
        leading: canPop
            ? Padding(
                padding: EdgeInsets.only(left: 24.w),
                child: MyIconButton(
                  icon: IconsaxPlusLinear.arrow_left_1,
                  onPressed: () => context.pop(),
                ),
              )
            : null,
        leadingWidth: 63.w, // 39 for left arrow + 24 for left padding
      ),
    );
  }

  /// Builds the title of the app bar.
  Widget? _buildTitle(BuildContext context) {
    final defaultStyle = context.textTheme.titleLarge?.copyWith(
      fontSize: 20.sp,
      fontWeight: FontWeight.w700,
      overflow: TextOverflow.ellipsis,
    );

    if (title is String) {
      return Text(
        title as String,
        style: textStyle ?? defaultStyle,
      );
    } else if (title is Widget) {
      return title as Widget;
    }

    return null;
  }
}
