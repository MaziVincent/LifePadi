import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_tawkto/flutter_tawk.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LiveChatPage extends HookConsumerWidget {
  const LiveChatPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authControllerProvider);

    const directChatLink =
        'https://tawk.to/chat/68694a3befc4951919abcae7/1ivdkju9i';

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Live Chat',
          style: context.textTheme.titleLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 20.sp,
          ),
        ),
        backgroundColor: kDarkPrimaryColor,
        surfaceTintColor: kDarkPrimaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: user.when(
        data: (userData) {
          // Create visitor object with user data if authenticated
          final visitor = userData.isAuth == true
              ? TawkVisitor(
                  name: '${userData.firstName} ${userData.lastName}',
                  email: userData.email,
                )
              : null;

          return Tawk(
            directChatLink: directChatLink,
            visitor: visitor,
            onLoad: () {
              // Chat loaded successfully
            },
            onLinkTap: (String url) {
              // Handle link taps if needed
            },
            placeholder: const ColoredBox(
              color: Colors.white,
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    GreenyLoadingWheel(),
                    SizedBox(height: 16),
                    Text(
                      'Loading chat...',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
        loading: () => const ColoredBox(
          color: Colors.white,
          child: Center(
            child: GreenyLoadingWheel(),
          ),
        ),
        error: (error, stack) => ColoredBox(
          color: Colors.white,
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.error_outline,
                  size: 64,
                  color: Colors.grey,
                ),
                const SizedBox(height: 16),
                Text(
                  'Unable to load chat',
                  style: context.textTheme.titleMedium?.copyWith(
                    color: Colors.grey[700],
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Please try again later',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
