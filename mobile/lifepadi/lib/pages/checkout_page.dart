import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CheckoutPage extends StatelessWidget {
  const CheckoutPage({super.key, required this.type});

  final CheckoutType type;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Checkout'),
      body: switch (type) {
        // CheckoutType.logistics => const _LogisticsCheckout(),
        _ => const CartCheckout()
      },
    );
  }
}
