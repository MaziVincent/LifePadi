part of 'hooks.dart';

/// Creates a [PagingController] that will be disposed automatically and handles page requests.
///
/// [PageKeyType] is the type of the page key (e.g., int, String).
/// [ItemType] is the type of items being paginated.
/// [fetchPage] is the function that will be called to fetch each page of items.
PagingController<PageKeyType, ItemType>
    usePagingController<PageKeyType, ItemType>({
  required PageKeyType firstPageKey,
  required Future<void> Function(
    PageKeyType pageKey,
    PagingController<PageKeyType, ItemType> controller,
  ) fetchPage,
  int? invisibleItemsThreshold,
  List<Object?>? keys,
}) {
  return use(
    _PagingControllerHook<PageKeyType, ItemType>(
      firstPageKey: firstPageKey,
      fetchPage: fetchPage,
      invisibleItemsThreshold: invisibleItemsThreshold,
      keys: keys,
    ),
  );
}

class _PagingControllerHook<PageKeyType, ItemType>
    extends Hook<PagingController<PageKeyType, ItemType>> {
  const _PagingControllerHook({
    required this.firstPageKey,
    required this.fetchPage,
    this.invisibleItemsThreshold,
    super.keys,
  });

  final PageKeyType firstPageKey;
  final Future<void> Function(
    PageKeyType pageKey,
    PagingController<PageKeyType, ItemType> controller,
  ) fetchPage;
  final int? invisibleItemsThreshold;

  @override
  HookState<PagingController<PageKeyType, ItemType>,
          Hook<PagingController<PageKeyType, ItemType>>>
      createState() => _PagingControllerHookState<PageKeyType, ItemType>();
}

class _PagingControllerHookState<PageKeyType, ItemType> extends HookState<
    PagingController<PageKeyType, ItemType>,
    _PagingControllerHook<PageKeyType, ItemType>> {
  late final controller = PagingController<PageKeyType, ItemType>(
    firstPageKey: hook.firstPageKey,
    invisibleItemsThreshold: hook.invisibleItemsThreshold,
  );

  @override
  void initHook() {
    super.initHook();
    controller.addPageRequestListener(_listener);
  }

  void _listener(PageKeyType pageKey) {
    hook.fetchPage(pageKey, controller);
  }

  @override
  PagingController<PageKeyType, ItemType> build(BuildContext context) =>
      controller;

  @override
  void dispose() => controller
    ..removePageRequestListener(_listener)
    ..dispose();

  @override
  String get debugLabel => 'usePagingController';
}
