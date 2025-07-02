import 'package:flutter/foundation.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/hooks/hooks.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class PrimaryActionButton extends HookWidget {
  const PrimaryActionButton({
    super.key,
    required this.onPressed,
    required this.text,
    this.iconWidget,
    this.radius,
    this.loadingWheelSize,
    this.fontSize,
  });

  final AsyncCallback? onPressed;
  final String text;
  final Widget? iconWidget;
  final double? radius, loadingWheelSize, fontSize;

  @override
  Widget build(BuildContext context) {
    final loadingSize = loadingWheelSize ?? 20.sp;
    final (clear: _, :mutate, :snapshot) = useSideEffect<void>();
    Future<void> pressButton() async {
      final future = onPressed!();
      mutate(future);
      try {
        await future;
      } catch (exception) {
        if (!context.mounted) return;
        await handleError(exception, context);
      }
    }

    return PrimaryButton(
      onPressed: switch (snapshot) {
        AsyncSnapshot(connectionState: ConnectionState.waiting) => null,
        _ => onPressed != null ? pressButton : null,
      },
      text: text,
      iconWidget: switch (snapshot) {
        AsyncSnapshot(connectionState: ConnectionState.waiting) =>
          OrangeyLoadingWheel(size: loadingSize),
        _ => iconWidget ?? const SizedBox.shrink(),
      },
      radius: radius,
      fontSize: fontSize,
    );
  }
}
