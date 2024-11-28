import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:webview_flutter/webview_flutter.dart';

class PaymentPage extends ConsumerStatefulWidget {
  const PaymentPage({
    super.key,
    required this.transactionLink,
    required this.type,
  });

  final String transactionLink;
  final CheckoutType type;

  @override
  ConsumerState<PaymentPage> createState() => _PaymentPageState();
}

class _PaymentPageState extends ConsumerState<PaymentPage> {
  late final WebViewController controller;
  int loadingPercentage = 0;

  @override
  void initState() {
    super.initState();

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() => loadingPercentage = 0);
          },
          onProgress: (int progress) {
            // Update loading bar
            setState(() => loadingPercentage = progress);
          },
          onPageFinished: (String url) {
            setState(() => loadingPercentage = 100);
          },
          onNavigationRequest: (NavigationRequest request) async {
            if (request.url.contains('/transaction/paystack-confirmPayment')) {
              await showToast('Confirming payment...');
              await confirmPayment(redirectUrl: request.url);
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.transactionLink));
  }

  Future<void> confirmPayment({required String redirectUrl}) async {
    final queryParameters = Uri.parse(redirectUrl).queryParameters;

    final receipt = await ref.read(
      confirmPaymentProvider(
        queryParameters: queryParameters,
        type: widget.type,
      ).future,
    );

    if (context.mounted) {
      // ignore: use_build_context_synchronously
      context.pop(receipt);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(title: 'Lifepadi Payment'),
      body: Stack(
        children: [
          WebViewWidget(controller: controller),
          if (loadingPercentage < 100)
            LinearProgressIndicator(
              value: loadingPercentage / 100,
            ),
        ],
      ),
    );
  }
}
