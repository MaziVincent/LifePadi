import 'package:calendar_date_picker2/calendar_date_picker2.dart';
import 'package:flutter/material.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/input_field.dart';

/// A custom date picker field that matches the [InputField] design
class DatePickerField extends StatelessWidget {
  DatePickerField({
    super.key,
    required this.labelText,
    required this.hintText,
    required this.selectedDate,
    required this.onDateSelected,
  }) : controller = TextEditingController(
          text: selectedDate != null ? selectedDate.readableDate : '',
        );

  final String labelText;
  final String hintText;
  final DateTime? selectedDate;
  final void Function(List<DateTime?>) onDateSelected;
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return InputField(
      labelText: labelText,
      hintText: hintText,
      keyboardType: TextInputType.none,
      hasValue: selectedDate != null,
      controller: controller,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please select a date';
        }
        return null;
      },
      child: GestureDetector(
        onTap: () async {
          final config = CalendarDatePicker2WithActionButtonsConfig(
            selectedDayHighlightColor: kDarkPrimaryColor,
            weekdayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            weekdayLabelTextStyle: const TextStyle(
              color: Colors.black87,
              fontWeight: FontWeight.bold,
            ),
            controlsHeight: 50,
            dayMaxWidth: 25,
            animateToDisplayedMonthDate: true,
            controlsTextStyle: const TextStyle(
              color: Colors.black,
              fontSize: 15,
              fontWeight: FontWeight.bold,
            ),
            dayTextStyle: const TextStyle(
              color: kLightPrimaryColor,
              fontWeight: FontWeight.bold,
            ),
            disabledDayTextStyle: const TextStyle(
              color: kLightTextColor,
            ),
            centerAlignModePicker: true,
            useAbbrLabelForMonthModePicker: true,
            modePickersGap: 0,
            lastDate: DateTime(DateTime.now().year - 3, 12, 31),
          );

          final values = await showCalendarDatePicker2Dialog(
            context: context,
            config: config,
            dialogSize: const Size(325, 370),
            borderRadius: BorderRadius.circular(15),
            value: [selectedDate],
            dialogBackgroundColor: Colors.white,
          );

          if (values != null) {
            onDateSelected(values);
            controller.text = values[0]?.readableDate ?? '';
          }
        },
        child: const Icon(
          Icons.calendar_today,
          color: Color(0xFF858585),
        ),
      ),
    );
  }
}
