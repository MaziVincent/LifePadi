import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:form_validator/form_validator.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/state/logistics.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LogisticsPage extends HookConsumerWidget {
  const LogisticsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final item = useState<String>('');
    final descriptionController = useTextEditingController();
    final receiverNameController = useTextEditingController();
    final receiverPhone = useState('');
    final useCurrentDetails = useState(false);
    final weightController = useTextEditingController();
    final isFragile = useState(false);
    final senderNameController = useTextEditingController();
    final senderPhoneController = useTextEditingController();
    final formKey = useMemoized(GlobalKey<FormState>.new);
    final pickupLocation = ref.watch(pickupLocationProvider);
    final dropoffLocation = ref.watch(dropoffLocationProvider);
    final user = ref.watch(authControllerProvider);
    final locations = ref.watch(locationsProvider);

    const items = [
      'Documents',
      'Food Stuff',
      'Money',
      'Clothing',
      'Electronics',
      'Phone',
      'I prefer not to say',
    ];

    // Restore saved logistics details if any
    useEffect(
      () {
        Future.microtask(() async {
          final logistics = await ref.read(logisticsStateProvider.future);
          if (logistics == null) return;
          if (!context.mounted) return;

          final shouldRestore = await openChoiceDialog(
            context: context,
            title: 'Restore Saved Details',
            description:
                'Would you like to restore your previously saved logistics details?',
            yesText: 'Restore',
            cancelText: 'Discard',
            icon: Icons.restore,
            iconColor: Colors.white,
            iconBackgroundColor: const Color(0xFF21D1A5),
          );
          logger
            ..i('Should restore:')
            ..i(shouldRestore);

          if (shouldRestore == true) {
            item.value = logistics.item;
            descriptionController.text = logistics.description ?? '';
            receiverNameController.text = logistics.receiverName;
            receiverPhone.value = logistics.receiverPhone;
            weightController.text = logistics.weight?.toString() ?? '';
            isFragile.value = logistics.fragile;
            senderNameController.text = logistics.senderName;
            senderPhoneController.text = logistics.senderPhone;

            // Restore locations
            ref.read(pickupLocationProvider.notifier).state =
                logistics.pickupLocation;
            ref.read(dropoffLocationProvider.notifier).state =
                logistics.dropoffLocation;
          } else {
            // Clear saved logistics details
            await ref.read(logisticsStateProvider.notifier).clearLogistics();
          }
        });
        return null;
      },
      [],
    );

    return Scaffold(
      appBar: const MyAppBar(title: 'Logistics'),
      body: Padding(
        padding: const EdgeInsets.only(left: 23, right: 25),
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                8.verticalSpace,
                const SectionTitle(
                  'Item Details',
                  color: Color(0xFF1C1C20),
                ),
                16.verticalSpace,
                SelectInputField<String>(
                  hintText: 'What are you sending?',
                  labelText: 'Item',
                  items: items,
                  onChanged: (value) => item.value = value ?? '',
                  // Only set value if it exists in items list
                  value: items.contains(item.value) ? item.value : null,
                ),
                16.verticalSpace,
                InputField(
                  hintText: 'Enter description',
                  labelText: 'Description',
                  controller: descriptionController,
                  keyboardType: TextInputType.multiline,
                  hasValue: descriptionController.text.isNotEmpty,
                  maxLines: 3,
                  maxLength: 100,
                  textInputAction: TextInputAction.newline,
                ),
                16.verticalSpace,
                Row(
                  children: [
                    const SectionTitle(
                      'Is it fragile?',
                      color: Color(0xFF1C1C20),
                    ),
                    8.horizontalSpace,
                    SwitchInput(
                      value: isFragile.value,
                      height: 30.h,
                      width: 40.w,
                      onChanged: (value) => isFragile.value = value,
                    ),
                  ],
                ),
                16.verticalSpace,
                InputField(
                  hintText: 'Enter package weight in kg',
                  labelText: 'Weight (kg)',
                  controller: weightController,
                  keyboardType:
                      const TextInputType.numberWithOptions(decimal: true),
                  hasValue: weightController.text.isNotEmpty,
                  validator: (value) {
                    if (value == null || value.isEmpty) return null;
                    final weightValue = double.tryParse(value);
                    if (weightValue == null || weightValue <= 0) {
                      return 'Please enter a valid weight';
                    }
                    return null;
                  },
                ),
                16.verticalSpace,
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SectionTitle(
                      'Sender information',
                      color: Color(0xFF1C1C20),
                    ),

                    /// Use current details switch
                    Row(
                      children: [
                        Text(
                          'Use current details',
                          style: context.textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF21D1A5),
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        4.horizontalSpace,
                        SwitchInput(
                          value: useCurrentDetails.value,
                          height: 25.h,
                          width: 35.w,
                          onChanged: (value) {
                            // Fill the inputs with the current user details
                            // or clear it
                            useCurrentDetails.value = value;
                            if (value) {
                              senderNameController.text =
                                  user.valueOrNull?.name ?? '';
                              senderPhoneController.text =
                                  user.valueOrNull?.phoneNumber ?? '';
                            } else {
                              senderNameController.text = '';
                              senderPhoneController.text = '';
                            }
                          },
                        ),
                      ],
                    ),
                  ],
                ),
                16.verticalSpace,
                InputField(
                  hintText: 'Enter name of sender',
                  labelText: 'Sender name',
                  controller: senderNameController,
                  keyboardType: TextInputType.text,
                  hasValue: senderNameController.text.isNotEmpty,
                  autofillHints: const [
                    AutofillHints.name,
                  ],
                  validator: ValidationBuilder(
                    requiredMessage: 'Sender name is required',
                  ).minLength(3, 'Sender name is too short').build(),
                ),
                16.verticalSpace,
                PhoneInputField(
                  label: 'Sender phone number',
                  controller: senderPhoneController,
                ),
                16.verticalSpace,
                const SectionTitle(
                  'Pickup Location',
                  color: Color(0xFF1C1C20),
                ),
                16.verticalSpace,
                LocationCard(
                  onTap: () async {
                    await displayBottomPanel(
                      context,
                      child: EditLocationModalForm(
                        title: 'Pickup Location',
                        selectedLocationId: pickupLocation?.id,
                        onLocationSelected: (location) {
                          ref.read(pickupLocationProvider.notifier).state =
                              location;
                        },
                      ),
                    );
                  },
                  address: locations.whenOrNull(
                        data: (locations) =>
                            pickupLocation?.address ?? 'Select pickup location',
                      ) ??
                      'Loading locations...',
                ),
                16.verticalSpace,
                const SectionTitle(
                  'Drop-off Location',
                  color: Color(0xFF1C1C20),
                ),
                16.verticalSpace,
                LocationCard(
                  onTap: () async {
                    await displayBottomPanel(
                      context,
                      child: EditLocationModalForm(
                        title: 'Drop-off location',
                        selectedLocationId: dropoffLocation?.id,
                        onLocationSelected: (location) {
                          ref.read(dropoffLocationProvider.notifier).state =
                              location;
                        },
                      ),
                    );
                  },
                  address: locations.whenOrNull(
                        data: (locations) =>
                            dropoffLocation?.address ??
                            'Select drop-off location',
                      ) ??
                      'Loading locations...',
                ),
                16.verticalSpace,
                const SectionTitle(
                  'Receiver information',
                  color: Color(0xFF1C1C20),
                ),
                16.verticalSpace,
                InputField(
                  hintText: 'Enter name of receiver',
                  labelText: 'Receiver name',
                  controller: receiverNameController,
                  keyboardType: TextInputType.text,
                  hasValue: receiverNameController.text.isNotEmpty,
                  autofillHints: const [
                    AutofillHints.name,
                  ],
                  validator: ValidationBuilder(
                    requiredMessage: 'Receiver name is required',
                  ).minLength(3, 'Receiver name is too short').build(),
                ),
                16.verticalSpace,
                PhoneInputField(
                  phone: receiverPhone,
                  label: 'Receiver phone number',
                ),
                16.verticalSpace,
                const MyDivider(
                  color: Color(0xFFECECEC),
                ),
                30.verticalSpace,
                PrimaryActionButton(
                  text: 'Proceed to Checkout',
                  onPressed: () async {
                    if (formKey.currentState!.validate()) {
                      if (pickupLocation == null || dropoffLocation == null) {
                        await showToast(
                          'Please select both pickup and drop-off locations',
                          gravity: ToastGravity.CENTER,
                        );
                        return;
                      }

                      // Save logistics details
                      await ref
                          .read(logisticsStateProvider.notifier)
                          .saveLogistics(
                            senderName: senderNameController.text,
                            senderPhone: senderPhoneController.text,
                            pickupLocation: pickupLocation,
                            receiverName: receiverNameController.text,
                            receiverPhone: receiverPhone.value,
                            dropoffLocation: dropoffLocation,
                            item: item.value,
                            description: descriptionController.text,
                            weight: double.tryParse(weightController.text) ?? 0,
                            fragile: isFragile.value,
                          );

                      if (context.mounted) {
                        await context.push(
                          CheckoutRoute(type: CheckoutType.logistics).location,
                        );
                      }
                    }
                  },
                ),
                30.verticalSpace,
              ],
            ),
          ),
        ),
      ),
    );
  }
}
