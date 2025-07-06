import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/user_lite.dart';
import 'package:lifepadi/models/vendor.dart';

part 'vendor_review.mapper.dart';

/// Represents a vendor review from a customer
@MappableClass()
class VendorReview with VendorReviewMappable {
  const VendorReview({
    required this.id,
    required this.rating,
    this.body,
    required this.customerId,
    this.customer,
    required this.vendorId,
    this.vendor,
    required this.createdAt,
    required this.updatedAt,
  });

  @MappableField(key: 'Id')
  final int id;

  @MappableField(key: 'Rating')
  final double rating;

  @MappableField(key: 'Body')
  final String? body;

  @MappableField(key: 'CustomerId')
  final int customerId;

  @MappableField(key: 'Customer')
  final CustomerLite? customer;

  @MappableField(key: 'VendorId')
  final int vendorId;

  @MappableField(key: 'Vendor')
  final Vendor? vendor;

  @MappableField(key: 'CreatedAt')
  final DateTime createdAt;

  @MappableField(key: 'UpdatedAt')
  final DateTime updatedAt;

  static const fromMap = VendorReviewMapper.fromMap;
  static const fromJson = VendorReviewMapper.fromJson;
}

/// Request model for creating a new vendor review
@MappableClass()
class CreateVendorReviewRequest with CreateVendorReviewRequestMappable {
  const CreateVendorReviewRequest({
    required this.rating,
    this.body,
    required this.customerId,
    required this.vendorId,
  });

  @MappableField(key: 'Rating')
  final double rating;

  @MappableField(key: 'Body')
  final String? body;

  @MappableField(key: 'CustomerId')
  final int customerId;

  @MappableField(key: 'VendorId')
  final int vendorId;

  static const fromMap = CreateVendorReviewRequestMapper.fromMap;
  static const fromJson = CreateVendorReviewRequestMapper.fromJson;
}

/// Request model for updating an existing vendor review
@MappableClass()
class UpdateVendorReviewRequest with UpdateVendorReviewRequestMappable {
  const UpdateVendorReviewRequest({
    required this.rating,
    this.body,
    required this.customerId,
    required this.vendorId,
  });

  @MappableField(key: 'Rating')
  final double rating;

  @MappableField(key: 'Body')
  final String? body;

  @MappableField(key: 'CustomerId')
  final int customerId;

  @MappableField(key: 'VendorId')
  final int vendorId;

  static const fromMap = UpdateVendorReviewRequestMapper.fromMap;
  static const fromJson = UpdateVendorReviewRequestMapper.fromJson;
}
