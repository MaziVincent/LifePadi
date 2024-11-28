import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/layouts/my_paged_list_view.dart';
import 'package:skeletonizer/skeletonizer.dart';

import 'widgets.dart';

/// Displays a list of orders based on the status provided.
class MyOrderList extends HookConsumerWidget {
  const MyOrderList({
    super.key,
    required this.status,
    this.pageSize = 5,
  });

  final OrderStatus status;
  final int pageSize;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useMemoized(
      () => PagingController<int, Order>(firstPageKey: 1),
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
            final orderStatus = status.toValue().toString();
            final result = await ref.read(
              ordersProvider(pageNumber: pageKey, status: orderStatus).future,
            );

            if (!mounted.value) return;

            final isLastPage = result.length < pageSize;
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

        // Refresh when status changes
        // ignore: cascade_invocations
        controller.refresh();

        return controller.dispose;
      },
      [status], // Only recreate listener when status changes
    );

    return RefreshIndicator(
      onRefresh: () => Future.sync(controller.refresh),
      child: MyPagedListView<int, Order>.separated(
        pagingController: controller,
        padding: kHorizontalPadding,
        builderDelegate: PagedChildBuilderDelegate<Order>(
          itemBuilder: (context, order, index) {
            return OrderTile(order: order);
          },
          firstPageProgressIndicatorBuilder: (_) {
            return Column(
              children: [
                for (var i = 0; i < pageSize; i++)
                  Skeletonizer(
                    child: OrderTile(
                      order: Order(
                        id: 233,
                        status: OrderStatus.pending,
                        orderId: BoneMock.subtitle,
                        isDelivered: false,
                        type: CheckoutType.cart,
                        items: [],
                        createdAt: DateTime.now(),
                        totalAmount: 10000,
                        deliveryFee: 1000,
                      ),
                      isMock: true,
                    ),
                  ),
              ].separatedBy(18.verticalSpace),
            );
          },
          newPageProgressIndicatorBuilder: (_) => Center(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 11.h),
              child: const OrangeyLoadingWheel(),
            ),
          ),
          noItemsFoundIndicatorBuilder: (context) =>
              const Center(child: Text('No orders found')),
        ),
        separatorBuilder: (context, index) => 18.verticalSpace,
      ),
    );
  }
}
