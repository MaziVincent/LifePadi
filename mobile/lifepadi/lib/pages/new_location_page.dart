import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:geocoding/geocoding.dart' as geocoding;
import 'package:go_router/go_router.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:google_places_flutter/google_places_flutter.dart';
import 'package:google_places_flutter/model/prediction.dart';
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

class NewLocationPage extends HookConsumerWidget {
  const NewLocationPage({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentLocation = ref.watch(currentLocationProvider);
    final selectedLocation = useState<LocationDetails?>(null);
    final isLoading = useState(false);
    final mapController = useState<GoogleMapController?>(null);
    final searchTextController = useTextEditingController();

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
      appBar: const MyAppBar(title: 'Add New Location'),
      body: Stack(
        children: [
          currentLocation.when(
            data: (location) {
              return Padding(
                padding: EdgeInsets.only(bottom: 172.h),
                child: GoogleMap(
                  initialCameraPosition: CameraPosition(
                    target: location.latLng,
                    zoom: 15,
                  ),
                  myLocationEnabled: true,
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
          if (currentLocation is AsyncData<LocationDetails>)
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
          switch (currentLocation) {
            AsyncLoading() => const SizedBox.shrink(),
            _ => BottomPanel(
                height: 192.h,
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
                                    selectedLocation.value?.shortAddress ??
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
                                if (currentLocation.hasValue &&
                                    mapController.value != null) {
                                  final location = currentLocation.value!;
                                  // Animate camera to current location
                                  await mapController.value!.animateCamera(
                                    CameraUpdate.newCameraPosition(
                                      CameraPosition(
                                        target: location.latLng,
                                        zoom: 15,
                                      ),
                                    ),
                                  );
                                  // Update selected location
                                  await getAddressFromCoordinates(
                                    location.latLng,
                                  );
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
                      text: 'Confirm Address',
                      onPressed: selectedLocation.value == null
                          ? () => showToast('Please drag to choose a location')
                          : () async {
                              await ref
                                  .read(
                                storeLocationProvider(
                                  location: selectedLocation.value!,
                                ).future,
                              )
                                  .then((value) {
                                if (context.mounted) {
                                  openSuccessDialog(
                                    context: context,
                                    title: 'Location saved',
                                    description:
                                        '${value.shortAddress} have been saved to your locations.',
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
          },
        ],
      ),
    );
  }
}

class PlaceSearchWidget extends StatelessWidget {
  const PlaceSearchWidget({
    super.key,
    required this.searchTextController,
    required this.selectedLocation,
    required this.mapController,
  });

  final TextEditingController searchTextController;
  final ValueNotifier<LocationDetails?> selectedLocation;
  final ValueNotifier<GoogleMapController?> mapController;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 300.h,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Text(
                'Search Location',
                style: context.textTheme.titleMedium?.copyWith(
                  fontSize: 18.sp,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const Spacer(),
              IconButton(
                onPressed: () => context.pop(),
                icon: const Icon(Icons.close),
              ),
            ],
          ),
          16.verticalSpace,
          GooglePlaceAutoCompleteTextField(
            textEditingController: searchTextController,
            googleAPIKey: kGoogleMapsApiKey,
            inputDecoration: InputDecoration(
              hintText: 'Search for a location',
              prefixIcon: Icon(
                IconsaxPlusLinear.search_normal,
                size: 20.sp,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.r),
              ),
            ),
            debounceTime: 800,
            countries: const ['NG'],
            getPlaceDetailWithLatLng: (Prediction prediction) {
              final lat = double.parse(prediction.lat!);
              final lng = double.parse(prediction.lng!);

              final location = LocationDetails(
                latitude: lat,
                longitude: lng,
                address: prediction.description!,
                city: prediction.structuredFormatting?.mainText ?? '',
                state: prediction.structuredFormatting?.secondaryText ?? '',
                localGovernmentArea: '',
              );

              selectedLocation.value = location;
              mapController.value?.animateCamera(
                CameraUpdate.newCameraPosition(
                  CameraPosition(
                    target: LatLng(lat, lng),
                    zoom: 15,
                  ),
                ),
              );
              context.pop();
            },
            itemClick: (Prediction prediction) {
              // Handle place selection without lat/lng if needed
              searchTextController
                ..text = prediction.description!
                ..selection = TextSelection.fromPosition(
                  TextPosition(offset: prediction.description!.length),
                );
            },
          ),
        ],
      ),
    );
  }
}
