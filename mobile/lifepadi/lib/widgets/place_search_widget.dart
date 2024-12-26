import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:google_places_flutter/google_places_flutter.dart';
import 'package:google_places_flutter/model/prediction.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

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
