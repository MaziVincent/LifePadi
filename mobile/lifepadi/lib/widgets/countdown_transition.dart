import 'package:flutter/material.dart';
import 'package:lifepadi/utils/constants.dart';

class CountdownTransition extends AnimatedWidget {
  const CountdownTransition({
    super.key,
    required this.animation,
  }) : super(listenable: animation);

  final Animation<int> animation;

  @override
  Widget build(BuildContext context) {
    final duration = Duration(seconds: animation.value);
    final timerText = '${duration.inSeconds}s';

    return duration.inSeconds == 0
        ? const SizedBox.shrink()
        : Text(
            timerText,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color:
                      duration.inSeconds != 0 ? kDarkPrimaryColor : Colors.grey,
                  fontWeight: FontWeight.bold,
                ),
          );
  }
}
