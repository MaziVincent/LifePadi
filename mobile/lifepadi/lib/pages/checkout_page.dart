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
