import 'dart:math' as math;

import 'package:expandable/expandable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';

class SettingsPanel extends StatelessWidget {
  const SettingsPanel({
    super.key,
    required this.title,
    required this.child,
  });

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ExpandableNotifier(
      child: ScrollOnExpand(
        child: Column(
          children: <Widget>[
            ExpandablePanel(
              theme: const ExpandableThemeData(
                headerAlignment: ExpandablePanelHeaderAlignment.center,
                tapBodyToExpand: true,
                tapBodyToCollapse: true,
                hasIcon: false,
              ),
              header: Container(
                padding: EdgeInsets.only(
                  top: 9.53.h,
                  left: 9.w,
                  right: 10.w,
                  bottom: 8.53.h,
                ),
                decoration: const BoxDecoration(
                  border: Border(
                    bottom: BorderSide(color: kStrokeColor),
                  ),
                ),
                child: Builder(
                  builder: (context) {
                    final controller =
                        ExpandableController.of(context, required: true);

                    return Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          title,
                          style:
                              Theme.of(context).textTheme.bodyLarge!.copyWith(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 16.sp,
                                    color: controller!.expanded
                                        ? kLightPrimaryColor
                                        : const Color(0xFF19202D),
                                    letterSpacing: 0.32,
                                  ),
                        ),
                        ExpandableIcon(
                          theme: ExpandableThemeData(
                            expandIcon: IconsaxPlusLinear.arrow_right_3,
                            collapseIcon: IconsaxPlusLinear.arrow_down,
                            iconSize: 28.r,
                            iconColor: controller.expanded
                                ? kLightPrimaryColor
                                : const Color(0xFF808089),
                            iconRotationAngle: math.pi / 2,
                            iconPadding: EdgeInsets.zero,
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              collapsed: const SizedBox.shrink(),
              expanded: child,
            ),
          ],
        ),
      ),
    );
  }
}
