import 'package:dart_mappable/dart_mappable.dart';

part 'notification.mapper.dart';

@MappableClass()
class Notification with NotificationMappable {
  Notification({
    required this.id,
    required this.title,
    required this.body,
    required this.route,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  final int id;
  final String title;
  final String body;
  final String? route;
  final DateTime createdAt;

  static const fromJson = NotificationMapper.fromJson;
  static const fromMap = NotificationMapper.fromMap;
}
