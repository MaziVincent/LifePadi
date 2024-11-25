import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:form_validator/form_validator.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LogisticsPage extends HookConsumerWidget {
  const LogisticsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final itemName = useState<String>('');
    final description = useState('');
    final receiverName = useState('');
    final receiverPhone = useState('');
    final useCurrentDetails = useState(false);
    final weight = useState<double?>(null);
    final isFragile = useState(false);
    final senderNameController = useTextEditingController();
    final senderPhoneController = useTextEditingController();
    final formKey = useMemoized(GlobalKey<FormState>.new);
    final pickupLocation = ref.watch(pickupLocationProvider);
    final dropoffLocation = ref.watch(dropoffLocationProvider);
    final locations = ref.watch(locationsProvider);

    const itemNames = [
      'Documents',
      'Food Stuff',
      'Money',
      'Clothing',
      'Electronics',
      'Phone',
      'I prefer not to say',
    ];

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
                  hintText: 'Name of Item',
                  labelText: 'Item Name',
                  items: itemNames,
                  onChanged: (value) => itemName.value = value ?? '',
                ),
                16.verticalSpace,
                InputField(
                  hintText: 'Enter description',
                  labelText: 'Description',
                  onChanged: (value) => description.value = value,
                  keyboardType: TextInputType.multiline,
                  hasValue: description.value.isNotEmpty,
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
                  onChanged: (value) => weight.value = double.tryParse(value),
                  keyboardType:
                      const TextInputType.numberWithOptions(decimal: true),
                  hasValue: weight.value != null,
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
                        Consumer(
                          builder: (context, ref, child) {
                            final user = ref.watch(authControllerProvider);

                            return SwitchInput(
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
                            );
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
                    AutofillHints.givenName,
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
                  onChanged: (value) => receiverName.value = value,
                  keyboardType: TextInputType.text,
                  hasValue: receiverName.value.isNotEmpty,
                  initialValue: receiverName.value,
                  autofillHints: const [
                    AutofillHints.givenName,
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
                  label: 'Proceed to Checkout',
                  onPressed: () async {
                    if (formKey.currentState!.validate()) {
                      if (pickupLocation == null || dropoffLocation == null) {
                        await showToast(
                          'Please select both pickup and drop-off locations',
                          gravity: ToastGravity.CENTER,
                        );
                        return;
                      }
                      await context.push(CheckoutRoute().location);
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
