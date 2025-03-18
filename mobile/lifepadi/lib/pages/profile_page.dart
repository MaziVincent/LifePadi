import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class ProfilePage extends HookConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final showNotifications =
        useState(PreferencesHelper.getNotificationsEnabled());
    final user = ref.watch(authControllerProvider);
    final isAuthenticated = user.value?.isAuth ?? false;

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
              if (isAuthenticated)
                MyIconButton(
                  icon: IconsaxPlusLinear.user_edit,
                  onPressed: () =>
                      context.push(const EditProfileRoute().location),
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
                if (isAuthenticated)
                  SettingsPanel(
                    title: 'Personal Details',
                    child: switch (user) {
                      AsyncData(:final value) =>
                        _PersonalDetailsContent(user: value),
                      AsyncError(:final error) => MyErrorWidget(error: error),
                      _ => const GreenyLoadingWheel(),
                    },
                  ),
                SettingsPanel(
                  title: 'Account management',
                  child: Column(
                    children: [
                      if (isAuthenticated)
                        AccountManagementTile(
                          name: 'Locations',
                          onTap: () =>
                              context.push(const LocationsRoute().location),
                        ),
                      AccountManagementTile(
                        name: 'Notification',
                        child: SwitchInput(
                          value: showNotifications.value,
                          onChanged: (value) async {
                            if (!value) {
                              final confirmed = await openChoiceDialog(
                                context: context,
                                title: 'Disable Notifications',
                                description:
                                    'Are you sure you want to disable notifications? You might miss important updates.',
                                onYes: () async {
                                  await PreferencesHelper
                                      .setNotificationsEnabled(enabled: false);
                                  await FirebaseMessaging.instance
                                      .unsubscribeFromTopic('general');
                                  if (user.value?.isAuth == true) {
                                    await FirebaseMessaging.instance
                                        .unsubscribeFromTopic(
                                      'orders-${user.value?.id}',
                                    );
                                  }
                                  showNotifications.value = false;
                                },
                                icon: Remix.question_line,
                              );
                              if (confirmed != true) return;
                            } else {
                              await PreferencesHelper.setNotificationsEnabled(
                                enabled: true,
                              );
                              await FirebaseMessaging.instance
                                  .subscribeToTopic('general');
                              if (user.value?.isAuth == true) {
                                await FirebaseMessaging.instance
                                    .subscribeToTopic(
                                  'orders-${user.value?.id}',
                                );
                              }
                              showNotifications.value = true;
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                if (!isAuthenticated)
                  Padding(
                    padding: EdgeInsets.symmetric(vertical: 12.h),
                    child: Text(
                      'Sign in to access additional features like saving locations, tracking orders, and more.',
                      style: context.textTheme.bodyMedium?.copyWith(
                        color: Colors.grey[600],
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                if (isAuthenticated) ...[
                  SettingsTile(
                    title: 'Wallet',
                    onTap: () => context.push(const WalletRoute().location),
                  ),
                  SettingsTile(
                    title: 'Customer support',
                    onTap: () => context.push(const SupportRoute().location),
                  ),
                ],
                SettingsTile(
                  title: 'Wishlist',
                  onTap: () => context.push(const WishlistRoute().location),
                ),
                SettingsTile(
                  title: 'Settings',
                  onTap: () => context.push(const SettingsRoute().location),
                ),
              ].separatedBy(5.verticalSpace),
            ),
          ),
          SliverPadding(
            padding: kHorizontalPadding.copyWith(top: 12.h),
            sliver: const SliverToBoxAdapter(
              child: ProfileAuthActions(),
            ),
          ),
        ],
      ),
    );
  }
}

class _PersonalDetailsContent extends StatelessWidget {
  const _PersonalDetailsContent({
    required this.user,
  });

  final User user;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ProfileDetailInfo(
          name: 'Email',
          value: user.email,
        ),
        ProfileDetailInfo(
          name: 'Phone Number',
          value: user.phoneNumber,
        ),
        const ProfileDetailInfo(
          name: 'Date of birth',
          value: 'Not set',
        ),
        const ProfileDetailInfo(
          name: 'Gender',
          value: 'Not set',
        ),
        ProfileDetailInfo(
          name: 'Address',
          value: user.address ?? 'Not set',
        ),
      ],
    );
  }
}
