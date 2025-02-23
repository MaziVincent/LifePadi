# Lifepadi

A modern logistics app built with Flutter.

### Build an Android app bundle for deployment

```bash
flutter build appbundle \
  --release \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols
```

### Build an iOS archive for deployment

```bash
flutter build ipa \
  --release \
  --obfuscate \
  --split-debug-info=build/app/outputs/symbols
```
