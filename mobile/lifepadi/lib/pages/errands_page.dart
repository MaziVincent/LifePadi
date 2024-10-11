import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/errands.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

class ErrandsPage extends ConsumerWidget {
  const ErrandsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final errandsState = ref.watch(errandsProvider());

    return Scaffold(
      appBar: const MyAppBar(title: 'Service Errands'),
      body: RefreshIndicator.adaptive(
        onRefresh: () => ref.refresh(errandsProvider().future),
        child: Padding(
          padding: kHorizontalPadding.copyWith(top: 8.h),
          child: errandsState.when(
            data: (errands) {
              return GridView.builder(
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                  crossAxisSpacing: 10.r,
                  mainAxisSpacing: 10.r,
                  childAspectRatio: 0.7.r,
                ),
                itemCount: errands.length,
                itemBuilder: (context, index) {
                  final errand = errands[index];
                  return ErrandCard(
                    name: errand.name,
                    imageUrl: errand.iconUrl,
                    onTap: () =>
                        context.go(SingleErrandRoute(id: errand.id).location),
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
                itemCount: mockErrands.length,
                itemBuilder: (context, index) {
                  return ErrandCard(
                    name: mockErrands[index].name,
                    imageUrl: mockErrands[index].image,
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
                      onPressed: () => ref.refresh(errandsProvider().future),
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
