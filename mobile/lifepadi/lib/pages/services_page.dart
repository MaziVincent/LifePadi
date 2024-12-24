import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/services.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

class ServicesPage extends ConsumerWidget {
  const ServicesPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final servicesAsync = ref.watch(servicesProvider());

    return Scaffold(
      appBar: const MyAppBar(title: 'Services/Errands'),
      body: RefreshIndicator.adaptive(
        onRefresh: () async => ref.refresh(servicesProvider().future),
        child: Padding(
          padding: kHorizontalPadding.copyWith(top: 8.h),
          child: servicesAsync.when(
            data: (services) {
              return GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                  crossAxisSpacing: 12.r,
                  mainAxisSpacing: 10.r,
                  childAspectRatio: 0.6.r,
                ),
                itemCount: services.length,
                itemBuilder: (context, index) {
                  final service = services[index];
                  return ServiceCard(
                    name: service.name,
                    imageUrl: service.iconUrl,
                    onTap: () => context.go(
                      SingleServiceRoute(
                        id: service.id,
                        name: service.name,
                      ).location,
                    ),
                  );
                },
              );
            },
            loading: () => Skeletonizer(
              child: GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                  crossAxisSpacing: 10.r,
                  mainAxisSpacing: 10.r,
                  childAspectRatio: 0.7.r,
                ),
                itemCount: 6,
                itemBuilder: (context, index) {
                  return ServiceCard(
                    name: BoneMock.name,
                    imageUrl: Assets.icons.cookingGas.path,
                    onTap: () {},
                  );
                },
              ),
            ),
            error: (error, _) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text('Error: $error'),
                    ElevatedButton(
                      onPressed: () async =>
                          ref.refresh(servicesProvider().future),
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}
