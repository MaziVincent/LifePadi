import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/user.dart';
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

  @MappableField(key: 'id')
  final int id;

  @MappableField(key: 'rating')
  final double rating;

  @MappableField(key: 'body')
  final String? body;

  @MappableField(key: 'customerId')
  final int customerId;

  @MappableField(key: 'customer')
  final Customer? customer;

  @MappableField(key: 'vendorId')
  final int vendorId;

  @MappableField(key: 'vendor')
  final Vendor? vendor;

  @MappableField(key: 'createdAt')
  final DateTime createdAt;

  @MappableField(key: 'updatedAt')
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

  @MappableField(key: 'rating')
  final double rating;

  @MappableField(key: 'body')
  final String? body;

  @MappableField(key: 'customerId')
  final int customerId;

  @MappableField(key: 'vendorId')
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

  @MappableField(key: 'rating')
  final double rating;

  @MappableField(key: 'body')
  final String? body;

  @MappableField(key: 'customerId')
  final int customerId;

  @MappableField(key: 'vendorId')
  final int vendorId;

  static const fromMap = UpdateVendorReviewRequestMapper.fromMap;
  static const fromJson = UpdateVendorReviewRequestMapper.fromJson;
}
