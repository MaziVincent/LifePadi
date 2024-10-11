import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
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
                        onTap: () =>
                            context.push(const LocationsRoute().location),
                      ),
                      AccountManagementTile(
                        name: 'Payment Information',
                        onTap: () {
                          // TODO: Go to tentative page
                        },
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
                  title: 'Chats',
                  onTap: () => context.push(const ChatsRoute().location),
                ),
                SettingsTile(
                  title: 'Wallet',
                  onTap: () => context.push(const WalletRoute().location),
                ),
                SettingsTile(
                  title: 'Settings',
                  onTap: () => context.push(const SettingsRoute().location),
                ),
                SettingsTile(
                  title: 'Customer support',
                  onTap: () => context.push(const SupportRoute().location),
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
