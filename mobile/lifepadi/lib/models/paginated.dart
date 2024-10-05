class Paginated<T> {
  Paginated({required this.data, required this.totalCount});

  final T data;
  final int totalCount;
}
