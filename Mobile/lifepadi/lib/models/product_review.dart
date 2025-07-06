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

  @MappableField(key: 'Id')
  final int id;

  @MappableField(key: 'Rating')
  final double rating;

  @MappableField(key: 'Body')
  final String? body;

  @MappableField(key: 'CustomerId')
  final int customerId;

  @MappableField(key: 'Customer')
  final Customer? customer;

  @MappableField(key: 'ProductId')
  final int productId;

  @MappableField(key: 'Product')
  final Product? product;

  @MappableField(key: 'CreatedAt')
  final DateTime createdAt;

  @MappableField(key: 'UpdatedAt')
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

  @MappableField(key: 'Rating')
  final double rating;

  @MappableField(key: 'Body')
  final String? body;

  @MappableField(key: 'CustomerId')
  final int customerId;

  @MappableField(key: 'ProductId')
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

  @MappableField(key: 'Rating')
  final double rating;

  @MappableField(key: 'Body')
  final String? body;

  @MappableField(key: 'CustomerId')
  final int customerId;

  @MappableField(key: 'ProductId')
  final int productId;

  static const fromMap = UpdateProductReviewRequestMapper.fromMap;
  static const fromJson = UpdateProductReviewRequestMapper.fromJson;
}
