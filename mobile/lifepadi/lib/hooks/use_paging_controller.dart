part of 'hooks.dart';

/// Creates a [PagingController] that will be disposed automatically and handles page requests.
///
/// [PageKeyType] is the type of the page key (e.g., int, String).
/// [ItemType] is the type of items being paginated.
/// [fetchPage] is the function that will be called to fetch each page of items.
PagingController<PageKeyType, ItemType>
    usePagingController<PageKeyType, ItemType>({
  required PageKeyType firstPageKey,
  required Future<void> Function(PageKeyType pageKey) fetchPage,
  int? invisibleItemsThreshold,
  List<Object?>? keys,
}) {
  final controller = useState(
    PagingController<PageKeyType, ItemType>(
      firstPageKey: firstPageKey,
      invisibleItemsThreshold: invisibleItemsThreshold,
    ),
  );

  useEffect(
    () {
      void listener(PageKeyType pageKey) {
        fetchPage(pageKey);
      }

      controller.value.addPageRequestListener(listener);
      return () {
        controller.value.removePageRequestListener(listener);
        controller.value.dispose();
      };
    },
    [controller.value, fetchPage],
  );

  return controller.value;
}
