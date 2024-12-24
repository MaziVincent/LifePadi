import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/layouts/my_paged_list_view.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';
import 'package:skeletonizer/skeletonizer.dart';

class TransactionHistoryPage extends HookConsumerWidget {
  const TransactionHistoryPage({super.key});

  static const int _pageSize = 10;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useMemoized(
      () => PagingController<int, Receipt>(firstPageKey: 1),
      [], // Empty dependency array - controller persists for widget lifetime
    );

    final mounted = useRef(true);
    useEffect(
      () {
        mounted.value = true;
        return () {
          mounted.value = false;
        };
      },
      [],
    );

    useEffect(
      () {
        controller.addPageRequestListener((pageKey) async {
          try {
            final result = await ref.read(
              transactionHistoryProvider(
                pageNumber: pageKey,
                pageSize: _pageSize,
              ).future,
            );

            if (!mounted.value) return;

            final isLastPage = result.length < _pageSize;
            if (isLastPage) {
              controller.appendLastPage(result);
            } else {
              controller.appendPage(result, pageKey + 1);
            }
          } catch (e) {
            if (!mounted.value) return;
            controller.error = e;
            logger.e(e, error: e);
          }
        });

        return controller.dispose;
      },
      [], // Empty dependency array - only create listener once
    );

    return Scaffold(
      backgroundColor: kDarkPrimaryColor,
      appBar: AppBar(
        title: Text(
          'Transaction History',
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
        ),
        leading: Padding(
          padding: EdgeInsets.only(left: 16.w),
          child: const Align(
            child: GlassmorphicBackButton(),
          ),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () => Future.sync(controller.refresh),
        child: Container(
          width: double.infinity,
          decoration: ShapeDecoration(
            color: const Color(0xFFFBFBFB),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(30.r),
                topRight: Radius.circular(30.r),
              ),
            ),
          ),
          padding: kHorizontalPadding.copyWith(top: 24.h),
          child: MyPagedListView<int, Receipt>.separated(
            pagingController: controller,
            builderDelegate: PagedChildBuilderDelegate<Receipt>(
              itemBuilder: (context, transaction, index) {
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
                    color: transaction.type == CheckoutType.topUp
                        ? const Color(0xFF21D1A5)
                        : const Color(0xFFE02020),
                  ),
                  title: Text(
                    transaction.type == CheckoutType.topUp ? 'Top Up' : 'Debit',
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: kDarkTextColor,
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  subtitle: Text(
                    transaction.paidAt.readable,
                    style: context.textTheme.bodySmall?.copyWith(
                      color: const Color(0xFFC2C8D0),
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  trailing: Text(
                    transaction.totalAmount.currency,
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: transaction.type == CheckoutType.topUp
                          ? const Color(0xFF21D1A5)
                          : const Color(0xFFE02020),
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                );
              },
              firstPageProgressIndicatorBuilder: (_) => Column(
                children: [
                  for (var i = 0; i < _pageSize; i++)
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
              newPageProgressIndicatorBuilder: (_) => Center(
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 11.h),
                  child: const OrangeyLoadingWheel(),
                ),
              ),
              noItemsFoundIndicatorBuilder: (_) =>
                  const Center(child: Text('No transactions found')),
            ),
            separatorBuilder: (context, index) => 16.verticalSpace,
          ),
        ),
      ),
    );
  }
}
