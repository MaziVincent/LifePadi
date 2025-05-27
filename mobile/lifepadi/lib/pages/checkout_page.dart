import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CheckoutPage extends StatelessWidget {
  const CheckoutPage({
    super.key,
    required this.type,
    this.existingOrder,
  });

  final CheckoutType type;

  /// This is useful for paying for a pending order from order details page without
  /// needing to re-fetch the order.
  ///
  /// If an existing order is provided, the checkout will be for that order.
  ///
  /// If null, a new order will be created.
  final Order? existingOrder;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Checkout'),
      body: switch (type) {
        CheckoutType.logistics =>
          LogisticsCheckout(existingOrder: existingOrder),
        _ => CartCheckout(existingOrder: existingOrder),
      },
    );
  }
}
