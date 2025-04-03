import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../utils/constants.dart';

class WalletPage extends HookWidget {
  const WalletPage({super.key});

  @override
  Widget build(BuildContext context) {
    final montserratStyle = GoogleFonts.montserrat(
      color: kDarkTextColor,
      fontSize: 16.sp,
      fontWeight: FontWeight.w600,
    );
    final balance = useState<double>(0);
    final isLoading = useState(false);
    final animationController = useAnimationController(
      duration: const Duration(seconds: 1),
    );

    Future<void> refreshBalance(WidgetRef ref) async {
      if (isLoading.value) return;
      try {
        isLoading.value = true;

        final walletBalance = await ref.watch(balanceProvider.future);
        balance.value = walletBalance;

        isLoading.value = false;
      } catch (e) {
        await handleError(
          e,
          context.mounted ? context : null,
        );
      }
    }

    useEffect(
      () {
        if (isLoading.value) {
          animationController.repeat();
        } else {
          animationController
            ..stop()
            ..reset();
        }
        return null;
      },
      [isLoading.value],
    );

    return Scaffold(
      backgroundColor: kDarkPrimaryColor,
      appBar: AppBar(
        title: Text(
          'Wallet',
          style: context.textTheme.titleLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 20.sp,
          ),
        ),
        titleSpacing: 14.w,
        backgroundColor: kDarkPrimaryColor,
        surfaceTintColor: kDarkPrimaryColor,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: kRadialGradient,
          ),
          padding: EdgeInsets.only(top: 75.h),
        ),
        // toolbarHeight: 0.16.sh,
      ),
      body: Stack(
        children: [
          /// Balance
          Align(
            alignment: Alignment.topCenter,
            child: SizedBox(
              height: 0.3.sh,
              child: Column(
                children: [
                  24.verticalSpace,
                  Text(
                    'Available Balance',
                    style: context.textTheme.titleSmall?.copyWith(
                      color: const Color(0xFFF0F0F0),
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  4.verticalSpace,
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Consumer(
                        builder: (context, ref, child) {
                          Future<void> getBalance() async {
                            final user =
                                await ref.read(authControllerProvider.future);
                            if (user is Customer) {
                              balance.value = user.wallet.balance;
                            }
                          }

                          getBalance().ignore();

                          return Skeletonizer(
                            enabled: isLoading.value,
                            child: Text(
                              balance.value.currency,
                              style: context.textTheme.displaySmall?.copyWith(
                                color: Colors.white,
                                fontSize: 40.sp,
                                fontWeight: FontWeight.w400,
                              ),
                            ),
                          );
                        },
                      ),
                      6.horizontalSpace,
                      Consumer(
                        builder: (context, ref, child) {
                          return GestureDetector(
                            onTap: () async => refreshBalance(ref),
                            child: RotationTransition(
                              turns: animationController,
                              child: Icon(
                                Remix.refresh_line,
                                color: Colors.white,
                                size: 20.sp,
                              ),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                  // 40.verticalSpace,
                ],
              ),
            ),
          ),

          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              width: double.infinity,
              height: 0.7.sh,
              decoration: ShapeDecoration(
                color: const Color(0xFFFBFBFB),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30.r),
                    topRight: Radius.circular(30.r),
                  ),
                ),
              ),
              padding: kHorizontalPadding.copyWith(top: 79.h),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  /// Recent Transaction History
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Transaction History',
                        style: montserratStyle,
                      ),
                      GestureDetector(
                        onTap: () => context
                            .push(const TransactionHistoryRoute().location),
                        child: Text(
                          'See all',
                          style:
                              Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    color: kDarkPrimaryColor,
                                    fontSize: 14.sp,
                                    fontWeight: FontWeight.w500,
                                  ),
                        ),
                      ),
                    ],
                  ),
                  16.verticalSpace,

                  /// Transaction history list
                  Expanded(
                    child: Consumer(
                      builder: (context, ref, child) {
                        final transactionsAsync =
                            ref.watch(transactionHistoryProvider());

                        return transactionsAsync.when(
                          data: (transactions) {
                            return transactions.isEmpty
                                ? const Center(
                                    child: Text('No transactions found'),
                                  )
                                : SuperListView.separated(
                                    itemCount: transactions.length,
                                    separatorBuilder: (context, index) =>
                                        16.verticalSpace,
                                    itemBuilder: (context, index) {
                                      final transaction = transactions[index];
                                      return ListTile(
                                        onTap: () => context.push(
                                          ReceiptRoute(
                                            orderId: transaction.orderId,
                                            goBack: true,
                                          ).location,
                                          extra: transaction,
                                        ),
                                        leading: Icon(
                                          transaction.type == CheckoutType.topUp
                                              ? Remix.arrow_up_s_line
                                              : Remix.arrow_down_s_line,
                                          color: transaction.type ==
                                                  CheckoutType.topUp
                                              ? const Color(0xFF21D1A5)
                                              : const Color(0xFFE02020),
                                        ),
                                        title: Text(
                                          transaction.type == CheckoutType.topUp
                                              ? 'Top Up'
                                              : 'Debit',
                                          style: context.textTheme.bodyMedium
                                              ?.copyWith(
                                            color: kDarkTextColor,
                                            fontSize: 14.sp,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                        subtitle: Text(
                                          transaction.paidAt.readable,
                                          style: context.textTheme.bodySmall
                                              ?.copyWith(
                                            color: const Color(0xFFC2C8D0),
                                            fontSize: 12.sp,
                                            fontWeight: FontWeight.w400,
                                          ),
                                        ),
                                        trailing: Text(
                                          transaction.totalAmount.currency,
                                          style: context.textTheme.bodyMedium
                                              ?.copyWith(
                                            color: transaction.type ==
                                                    CheckoutType.topUp
                                                ? const Color(0xFF21D1A5)
                                                : const Color(0xFFE02020),
                                            fontSize: 14.sp,
                                            fontWeight: FontWeight.w500,
                                          ),
                                        ),
                                      );
                                    },
                                  );
                          },
                          loading: () => Column(
                            children: [
                              for (var i = 0; i < 5; i++)
                                const Skeletonizer(
                                  child: ListTile(
                                    leading: Icon(
                                      Remix.arrow_up_s_line,
                                      color: Color(0xFF21D1A5),
                                    ),
                                    title: Text('Top Up'),
                                    subtitle: Text('2021-09-12 12:00:00'),
                                    trailing: Text('₦10,000.00'),
                                  ),
                                ),
                            ].separatedBy(16.verticalSpace),
                          ),
                          error: (error, _) => MyErrorWidget(error: error),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),

          /// Wallet actions tile
          Positioned(
            top: 0.15.sh, // Half the height of the balance widget
            left: 24.w,
            right: 24.w,
            child: Container(
              width: double.infinity,
              padding: EdgeInsets.symmetric(horizontal: 32.w, vertical: 24.h),
              decoration: ShapeDecoration(
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16.r),
                ),
                shadows: const [
                  BoxShadow(
                    color: Color(0x14000000),
                    blurRadius: 12,
                    offset: Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  /// Wallet actions
                  WalletAction(
                    onTap: () async {
                      await displayBottomPanel(
                        context,
                        bottomPadding: 10,
                        child: Consumer(
                          builder: (context, ref, child) {
                            return TopupBottomSheet(
                              currentBalance: balance.value,
                              onTopup: (amount) async {
                                final paymentLink = await ref.watch(
                                  walletDepositProvider(amount: amount).future,
                                );
                                if (context.mounted) {
                                  final result = await context.push<bool>(
                                    PaymentRoute(
                                      link: paymentLink,
                                      type: CheckoutType.topUp,
                                    ).location,
                                  );
                                  if (result == true) {
                                    await refreshBalance(ref);
                                    ref.invalidate(
                                      transactionHistoryProvider(),
                                    );
                                  }
                                }
                              },
                            );
                          },
                        ),
                      );
                    },
                    label: 'Top Up',
                    icon: Remix.upload_line,
                  ),
                  WalletAction(
                    onTap: () =>
                        context.push(const TransactionHistoryRoute().location),
                    label: 'History',
                    icon: Remix.exchange_funds_line,
                  ),
                ].separatedBy(
                  SizedBox(height: 24.h, child: const VerticalDivider()),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
