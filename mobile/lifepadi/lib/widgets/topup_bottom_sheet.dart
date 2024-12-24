import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class TopupBottomSheet extends HookWidget {
  const TopupBottomSheet({
    super.key,
    required this.currentBalance,
    required this.onTopup,
  });

  final double currentBalance;
  final Future<void> Function(double amount) onTopup;

  @override
  Widget build(BuildContext context) {
    final controller = useTextEditingController();

    return SingleChildScrollView(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Top up wallet',
            style: context.textTheme.titleLarge?.copyWith(
              color: const Color(0xFF1C1C20),
              fontSize: 20.sp,
              fontWeight: FontWeight.w700,
            ),
          ),
          16.verticalSpace,
          InputField(
            controller: controller,
            hintText: 'Enter amount',
            labelText: 'Amount',
            keyboardType: TextInputType.number,
            hasValue: controller.text.isNotEmpty,
            prefixIcon: Text(
              '₦',
              style: context.textTheme.bodyLarge?.copyWith(
                color: const Color(0xFF1C1C20),
                fontSize: 16.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          16.verticalSpace,
          PrimaryActionButton(
            text: 'Top up',
            onPressed: () async {
              final amount = double.tryParse(controller.text);
              if (amount == null || amount <= 0) {
                return;
              }

              await onTopup(amount);
              if (context.mounted) {
                context.pop();
              }
            },
          ),
        ],
      ),
    );
  }
}
