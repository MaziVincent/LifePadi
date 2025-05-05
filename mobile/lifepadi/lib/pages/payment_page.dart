import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

class PaymentPage extends ConsumerStatefulWidget {
  const PaymentPage({
    super.key,
    required this.transactionLink,
    required this.type,
    required this.isExistingOrder,
  });

  final String transactionLink;
  final CheckoutType type;
  final bool isExistingOrder;

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
            if (request.url.contains('/payment/confirm')) {
              await launchUrl(
                Uri.parse(request.url),
                mode: LaunchMode.externalApplication,
              );
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse(widget.transactionLink));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: switch (widget.type) {
          CheckoutType.cart => 'Cart Payment',
          CheckoutType.logistics => 'Logistics Payment',
          CheckoutType.topUp => 'Top Up',
        },
        actions: [
          IconButton(
            icon: const Icon(IconsaxPlusLinear.refresh_2),
            onPressed: () async => controller.reload(),
          ),
        ],
      ),
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
