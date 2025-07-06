import 'package:dio/dio.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product_review.dart';
import 'package:lifepadi/models/review_statistics.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'product_reviews.g.dart';

/// Product review service for API operations
class ProductReviewService {
  ProductReviewService(this._dio);

  final Dio _dio;

  /// Get reviews by product ID
  Future<List<ProductReview>> getReviewsByProduct(int productId) async {
    final response = await _dio.get<List<dynamic>>(
      '/productreview/allByProduct/$productId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return response.data!
        .map((json) => ProductReview.fromMap(json as JsonMap))
        .toList();
  }

  /// Get reviews by product ID with pagination
  Future<PaginatedReviewResponse<ProductReview>> getReviewsByProductPaginated(
    int productId, {
    int pageNumber = 1,
    int pageSize = 10,
  }) async {
    final response = await _dio.get<JsonMap>(
      '/productreview/allByProduct/$productId/paginated',
      queryParameters: {
        'pageNumber': pageNumber,
        'pageSize': pageSize,
      },
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    final data = response.data!;
    final reviewsData = List<JsonMap>.from(data['data'] as List);
    final reviews = reviewsData.map(ProductReview.fromMap).toList();

    return PaginatedReviewResponse<ProductReview>(
      data: reviews,
      pageNumber: data['pageNumber'] as int,
      pageSize: data['pageSize'] as int,
      totalPages: data['totalPages'] as int,
      totalRecords: data['totalRecords'] as int,
    );
  }

  /// Get product average rating
  Future<double> getAverageRating(int productId) async {
    final response = await _dio.get<JsonMap>(
      '/productreview/averageRating/$productId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return (response.data!['averageRating'] as num).toDouble();
  }

  /// Get specific product review
  Future<ProductReview> getReview(int reviewId) async {
    final response = await _dio.get<JsonMap>(
      '/productreview/$reviewId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return ProductReview.fromMap(response.data!);
  }

  /// Create a new product review
  Future<ProductReview> createReview(CreateProductReviewRequest request) async {
    final response = await _dio.post<JsonMap>(
      '/productreview/create',
      data: request.toMap(),
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return ProductReview.fromMap(response.data!);
  }

  /// Update an existing product review
  Future<ProductReview> updateReview(
    int reviewId,
    UpdateProductReviewRequest request,
  ) async {
    final response = await _dio.put<JsonMap>(
      '/productreview/update/$reviewId',
      data: request.toMap(),
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return ProductReview.fromMap(response.data!);
  }

  /// Delete a product review
  Future<void> deleteReview(int reviewId) async {
    await _dio.delete<void>('/productreview/delete/$reviewId');
  }

  /// Get product review statistics
  Future<ReviewStatistics> getStatistics(int productId) async {
    final response = await _dio.get<JsonMap>(
      '/productreview/stats/$productId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return ReviewStatistics.fromMap(response.data!);
  }

  /// Get reviews by customer
  Future<List<ProductReview>> getReviewsByCustomer(int customerId) async {
    final response = await _dio.get<List<dynamic>>(
      '/productreview/customer/$customerId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return response.data!
        .map((json) => ProductReview.fromMap(json as JsonMap))
        .toList();
  }
}

/// Product review service provider
@riverpod
ProductReviewService productReviewService(Ref ref) {
  final dio = ref.read(dioProvider());
  return ProductReviewService(dio);
}

/// Get reviews by product ID
@riverpod
Future<List<ProductReview>> productReviews(
  Ref ref,
  int productId,
) async {
  final service = ref.read(productReviewServiceProvider);
  final reviews = await service.getReviewsByProduct(productId);
  ref.cache();
  return reviews;
}

/// Get reviews by product ID with pagination
@riverpod
Future<PaginatedReviewResponse<ProductReview>> productReviewsPaginated(
  Ref ref,
  int productId, {
  int pageNumber = 1,
  int pageSize = 10,
}) async {
  final service = ref.read(productReviewServiceProvider);
  final reviews = await service.getReviewsByProductPaginated(
    productId,
    pageNumber: pageNumber,
    pageSize: pageSize,
  );
  ref.cache();
  return reviews;
}

/// Get product average rating
@riverpod
Future<double> productAverageRating(
  Ref ref,
  int productId,
) async {
  final service = ref.read(productReviewServiceProvider);
  final rating = await service.getAverageRating(productId);
  ref.cache();
  return rating;
}

/// Get product review statistics
@riverpod
Future<ReviewStatistics> productReviewStatistics(
  Ref ref,
  int productId,
) async {
  final service = ref.read(productReviewServiceProvider);
  final stats = await service.getStatistics(productId);
  ref.cache();
  return stats;
}

/// Get specific product review
@riverpod
Future<ProductReview> productReview(
  Ref ref,
  int reviewId,
) async {
  final service = ref.read(productReviewServiceProvider);
  final review = await service.getReview(reviewId);
  ref.cache();
  return review;
}

/// Get reviews by customer
@riverpod
Future<List<ProductReview>> customerProductReviews(
  Ref ref,
  int customerId,
) async {
  final service = ref.read(productReviewServiceProvider);
  final reviews = await service.getReviewsByCustomer(customerId);
  ref.cache();
  return reviews;
}

/// Product review controller for CRUD operations
@riverpod
class ProductReviewController extends _$ProductReviewController {
  @override
  Future<void> build() async {
    // Initial state
  }

  /// Create a new product review
  Future<ProductReview> createReview({
    required double rating,
    String? body,
    required int productId,
  }) async {
    state = const AsyncLoading();

    try {
      final user = ref.read(authControllerProvider);
      final customerId = user.maybeWhen(
        data: (user) => user.id,
        orElse: () =>
            throw const UnauthorizedException('User not authenticated'),
      );

      final request = CreateProductReviewRequest(
        rating: rating,
        body: body,
        customerId: customerId,
        productId: productId,
      );

      final service = ref.read(productReviewServiceProvider);
      final review = await service.createReview(request);

      // Invalidate related providers to refresh data
      ref.invalidate(productReviewsProvider(productId));
      ref.invalidate(productAverageRatingProvider(productId));
      ref.invalidate(productReviewStatisticsProvider(productId));
      ref.invalidate(customerProductReviewsProvider(customerId));

      state = const AsyncData(null);
      return review;
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
      rethrow;
    }
  }

  /// Update an existing product review
  Future<ProductReview> updateReview({
    required int reviewId,
    required double rating,
    String? body,
    required int productId,
  }) async {
    state = const AsyncLoading();

    try {
      final user = ref.read(authControllerProvider);
      final customerId = user.maybeWhen(
        data: (user) => user.id,
        orElse: () =>
            throw const UnauthorizedException('User not authenticated'),
      );

      final request = UpdateProductReviewRequest(
        rating: rating,
        body: body,
        customerId: customerId,
        productId: productId,
      );

      final service = ref.read(productReviewServiceProvider);
      final review = await service.updateReview(reviewId, request);

      // Invalidate related providers to refresh data
      ref.invalidate(productReviewsProvider(productId));
      ref.invalidate(productAverageRatingProvider(productId));
      ref.invalidate(productReviewStatisticsProvider(productId));
      ref.invalidate(customerProductReviewsProvider(customerId));
      ref.invalidate(productReviewProvider(reviewId));

      state = const AsyncData(null);
      return review;
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
      rethrow;
    }
  }

  /// Delete a product review
  Future<void> deleteReview({
    required int reviewId,
    required int productId,
  }) async {
    state = const AsyncLoading();

    try {
      final user = ref.read(authControllerProvider);
      final customerId = user.maybeWhen(
        data: (user) => user.id,
        orElse: () =>
            throw const UnauthorizedException('User not authenticated'),
      );

      final service = ref.read(productReviewServiceProvider);
      await service.deleteReview(reviewId);

      // Invalidate related providers to refresh data
      ref.invalidate(productReviewsProvider(productId));
      ref.invalidate(productAverageRatingProvider(productId));
      ref.invalidate(productReviewStatisticsProvider(productId));
      ref.invalidate(customerProductReviewsProvider(customerId));
      ref.invalidate(productReviewProvider(reviewId));

      state = const AsyncData(null);
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
      rethrow;
    }
  }
}
