import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class ProfileImageAndLocation extends ConsumerWidget {
  const ProfileImageAndLocation({
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider);

    return switch (user) {
      AsyncData(:final value) => _ProfilePageContent(user: value),
      AsyncError(:final error) => MyErrorWidget(error: error),
      _ => const OrangeyLoadingWheel(),
    };
  }
}

class _ProfilePageContent extends StatelessWidget {
  const _ProfilePageContent({
    required this.user,
  });

  final User user;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        16.verticalSpace,
        SizedBox(
          height: 130.h,
          width: 125.w,
          child: Container(
            height: 100.h,
            width: 100.h,
            decoration: BoxDecoration(
              // ?color: Necessary because the image could be NetworkImage.
              color: const Color(0xFFB9B9B9),
              shape: BoxShape.circle,
              image: DecorationImage(
                image: Assets.images.profileAvatar.provider(),
                fit: BoxFit.fill,
              ),
            ),
          ),
        ),
        12.verticalSpace,
        Text(
          user.name,
          style: context.textTheme.bodyLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w600,
            fontSize: 20.sp,
            letterSpacing: -0.24,
          ),
        ),
        4.verticalSpace,
        Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Remix.map_pin_5_line,
              size: 18.r,
              color: kStrokeColor,
            ),
            4.horizontalSpace,
            Text(
              user.address ?? 'Not set',
              style: context.textTheme.bodySmall?.copyWith(
                color: kStrokeColor,
                fontWeight: FontWeight.w400,
                fontSize: 12.sp,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
