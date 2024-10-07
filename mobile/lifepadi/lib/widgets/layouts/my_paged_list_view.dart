import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

import '../widgets.dart';
import 'my_paged_sliver_list.dart';

/// A [ListView] with pagination capabilities.
///
/// To include separators, use [MyPagedListView.separated].
///
/// Wraps a [MyPagedSliverList] in a [BoxScrollView] so that it can be
/// used without the need for a [CustomScrollView]. Similar to a [ListView].
class MyPagedListView<PageKeyType, ItemType> extends BoxScrollView {
  const MyPagedListView({
    required this.pagingController,
    required this.builderDelegate,
    // Matches [ScrollView.controller].
    ScrollController? scrollController,
    // Matches [ScrollView.scrollDirection].
    super.scrollDirection,
    // Matches [ScrollView.reverse].
    super.reverse,
    // Matches [ScrollView.primary].
    super.primary,
    // Matches [ScrollView.physics].
    super.physics,
    // Matches [ScrollView.shrinkWrap].
    super.shrinkWrap,
    // Matches [BoxScrollView.padding].
    super.padding,
    this.itemExtent,
    this.prototypeItem,
    this.addAutomaticKeepAlives = true,
    this.addRepaintBoundaries = true,
    this.addSemanticIndexes = true,
    // Matches [ScrollView.cacheExtent]
    super.cacheExtent,
    // Matches [ScrollView.dragStartBehavior]
    super.dragStartBehavior,
    // Matches [ScrollView.keyboardDismissBehavior]
    super.keyboardDismissBehavior,
    // Matches [ScrollView.restorationId]
    super.restorationId,
    // Matches [ScrollView.clipBehavior]
    super.clipBehavior,
    super.key,
  })  : assert(
          itemExtent == null || prototypeItem == null,
          'You can only pass itemExtent or prototypeItem, not both',
        ),
        _separatorBuilder = null,
        _shrinkWrapFirstPageIndicators = shrinkWrap,
        super(
          controller: scrollController,
        );

  const MyPagedListView.separated({
    required this.pagingController,
    required this.builderDelegate,
    required IndexedWidgetBuilder separatorBuilder,
    // Matches [ScrollView.controller].
    ScrollController? scrollController,
    // Matches [ScrollView.scrollDirection].
    super.scrollDirection,
    // Matches [ScrollView.reverse].
    super.reverse,
    // Matches [ScrollView.primary].
    super.primary,
    // Matches [ScrollView.physics].
    super.physics,
    // Matches [ScrollView.shrinkWrap].
    super.shrinkWrap,
    // Matches [BoxScrollView.padding].
    super.padding,
    this.itemExtent,
    this.addAutomaticKeepAlives = true,
    this.addRepaintBoundaries = true,
    this.addSemanticIndexes = true,
    // Matches [ScrollView.cacheExtent]
    super.cacheExtent,
    // Matches [ScrollView.dragStartBehavior]
    super.dragStartBehavior,
    // Matches [ScrollView.keyboardDismissBehavior]
    super.keyboardDismissBehavior,
    // Matches [ScrollView.restorationId]
    super.restorationId,
    // Matches [ScrollView.clipBehavior]
    super.clipBehavior,
    super.key,
  })  : prototypeItem = null,
        _shrinkWrapFirstPageIndicators = shrinkWrap,
        _separatorBuilder = separatorBuilder,
        super(
          controller: scrollController,
        );

  /// Matches [PagedLayoutBuilder.pagingController].
  final PagingController<PageKeyType, ItemType> pagingController;

  /// Matches [PagedLayoutBuilder.builderDelegate].
  final PagedChildBuilderDelegate<ItemType> builderDelegate;

  /// The builder for list item separators, just like in [ListView.separated].
  final IndexedWidgetBuilder? _separatorBuilder;

  /// Matches [SliverChildBuilderDelegate.addAutomaticKeepAlives].
  final bool addAutomaticKeepAlives;

  /// Matches [SliverChildBuilderDelegate.addRepaintBoundaries].
  final bool addRepaintBoundaries;

  /// Matches [SliverChildBuilderDelegate.addSemanticIndexes].
  final bool addSemanticIndexes;

  /// Matches [SliverFixedExtentList.itemExtent].
  ///
  /// If this is not null, [prototypeItem] must be null, and vice versa.
  final double? itemExtent;

  /// Matches [SliverPrototypeExtentList.prototypeItem].
  ///
  /// If this is not null, [itemExtent] must be null, and vice versa.
  final Widget? prototypeItem;

  /// Matches [PagedSliverList.shrinkWrapFirstPageIndicators].
  final bool _shrinkWrapFirstPageIndicators;

  @override
  Widget buildChildLayout(BuildContext context) {
    final separatorBuilder = _separatorBuilder;
    return separatorBuilder != null
        ? MyPagedSliverList<PageKeyType, ItemType>.separated(
            builderDelegate: builderDelegate,
            pagingController: pagingController,
            separatorBuilder: separatorBuilder,
            addAutomaticKeepAlives: addAutomaticKeepAlives,
            addRepaintBoundaries: addRepaintBoundaries,
            addSemanticIndexes: addSemanticIndexes,
            itemExtent: itemExtent,
            shrinkWrapFirstPageIndicators: _shrinkWrapFirstPageIndicators,
          )
        : MyPagedSliverList<PageKeyType, ItemType>(
            builderDelegate: builderDelegate,
            pagingController: pagingController,
            addAutomaticKeepAlives: addAutomaticKeepAlives,
            addRepaintBoundaries: addRepaintBoundaries,
            addSemanticIndexes: addSemanticIndexes,
            itemExtent: itemExtent,
            shrinkWrapFirstPageIndicators: _shrinkWrapFirstPageIndicators,
            prototypeItem: prototypeItem,
          );
  }
}
