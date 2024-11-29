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
import 'package:lifepadi/widgets/widgets.dart';

class ProfilePage extends HookConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final showNotifications = useState(true);
    final user = ref.watch(authControllerProvider);

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
                SettingsPanel(
                  title: 'Personal Details',
                  child: switch (user) {
                    AsyncData(:final value) =>
                      _PersonalDetailsContent(user: value),
                    AsyncError(:final error) => Text(error.toString()),
                    _ => const GreenyLoadingWheel(),
                  },
                ),
                SettingsPanel(
                  title: 'Account management',
                  child: Column(
                    children: [
                      AccountManagementTile(
                        name: 'Locations',
                        onTap: () =>
                            context.push(const LocationsRoute().location),
                      ),
                      AccountManagementTile(
                        name: 'Notification',
                        child: SwitchInput(
                          value: showNotifications.value,
                          onChanged: (value) {
                            // TODO: Update notification settings

                            // For now, just update the UI
                            showNotifications.value = value;
                          },
                        ),
                      ),
                    ],
                  ),
                ),
                SettingsTile(
                  title: 'Wishlist',
                  onTap: () => context.push(const WishlistRoute().location),
                ),
                SettingsTile(
                  title: 'Wallet',
                  onTap: () => context.push(const WalletRoute().location),
                ),
                SettingsTile(
                  title: 'Customer support',
                  onTap: () => context.push(const SupportRoute().location),
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
              child: LogoutButton(),
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
