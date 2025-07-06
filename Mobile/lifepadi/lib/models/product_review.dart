import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/user.dart';

part 'product_review.mapper.dart';

/// Represents a product review from a customer
@MappableClass()
class ProductReview with ProductReviewMappable {
  const ProductReview({
    required this.id,
    required this.rating,
    this.body,
    required this.customerId,
    this.customer,
    required this.productId,
    this.product,
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

  @MappableField(key: 'productId')
  final int productId;

  @MappableField(key: 'product')
  final Product? product;

  @MappableField(key: 'createdAt')
  final DateTime createdAt;

  @MappableField(key: 'updatedAt')
  final DateTime updatedAt;

  static const fromMap = ProductReviewMapper.fromMap;
  static const fromJson = ProductReviewMapper.fromJson;
}

/// Request model for creating a new product review
@MappableClass()
class CreateProductReviewRequest with CreateProductReviewRequestMappable {
  const CreateProductReviewRequest({
    required this.rating,
    this.body,
    required this.customerId,
    required this.productId,
  });

  @MappableField(key: 'rating')
  final double rating;

  @MappableField(key: 'body')
  final String? body;

  @MappableField(key: 'customerId')
  final int customerId;

  @MappableField(key: 'productId')
  final int productId;

  static const fromMap = CreateProductReviewRequestMapper.fromMap;
  static const fromJson = CreateProductReviewRequestMapper.fromJson;
}

/// Request model for updating an existing product review
@MappableClass()
class UpdateProductReviewRequest with UpdateProductReviewRequestMappable {
  const UpdateProductReviewRequest({
    required this.rating,
    this.body,
    required this.customerId,
    required this.productId,
  });

  @MappableField(key: 'rating')
  final double rating;

  @MappableField(key: 'body')
  final String? body;

  @MappableField(key: 'customerId')
  final int customerId;

  @MappableField(key: 'productId')
  final int productId;

  static const fromMap = UpdateProductReviewRequestMapper.fromMap;
  static const fromJson = UpdateProductReviewRequestMapper.fromJson;
}
