import 'package:dart_mappable/dart_mappable.dart';

part 'errand.mapper.dart';

@MappableClass()
class Errand with ErrandMappable {
  Errand({
    required this.id,
    required this.name,
    required this.iconUrl,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'ServiceIconUrl')
  final String iconUrl;
}
