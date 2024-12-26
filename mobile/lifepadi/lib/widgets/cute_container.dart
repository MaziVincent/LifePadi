import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CuteContainer extends StatelessWidget {
  const CuteContainer({
    super.key,
    required this.child,
  });

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(8.r),
        border: Border.all(color: const Color(0xFFE5E5E5)),
      ),
      child: child,
    );
  }
}
