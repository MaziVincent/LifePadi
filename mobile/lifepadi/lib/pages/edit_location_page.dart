import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class EditLocationPage extends HookConsumerWidget with LocationUtils {
  const EditLocationPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final oldLocation = ref.watch(locationProvider(id: id));
    final selectedLocation = useState<LocationDetails?>(null);
    final isLoading = useState(false);
    final searchTextController = useTextEditingController();
    final mapController = useState<GoogleMapController?>(null);

    // Initialize selectedLocation when oldLocation data is available
    useEffect(
      () {
        if (oldLocation is AsyncData<LocationDetails>) {
          selectedLocation.value = oldLocation.value;
        }
        return null;
      },
      [oldLocation],
    );

    Future<void> getAddressFromCoordinates(LatLng position) async {
      isLoading.value = true;
      try {
        selectedLocation.value = await locationDetailsFromLatLng(position);
      } catch (e) {
        logger.e('Error fetching address', error: e);
        await handleError(e, context.mounted ? context : null);
      } finally {
        isLoading.value = false;
      }
    }

    Future<void> showSearchModal() async {
      await displayBottomPanel(
        context,
        child: PlaceSearchWidget(
          searchTextController: searchTextController,
          selectedLocation: selectedLocation,
          mapController: mapController,
        ),
      );
    }

    return Scaffold(
      appBar: MyAppBar(
        title: 'Edit Location #$id',
        actions: switch (oldLocation) {
          AsyncData(value: final location) => [
              MyIconButton(
                onPressed: () async {
                  await ref
                      .read(deleteLocationProvider(id: id).future)
                      .then((value) {
                    if (context.mounted) {
                      openSuccessDialog(
                        context: context,
                        title: 'Location deleted',
                        description:
                            'Location #$id has been removed from your locations.',
                        onOk: () => context.pop(),
                      );
                    }
                  }).onError((error, _) async {
                    await handleError(
                      error,
                      context.mounted ? context : null,
                    );
                  });
                },
                icon: IconsaxPlusLinear.trash,
                iconColor: Colors.red,
              ),
              if (!location.isDefault)
                MyIconButton(
                  icon: Remix.more_2_fill,
                  onPressed: () {
                    showMenu(
                      context: context,
                      position: RelativeRect.fromLTRB(100.w, 0, 0, 0),
                      color: Colors.white,
                      items: [
                        PopupMenuItem<dynamic>(
                          child: Text(
                            'Make Default',
                            style: context.textTheme.bodyMedium?.copyWith(
                              fontSize: 14.sp,
                              color: const Color(0xFF27272A),
                            ),
                          ),
                          onTap: () {
                            // TODO: Implement make default location
                          },
                        ),
                      ],
                    );
                  },
                ),
            ],
          _ => [],
        },
      ),
      body: Stack(
        children: [
          oldLocation.when(
            data: (location) {
              return Padding(
                padding: EdgeInsets.only(bottom: 172.h),
                child: GoogleMap(
                  initialCameraPosition: CameraPosition(
                    target: location.latLng,
                    zoom: 15,
                  ),
                  myLocationButtonEnabled: false,
                  onCameraMove: (position) {
                    // Update selected location when camera moves
                    getAddressFromCoordinates(position.target);
                  },
                  onMapCreated: (GoogleMapController controller) {
                    mapController.value = controller;
                    controller.animateCamera(
                      CameraUpdate.newCameraPosition(
                        CameraPosition(
                          target: location.latLng,
                          zoom: 15,
                        ),
                      ),
                    );
                  },
                ),
              );
            },
            loading: () => const Center(child: GreenyLoadingWheel()),
            error: (error, _) => MyErrorWidget(error: error),
          ),
          if (oldLocation is AsyncData<LocationDetails>)
            // Center marker
            Center(
              child: Padding(
                padding: EdgeInsets.only(bottom: 24.h),
                child: Icon(
                  Icons.location_pin,
                  color: kDarkPrimaryColor,
                  size: 40.sp,
                ),
              ),
            ),
          switch (oldLocation) {
            AsyncData() => BottomPanel(
                height: 195.h,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Row(
                            children: [
                              Icon(
                                Remix.map_pin_5_line,
                                size: 18.sp,
                                color: kDarkPrimaryColor,
                              ),
                              5.horizontalSpace,
                              if (isLoading.value)
                                const Text('Loading address...')
                              else
                                Expanded(
                                  child: Text(
                                    selectedLocation.value?.address ??
                                        'Choose Location',
                                    style: Theme.of(context)
                                        .textTheme
                                        .titleMedium
                                        ?.copyWith(
                                          fontSize: 16.sp,
                                          fontWeight: FontWeight.w600,
                                          color: const Color(0xFF1C1C20),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                  ),
                                ),
                            ],
                          ),
                        ),
                        Row(
                          children: [
                            IconButton(
                              onPressed: () async {
                                final currentLocation = await ref.read(
                                  currentLocationProvider.future,
                                );
                                if (mapController.value != null) {
                                  await mapController.value!.animateCamera(
                                    CameraUpdate.newCameraPosition(
                                      CameraPosition(
                                        target: currentLocation.latLng,
                                        zoom: 15,
                                      ),
                                    ),
                                  );
                                  selectedLocation.value = currentLocation;
                                }
                              },
                              icon: Icon(
                                IconsaxPlusLinear.gps,
                                size: 20.sp,
                                color: kDarkPrimaryColor,
                              ),
                            ),
                            IconButton(
                              onPressed: showSearchModal,
                              icon: Icon(
                                IconsaxPlusLinear.search_normal,
                                size: 20.sp,
                                color: kDarkPrimaryColor,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                    10.verticalSpace,
                    Row(
                      children: [
                        Assets.icons.info.svg(
                          width: 16.sp,
                          height: 16.sp,
                        ),
                        5.horizontalSpace,
                        Expanded(
                          child: Text(
                            'Drag map to set your delivery location or click the gps icon to use your current location',
                            style: context.textTheme.bodyMedium?.copyWith(
                              color: const Color(0xFF5F5F5F),
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w400,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                    12.22.verticalSpace,
                    PrimaryActionButton(
                      text: 'Update Address',
                      onPressed: selectedLocation.value == null
                          ? () => showToast('Please drag to choose a location')
                          : () async {
                              selectedLocation.value = selectedLocation.value!
                                  .copyWith(id: oldLocation.value.id);
                              await ref
                                  .read(
                                updateLocationProvider(
                                  location: selectedLocation.value!,
                                ).future,
                              )
                                  .then((value) {
                                if (context.mounted) {
                                  openSuccessDialog(
                                    context: context,
                                    title: 'Location #${value.id} updated',
                                    description:
                                        '${value.address} is the updated location.',
                                    onOk: () => context.pop(),
                                  );
                                }
                              }).onError((error, _) async {
                                await handleError(
                                  error,
                                  context.mounted ? context : null,
                                );
                              });
                            },
                    ),
                  ],
                ),
              ),
            _ => const SizedBox.shrink(),
          },
        ],
      ),
    );
  }
}
