import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LogisticsPage extends HookWidget {
  const LogisticsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final itemName = useState<String>('');
    final description = useState('');
    final receiverName = useState('');
    final receiverPhone = useState('');
    final useCurrentDetails = useState(false);
    final senderNameController = useTextEditingController();
    final senderPhoneController = useTextEditingController();
    final formKey = useMemoized(GlobalKey<FormState>.new);

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
                  labelText: 'Description (Optional)',
                  onChanged: (value) => description.value = value,
                  keyboardType: TextInputType.multiline,
                  hasValue: description.value.isNotEmpty,
                  maxLines: 3,
                  maxLength: 100,
                  textInputAction: TextInputAction.newline,
                ),
                8.verticalSpace,
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
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        4.horizontalSpace,
                        Consumer(
                          builder: (context, ref, child) {
                            final user = ref.watch(authControllerProvider);

                            return SwitchInput(
                              value: useCurrentDetails.value,
                              height: 20.h,
                              width: 30.w,
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
                      child: const EditLocationModalForm(
                        title: 'Pickup Location',
                      ),
                    );
                  },
                  address: 'Soja, Lekki Lagos...',
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
                      child: const EditLocationModalForm(
                        title: 'Drop-off location',
                      ),
                    );
                  },
                  address: '3RD FLOOR DREAMLINK CONCEPTS',
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
                      // Just a dummy action to show the next page
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
