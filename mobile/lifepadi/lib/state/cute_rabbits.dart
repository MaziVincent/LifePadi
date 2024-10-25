import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'cute_rabbits.g.dart';

@riverpod
FutureOr<List<(IconData, String)>> cuteRabbits(Ref ref) async {
  // A proper mock of a simple request. I guess adopting a rabbit is simple.
  await Future<void>.delayed(800.milliseconds);

  final result = [
    (Icons.cruelty_free, 'A fluffy, cute, rabbit.'),
    (Icons.cruelty_free_outlined, 'Wow, this looks even fluffier!'),
    (Icons.cruelty_free_sharp, "Why must I choose, I want 'em all!"),
    (Icons.cruelty_free_rounded, 'This is all puffy 😍'),
    (Icons.pets, 'Uhm... we also could see more pets...'),
    (Icons.flutter_dash, 'Oh. My. God.\nI. Want. This.'),
  ];

  ref.cacheFor(2.minutes);
  return result;
}
