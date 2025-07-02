import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class OrderDetailsPage extends ConsumerWidget {
  const OrderDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final orderAsync = ref.watch(orderProvider(id));
    final userAsync = ref.watch(authControllerProvider);

    return Scaffold(
      appBar: MyAppBar(
        title: 'Order Details',
        actions: [
          switch (userAsync) {
            AsyncData(:final value) => value is Customer
                ? orderAsync.maybeWhen(
                    data: (order) => MyIconButton(
                      icon: Remix.more_2_fill,
                      onPressed: () {
                        showMenu(
                          context: context,
                          position: RelativeRect.fromLTRB(100.w, 0, 0, 0),
                          color: Colors.white,
                          items: [
                            PopupMenuItem<dynamic>(
                              child: Text(
                                'View Receipt',
                                style: context.textTheme.bodyMedium?.copyWith(
                                  fontSize: 14.sp,
                                  color: const Color(0xFF27272A),
                                ),
                              ),
                              onTap: () => context.push(
                                ReceiptRoute(orderId: id, goBack: true)
                                    .location,
                              ),
                            ),
                          ],
                        );
                      },
                    ),
                    orElse: () => const SizedBox.shrink(),
                  )
                : const SizedBox.shrink(),
            _ => const SizedBox.shrink(),
          },
        ],
      ),
      body: Stack(
        children: [
          switch (orderAsync) {
            AsyncError(:final error) => MyErrorWidget(error: error),
            AsyncData(value: final order) => switch (userAsync) {
                AsyncData(value: final user) => OrderDetailsContent(
                    order: order,
                    user: user,
                  ),
                _ => const Center(child: GreenyLoadingWheel()),
              },
            _ => const Center(child: GreenyLoadingWheel()),
          },
          switch (orderAsync) {
            AsyncData(value: final order) =>
              order.status == OrderStatus.cancelled
                  ? const SizedBox.shrink()
                  : BottomPanel(
                      height: 182.h,
                      child: switch (userAsync) {
                        AsyncData(value: final user) => _BottomPanelContent(
                            order: order,
                            user: user,
                            ref: ref,
                          ),
                        _ => const SizedBox.shrink(),
                      },
                    ),
            _ => const SizedBox.shrink(),
          },
        ],
      ),
    );
  }
}

class _BottomPanelContent extends StatelessWidget {
  const _BottomPanelContent({
    required this.order,
    required this.user,
    required this.ref,
  });

  final Order order;
  final User user;
  final WidgetRef ref;

  @override
  Widget build(BuildContext context) {
    final orderIsTrackable = order.status == OrderStatus.ongoing ||
        order.status == OrderStatus.completed;
    final canBuyAgain = user is Customer &&
        order.type == CheckoutType.cart &&
        order.status == OrderStatus.ongoing &&
        order.status == OrderStatus.completed;

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        // Pending order
        if (order.status == OrderStatus.pending) ...[
          PrimaryButton(
            onPressed: () async => context.push(
              CheckoutRoute(
                type: order.type,
              ).location,
              extra: order,
            ),
            text: 'Make Payment',
          ),
          PrimaryOutlineActionButton(
            onPressed: () async {
              try {
                await ref
                    .read(
                  updateOrderStatusProvider(
                    order.id,
                    status: OrderStatus.cancelled,
                  ).future,
                )
                    .then((_) async {
                  // show success message
                  if (context.mounted) {
                    await openSuccessDialog(
                      context: context,
                      title: 'Order Cancelled',
                      description: 'Your order has been cancelled',
                      onOk: () {
                        context
                          ..pop()
                          ..pop();
                      },
                    );
                  }
                });
              } catch (error, stackTrace) {
                logger.e(
                  "Couldn't cancel order",
                  error: error,
                  stackTrace: stackTrace,
                );
                await handleError(error, context.mounted ? context : null);
              }
            },
            text: 'Cancel Order',
          ),
        ],
        if (user is Customer && orderIsTrackable)
          PrimaryOutlineButton(
            onPressed: () => context.push(
              TrackOrderRoute(orderId: order.id).location,
              extra: order,
            ),
            text: 'Track Order',
          ),
        if (canBuyAgain)
          PrimaryButton(
            onPressed: () {
              // Implement Buy Again
            },
            text: 'Buy Again',
          ),
        if (user is Rider && order.status == OrderStatus.ongoing)
          PrimaryActionButton(
            onPressed: () async {
              try {
                await ref
                    .read(
                  updateOrderStatusProvider(
                    order.id,
                    status: OrderStatus.completed,
                  ).future,
                )
                    .then((_) async {
                  // show success message
                  if (context.mounted) {
                    await openSuccessDialog(
                      context: context,
                      title: 'Order Delivered',
                      description: 'Order has been marked as delivered',
                      onOk: () => context.pop(),
                    );
                  }
                });
              } catch (error, stackTrace) {
                logger.e(
                  "Couldn't mark order as delivered",
                  error: error,
                  stackTrace: stackTrace,
                );
                await handleError(error, context.mounted ? context : null);
              }
            },
            text: 'Mark as Delivered',
          ),
      ].separatedBy(17.verticalSpace),
    );
  }
}
