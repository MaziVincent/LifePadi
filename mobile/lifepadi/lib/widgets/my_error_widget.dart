import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class MyErrorWidget extends StatelessWidget {
  const MyErrorWidget({
    super.key,
    required this.error,
  });

  final Object error;

  @override
  Widget build(BuildContext context) {
    final (:title, :description) = getErrorInfo(error);

    return Column(
      children: [
        Text(
          title,
          style: context.textTheme.titleSmall?.copyWith(
            color: kDarkPrimaryColor,
          ),
        ),
        Text(
          description,
          style: context.textTheme.bodySmall,
          textAlign: TextAlign.justify,
        ),
      ].separatedBy(4.verticalSpace),
    );
  }
}
