import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
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

  /// Hosts allowed to host the payment confirmation redirect. Anything else
  /// signalling a `/payment/confirm` URL is treated as suspicious and ignored.
  static const _confirmRedirectHosts = {
    'app.lifepadi.com',
    'lifepadi.com',
  };

  /// Reference tokens are short alphanumeric strings issued by the gateway;
  /// reject anything else to avoid passing crafted values into navigation.
  static final _referencePattern = RegExp(r'^[A-Za-z0-9_\-]{6,64}$');

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
            final uri = Uri.tryParse(request.url);
            if (uri == null) {
              return NavigationDecision.prevent;
            }

            // Block plain-HTTP navigation for any non-localhost target so
            // tokens cannot be sniffed off the wire.
            if (uri.scheme != 'https' && uri.host != 'localhost') {
              logger.w('Blocking non-HTTPS payment navigation: ${uri.host}');
              return NavigationDecision.prevent;
            }

            if (uri.path.contains('/payment/confirm')) {
              if (!_confirmRedirectHosts.contains(uri.host)) {
                logger.w(
                  'Rejecting payment confirm redirect from untrusted host: '
                  '${uri.host}',
                );
                await showToast(
                  'Untrusted payment redirect blocked',
                  backgroundColor: kDangerColor,
                );
                return NavigationDecision.prevent;
              }

              final reference = uri.queryParameters['reference'];
              if (reference == null || !_referencePattern.hasMatch(reference)) {
                await showToast(
                  'Invalid payment reference',
                  backgroundColor: kDangerColor,
                );
                return NavigationDecision.prevent;
              }
              if (!mounted) return NavigationDecision.prevent;
              context.go(PaymentConfirmRoute(reference: reference).location);
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
