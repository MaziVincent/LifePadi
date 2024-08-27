import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ProfilePage extends HookWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final showNotifications = useState(true);

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
                  gradient: kRadialGradient,
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
                const SettingsPanel(
                  title: 'Personal Details',
                  child: Column(
                    children: [
                      ProfileDetailInfo(
                        name: 'Email',
                        value: 'tobechijacobs@gmail.com',
                      ),
                      ProfileDetailInfo(
                        name: 'Phone Number',
                        value: '07012345678',
                      ),
                      ProfileDetailInfo(
                        name: 'Date of birth',
                        value: '20-05-1900',
                      ),
                      ProfileDetailInfo(
                        name: 'Gender',
                        value: 'Male',
                      ),
                      ProfileDetailInfo(
                        name: 'Address',
                        value: '3A, Ikota estate, eti-osa, Lagos, NG',
                      ),
                    ],
                  ),
                ),
                SettingsPanel(
                  title: 'Account management',
                  child: Column(
                    children: [
                      AccountManagementTile(
                        name: 'Update Location',
                        onTap: () {
                          // TODO: Go to location page
                        },
                      ),
                      AccountManagementTile(
                        name: 'Payment Information',
                        onTap: () {
                          // TODO: Go to tentative page
                        },
                      ),
                      AccountManagementTile(
                        name: 'Notification',
                        child: SizedBox(
                          height: 40.53.h,
                          width: 30.83.w,
                          child: FittedBox(
                            fit: BoxFit.cover,
                            child: Switch.adaptive(
                              value: showNotifications.value,
                              onChanged: (value) {
                                // TODO: Update notification settings

                                // For now, just update the UI
                                showNotifications.value = value;
                              },
                              activeTrackColor: kLightPrimaryColor,
                              trackOutlineWidth:
                                  const WidgetStatePropertyAll(1),
                              inactiveTrackColor: Colors.white,
                            ),
                          ),
                        ),
                      ),
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
                  onTap: () => context.push(const ChatsRoute().location),
                ),
                SettingsTile(
                  title: 'Wallets',
                  onTap: () {
                    // TODO: Go to wallets page.
                  },
                ),
                SettingsTile(
                  title: 'Settings',
                  onTap: () {
                    // TODO: Go to settings page.
                  },
                ),
                SettingsTile(
                  title: 'Customer support',
                  onTap: () {
                    // TODO: Go to support page.
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
