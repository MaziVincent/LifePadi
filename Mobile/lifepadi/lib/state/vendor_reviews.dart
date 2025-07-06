import 'package:dio/dio.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/review_statistics.dart';
import 'package:lifepadi/models/vendor_review.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'vendor_reviews.g.dart';

/// Vendor review service for API operations
class VendorReviewService {
  VendorReviewService(this._dio);

  final Dio _dio;

  /// Get reviews by vendor ID
  Future<List<VendorReview>> getReviewsByVendor(int vendorId) async {
    final response = await _dio.get<List<dynamic>>(
      '/vendorreview/allByVendor/$vendorId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return response.data!
        .map((json) => VendorReview.fromMap(json as JsonMap))
        .toList();
  }

  /// Get reviews by vendor ID with pagination
  Future<PaginatedReviewResponse<VendorReview>> getReviewsByVendorPaginated(
    int vendorId, {
    int pageNumber = 1,
    int pageSize = 10,
  }) async {
    final response = await _dio.get<JsonMap>(
      '/vendorreview/allByVendor/$vendorId/paginated',
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
    final reviews = reviewsData.map(VendorReview.fromMap).toList();

    return PaginatedReviewResponse<VendorReview>(
      data: reviews,
      pageNumber: data['pageNumber'] as int,
      pageSize: data['pageSize'] as int,
      totalPages: data['totalPages'] as int,
      totalRecords: data['totalRecords'] as int,
    );
  }

  /// Get vendor average rating
  Future<double> getAverageRating(int vendorId) async {
    final response = await _dio.get<JsonMap>(
      '/vendorreview/averageRating/$vendorId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return (response.data!['averageRating'] as num).toDouble();
  }

  /// Get specific vendor review
  Future<VendorReview> getReview(int reviewId) async {
    final response = await _dio.get<JsonMap>(
      '/vendorreview/$reviewId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return VendorReview.fromMap(response.data!);
  }

  /// Create a new vendor review
  Future<VendorReview> createReview(CreateVendorReviewRequest request) async {
    final response = await _dio.post<JsonMap>(
      '/vendorreview/create',
      data: request.toMap(),
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return VendorReview.fromMap(response.data!);
  }

  /// Update an existing vendor review
  Future<VendorReview> updateReview(
    int reviewId,
    UpdateVendorReviewRequest request,
  ) async {
    final response = await _dio.put<JsonMap>(
      '/vendorreview/update/$reviewId',
      data: request.toMap(),
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return VendorReview.fromMap(response.data!);
  }

  /// Delete a vendor review
  Future<void> deleteReview(int reviewId) async {
    await _dio.delete<void>('/vendorreview/delete/$reviewId');
  }

  /// Get vendor review statistics
  Future<ReviewStatistics> getStatistics(int vendorId) async {
    final response = await _dio.get<JsonMap>(
      '/vendorreview/stats/$vendorId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return ReviewStatistics.fromMap(response.data!);
  }

  /// Get reviews by customer
  Future<List<VendorReview>> getReviewsByCustomer(int customerId) async {
    final response = await _dio.get<List<dynamic>>(
      '/vendorreview/customer/$customerId',
    );

    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    return response.data!
        .map((json) => VendorReview.fromMap(json as JsonMap))
        .toList();
  }
}

/// Vendor review service provider
@riverpod
VendorReviewService vendorReviewService(Ref ref) {
  final dio = ref.read(dioProvider());
  return VendorReviewService(dio);
}

/// Get reviews by vendor ID
@riverpod
Future<List<VendorReview>> vendorReviews(
  Ref ref,
  int vendorId,
) async {
  final service = ref.read(vendorReviewServiceProvider);
  final reviews = await service.getReviewsByVendor(vendorId);
  ref.cache();
  return reviews;
}

/// Get reviews by vendor ID with pagination
@riverpod
Future<PaginatedReviewResponse<VendorReview>> vendorReviewsPaginated(
  Ref ref,
  int vendorId, {
  int pageNumber = 1,
  int pageSize = 10,
}) async {
  final service = ref.read(vendorReviewServiceProvider);
  final reviews = await service.getReviewsByVendorPaginated(
    vendorId,
    pageNumber: pageNumber,
    pageSize: pageSize,
  );
  ref.cache();
  return reviews;
}

/// Get vendor average rating
@riverpod
Future<double> vendorAverageRating(
  Ref ref,
  int vendorId,
) async {
  final service = ref.read(vendorReviewServiceProvider);
  final rating = await service.getAverageRating(vendorId);
  ref.cache();
  return rating;
}

/// Get vendor review statistics
@riverpod
Future<ReviewStatistics> vendorReviewStatistics(
  Ref ref,
  int vendorId,
) async {
  final service = ref.read(vendorReviewServiceProvider);
  final stats = await service.getStatistics(vendorId);
  ref.cache();
  return stats;
}

/// Get specific vendor review
@riverpod
Future<VendorReview> vendorReview(
  Ref ref,
  int reviewId,
) async {
  final service = ref.read(vendorReviewServiceProvider);
  final review = await service.getReview(reviewId);
  ref.cache();
  return review;
}

/// Get reviews by customer
@riverpod
Future<List<VendorReview>> customerVendorReviews(
  Ref ref,
  int customerId,
) async {
  final service = ref.read(vendorReviewServiceProvider);
  final reviews = await service.getReviewsByCustomer(customerId);
  ref.cache();
  return reviews;
}

/// Vendor review controller for CRUD operations
@riverpod
class VendorReviewController extends _$VendorReviewController {
  @override
  Future<void> build() async {
    // Initial state
  }

  /// Create a new vendor review
  Future<VendorReview> createReview({
    required double rating,
    String? body,
    required int vendorId,
  }) async {
    state = const AsyncLoading();

    try {
      final user = ref.read(authControllerProvider);
      final customerId = user.maybeWhen(
        data: (user) => user.id,
        orElse: () =>
            throw const UnauthorizedException('User not authenticated'),
      );

      final request = CreateVendorReviewRequest(
        rating: rating,
        body: body,
        customerId: customerId,
        vendorId: vendorId,
      );

      final service = ref.read(vendorReviewServiceProvider);
      final review = await service.createReview(request);

      // Invalidate related providers to refresh data
      ref
        ..invalidate(vendorReviewsProvider(vendorId))
        ..invalidate(vendorAverageRatingProvider(vendorId))
        ..invalidate(vendorReviewStatisticsProvider(vendorId))
        ..invalidate(customerVendorReviewsProvider(customerId));

      state = const AsyncData(null);
      return review;
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
      rethrow;
    }
  }

  /// Update an existing vendor review
  Future<VendorReview> updateReview({
    required int reviewId,
    required double rating,
    String? body,
    required int vendorId,
  }) async {
    state = const AsyncLoading();

    try {
      final user = ref.read(authControllerProvider);
      final customerId = user.maybeWhen(
        data: (user) => user.id,
        orElse: () =>
            throw const UnauthorizedException('User not authenticated'),
      );

      final request = UpdateVendorReviewRequest(
        rating: rating,
        body: body,
        customerId: customerId,
        vendorId: vendorId,
      );

      final service = ref.read(vendorReviewServiceProvider);
      final review = await service.updateReview(reviewId, request);

      // Invalidate related providers to refresh data
      ref
        ..invalidate(vendorReviewsProvider(vendorId))
        ..invalidate(vendorAverageRatingProvider(vendorId))
        ..invalidate(vendorReviewStatisticsProvider(vendorId))
        ..invalidate(customerVendorReviewsProvider(customerId))
        ..invalidate(vendorReviewProvider(reviewId));

      state = const AsyncData(null);
      return review;
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
      rethrow;
    }
  }

  /// Delete a vendor review
  Future<void> deleteReview({
    required int reviewId,
    required int vendorId,
  }) async {
    state = const AsyncLoading();

    try {
      final user = ref.read(authControllerProvider);
      final customerId = user.maybeWhen(
        data: (user) => user.id,
        orElse: () =>
            throw const UnauthorizedException('User not authenticated'),
      );

      final service = ref.read(vendorReviewServiceProvider);
      await service.deleteReview(reviewId);

      // Invalidate related providers to refresh data
      ref
        ..invalidate(vendorReviewsProvider(vendorId))
        ..invalidate(vendorAverageRatingProvider(vendorId))
        ..invalidate(vendorReviewStatisticsProvider(vendorId))
        ..invalidate(customerVendorReviewsProvider(customerId))
        ..invalidate(vendorReviewProvider(reviewId));

      state = const AsyncData(null);
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
      rethrow;
    }
  }
}
