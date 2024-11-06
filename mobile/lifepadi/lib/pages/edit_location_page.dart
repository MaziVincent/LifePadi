import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:geocoding/geocoding.dart' as geocoding;
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
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class EditLocationPage extends HookConsumerWidget {
  const EditLocationPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final oldLocation = ref.watch(locationProvider(id: id));
    final selectedLocation = useState<LocationDetails?>(null);
    final isLoading = useState(false);
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
        final placemarks = await geocoding.placemarkFromCoordinates(
          position.latitude,
          position.longitude,
        );

        if (placemarks.isNotEmpty) {
          final placemark = placemarks.first;
          selectedLocation.value = LocationDetails(
            latitude: position.latitude,
            longitude: position.longitude,
            address: '${placemark.street}',
            city: '${placemark.locality}',
            state: '${placemark.administrativeArea}',
            country: '${placemark.country}',
            postalCode: '${placemark.postalCode}',
            sublocality: '${placemark.subLocality}',
            localGovernmentArea: '${placemark.subAdministrativeArea}',
          );
        }
      } finally {
        isLoading.value = false;
      }
    }

    return Scaffold(
      appBar: MyAppBar(
        title: 'Edit Location #$id',
        actions: [
          MyIconButton(
            onPressed: () async {},
            icon: IconsaxPlusLinear.trash,
            iconColor: Colors.red,
          ),
        ],
      ),
      body: Stack(
        children: [
          oldLocation.when(
            data: (location) {
              return GoogleMap(
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
              );
            },
            loading: () => const Center(child: GreenyLoadingWheel()),
            error: (error, _) => Center(
              child: Text(
                error.toString(),
                style: context.textTheme.bodyMedium?.copyWith(
                  color: kDarkPrimaryColor,
                  fontSize: 16.sp,
                ),
              ),
            ),
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
                height: 190.h,
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
                                SectionTitle(
                                  selectedLocation.value?.address ??
                                      'Choose Location',
                                  color: const Color(0xFF1C1C20),
                                  handleOverFlow: true,
                                ),
                            ],
                          ),
                        ),
                        IconButton(
                          onPressed: () async {
                            if (oldLocation
                                case AsyncData(value: final location)) {
                              if (mapController.value != null) {
                                await mapController.value!.animateCamera(
                                  CameraUpdate.newCameraPosition(
                                    CameraPosition(
                                      target: location.latLng,
                                      zoom: 15,
                                    ),
                                  ),
                                );
                                selectedLocation.value = location;
                              }
                            }
                          },
                          icon: Icon(
                            IconsaxPlusLinear.search_normal,
                            size: 20.sp,
                            color: kDarkPrimaryColor,
                          ),
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
                            'Drag map to set your delivery location or click the search icon to use your current location',
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
                      label: 'Update Address',
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
                                        '${value.shortAddress} is the updated location.',
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
