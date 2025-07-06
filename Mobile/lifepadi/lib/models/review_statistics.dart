import 'package:dart_mappable/dart_mappable.dart';

part 'review_statistics.mapper.dart';

/// Represents review statistics for a product or vendor
@MappableClass()
class ReviewStatistics with ReviewStatisticsMappable {
  const ReviewStatistics({
    required this.totalReviews,
    required this.averageRating,
    required this.ratingDistribution,
  });

  @MappableField(key: 'totalReviews')
  final int totalReviews;

  @MappableField(key: 'averageRating')
  final double averageRating;

  @MappableField(key: 'ratingDistribution')
  final Map<String, int> ratingDistribution;

  static const fromMap = ReviewStatisticsMapper.fromMap;
  static const fromJson = ReviewStatisticsMapper.fromJson;

  /// Get the count for a specific rating (1-5)
  int getRatingCount(int rating) {
    return ratingDistribution[rating.toString()] ?? 0;
  }

  /// Get the percentage for a specific rating (1-5)
  double getRatingPercentage(int rating) {
    if (totalReviews == 0) return 0;
    final count = getRatingCount(rating);
    return (count / totalReviews) * 100;
  }
}

/// Represents a paginated response for reviews
@MappableClass()
class PaginatedReviewResponse<T> with PaginatedReviewResponseMappable<T> {
  const PaginatedReviewResponse({
    required this.data,
    required this.pageNumber,
    required this.pageSize,
    required this.totalPages,
    required this.totalRecords,
  });

  @MappableField(key: 'data')
  final List<T> data;

  @MappableField(key: 'pageNumber')
  final int pageNumber;

  @MappableField(key: 'pageSize')
  final int pageSize;

  @MappableField(key: 'totalPages')
  final int totalPages;

  @MappableField(key: 'totalRecords')
  final int totalRecords;

  static const fromMap = PaginatedReviewResponseMapper.fromMap;
  static const fromJson = PaginatedReviewResponseMapper.fromJson;

  /// Check if there are more pages available
  bool get hasNextPage => pageNumber < totalPages;

  /// Check if this is the first page
  bool get isFirstPage => pageNumber == 1;

  /// Check if this is the last page
  bool get isLastPage => pageNumber == totalPages;
}

/// Response model for average rating API calls
@MappableClass()
class AverageRatingResponse with AverageRatingResponseMappable {
  const AverageRatingResponse({
    required this.averageRating,
  });

  @MappableField(key: 'averageRating')
  final double averageRating;

  static const fromMap = AverageRatingResponseMapper.fromMap;
  static const fromJson = AverageRatingResponseMapper.fromJson;
}
