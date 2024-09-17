import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:lifepadi/hooks/use_side_effect.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/primary_button.dart';
import 'package:lifepadi/widgets/widgets.dart';

class PrimaryActionButton extends HookWidget {
  const PrimaryActionButton({
    super.key,
    required this.onPressed,
    required this.label,
    this.iconWidget,
  });

  final AsyncCallback onPressed;
  final String label;
  final Widget? iconWidget;

  @override
  Widget build(BuildContext context) {
    final (clear: _, :mutate, :snapshot) = useSideEffect<void>();
    Future<void> pressButton() async {
      final future = onPressed();
      mutate(future);
      try {
        await future;
      } catch (exception) {
        if (!context.mounted) return;
        await showToast('Something went wrong $exception');
      }
    }

    return PrimaryButton(
      onPressed: switch (snapshot) {
        AsyncSnapshot(connectionState: ConnectionState.waiting) => null,
        _ => pressButton,
      },
      text: label,
      iconWidget: switch (snapshot) {
        AsyncSnapshot(connectionState: ConnectionState.waiting) =>
          const OrangeyLoadingWheel(),
        _ => iconWidget ?? const SizedBox.shrink(),
      },
    );
  }
}
