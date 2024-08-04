import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/logout_button.dart';
import 'package:lifepadi/widgets/my_icon_button.dart';

import '../widgets/profile_image_and_location.dart';
import '../widgets/settings_panel.dart';
import '../widgets/settings_tile.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(
              'Profile',
              style: context.textTheme.titleLarge?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                fontSize: 20.sp,
              ),
            ),
            titleSpacing: 24.w,
            expandedHeight: 275.h,
            floating: true,
            pinned: true,
            backgroundColor: kDarkPrimaryColor,
            surfaceTintColor: kDarkPrimaryColor,
            flexibleSpace: FlexibleSpaceBar(
              background: Container(
                decoration: const BoxDecoration(
                  gradient: RadialGradient(
                    colors: [Color(0xFF90DB19), kDarkPrimaryColor],
                    radius: 0.85,
                    center: Alignment(0.7386, -0.668),
                    stops: [0.0, 1.0],
                  ),
                ),
                padding: EdgeInsets.only(top: 75.h),
                child: const ProfileImageAndLocation(),
              ),
            ),
            actions: [
              MyIconButton(
                icon: IconsaxPlusLinear.user_edit,
                onPressed: () {
                  // TODO: Go to edit profile page.
                },
                backgroundColor: const Color(0x19F5F5F5),
                iconColor: Colors.white,
              ),
              24.horizontalSpace,
            ],
          ),
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 14.h),
            sliver: SliverList.list(
              children: [
                SettingsPanel(
                  title: 'Personal Details',
                  child: Column(
                    children: [
                      for (final _ in Iterable<int>.generate(5))
                        const Text('lorem ipsum dolor sit amet'),
                    ],
                  ),
                ),
                SettingsPanel(
                  title: 'Account management',
                  child: Column(
                    children: [
                      for (final _ in Iterable<int>.generate(3))
                        const Text('lorem ipsum dolor sit amet'),
                    ],
                  ),
                ),
                SettingsTile(
                  title: 'Wishlist',
                  onTap: () {
                    // TODO: Go to wishlist page.
                  },
                ),
                SettingsTile(
                  title: 'Chats',
                  onTap: () {
                    // TODO: Go to chats page.
                  },
                ),
                SettingsTile(
                  title: 'Wallets',
                  onTap: () {
                    // TODO: Go to wallets page.
                  },
                ),
                SettingsTile(
                  title: 'Customer support',
                  onTap: () {
                    // TODO: Go to support page.
                  },
                ),
                SettingsTile(
                  title: 'Settings',
                  onTap: () {
                    // TODO: Go to settings page.
                  },
                ),
              ].separatedBy(5.verticalSpace),
            ),
          ),
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 24.h)
                .copyWith(top: 12.h),
            sliver: const SliverToBoxAdapter(
              child: LogoutButton(),
            ),
          ),
        ],
      ),
    );
  }
}
