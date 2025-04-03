.PHONY: build-appbundle build-ipa extract-symbols reset watch build-apk

# Default target
all: help

# Help command
help:
	@echo "Available commands:"
	@echo "  make build-appbundle  - Build Android app bundle for deployment"
	@echo "  make build-ipa        - Build iOS archive for deployment"
	@echo "  make extract-symbols  - Extract Android symbols (run after build-appbundle)"
	@echo "  make reset            - Clean build, get dependencies, and run build_runner"
	@echo "  make watch            - Run build_runner in watch mode"

# Build Android app bundle for deployment
build-appbundle:
	@echo "Building Android app bundle..."
	flutter build appbundle
	@echo "Android app bundle created successfully."
	@echo "Run 'make extract-symbols' to extract the symbols."

# Extract symbols from the Android build
extract-symbols:
	@echo "Extracting symbols from Android build..."
	@TIMESTAMP=$$(date +%Y%m%d-%H%M%S); \
	cd build/app/intermediates/merged_native_libs/release/mergeReleaseNativeLibs/out/lib/ && \
	zip -r symbols.zip . && \
	cp symbols.zip ~/Downloads/bundle-symbols-$$TIMESTAMP.zip && \
	echo "Symbols extracted and saved at $${HOME}/Downloads/bundle-symbols-$$TIMESTAMP.zip"

# Build iOS archive for deployment
build-ipa:
	@echo "Building iOS archive..."
	flutter build ipa \
	  --release \
	  --obfuscate \
	  --split-debug-info=build/app/outputs/symbols
	@echo "iOS archive created successfully."

# Reset: Clean build, get dependencies, and run build_runner
reset:
	@echo "Cleaning build directories..."
	flutter clean
	@echo "Getting dependencies..."
	flutter pub get
	@echo "Running build_runner..."
	dart run build_runner build -d
	@echo "Reset completed successfully."

# Watch: Run build_runner in watch mode
watch:
	@echo "Starting build_runner in watch mode..."
	dart run build_runner watch -d

# Build Android apk
build-apk:
	@echo "Building Android apk..."
	flutter build apk
	@echo "Android apk created successfully."
