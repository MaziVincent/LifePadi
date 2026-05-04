.PHONY: help \
        backend backend-run backend-watch backend-build backend-restore backend-test backend-migrate backend-add-migration \
        frontend frontend-install frontend-dev frontend-build frontend-preview frontend-lint frontend-test frontend-e2e \
        mobile mobile-run mobile-get mobile-clean mobile-reset mobile-build-apk mobile-build-appbundle mobile-build-ipa \
        install run clean

# ---------------------------------------------------------------------------
# LifePadi monorepo Makefile
#
# Quick references:
#   Backend  -> Web/Api          (.NET 8 Web API)
#   Frontend -> Web/LifePadiSPA  (Vite + React)
#   Mobile   -> Mobile/lifepadi  (Flutter)
# ---------------------------------------------------------------------------

# Project paths
BACKEND_DIR  := Web/Api
FRONTEND_DIR := Web/LifePadiSPA
MOBILE_DIR   := Mobile/lifepadi

# Tools (override on the command line, e.g. `make frontend-dev PKG=pnpm`)
PKG     ?= npm
DOTNET  ?= dotnet
FLUTTER ?= flutter

# Default target
all: help

help:
	@echo "LifePadi - available make targets"
	@echo ""
	@echo "  Top-level"
	@echo "    make install              Install dependencies for all projects"
	@echo "    make run                  Reminder of how to run each project"
	@echo "    make clean                Clean all build outputs"
	@echo ""
	@echo "  Backend (Web/Api)"
	@echo "    make backend              Alias for backend-run"
	@echo "    make backend-run          dotnet run"
	@echo "    make backend-watch        dotnet watch run (hot reload)"
	@echo "    make backend-restore      dotnet restore"
	@echo "    make backend-build        dotnet build"
	@echo "    make backend-test         dotnet test"
	@echo "    make backend-migrate      Apply latest EF Core migrations"
	@echo "    make backend-add-migration NAME=<name>  Add a new EF migration"
	@echo ""
	@echo "  Frontend (Web/LifePadiSPA)"
	@echo "    make frontend             Alias for frontend-dev"
	@echo "    make frontend-install     Install npm dependencies"
	@echo "    make frontend-dev         Start Vite dev server"
	@echo "    make frontend-build       Type-check and build for production"
	@echo "    make frontend-preview     Preview the production build"
	@echo "    make frontend-lint        Run ESLint"
	@echo "    make frontend-test        Run unit tests"
	@echo "    make frontend-e2e         Run Playwright e2e tests"
	@echo ""
	@echo "  Mobile (Mobile/lifepadi)"
	@echo "    make mobile               Alias for mobile-run"
	@echo "    make mobile-get           flutter pub get"
	@echo "    make mobile-run           flutter run"
	@echo "    make mobile-clean         flutter clean"
	@echo "    make mobile-reset         clean + pub get + build_runner"
	@echo "    make mobile-build-apk     Build release APK"
	@echo "    make mobile-build-appbundle  Build Android app bundle"
	@echo "    make mobile-build-ipa     Build iOS archive"

# ---------------------------------------------------------------------------
# Backend (.NET API)
# ---------------------------------------------------------------------------
backend: backend-run

backend-restore:
	cd $(BACKEND_DIR) && $(DOTNET) restore

backend-build:
	cd $(BACKEND_DIR) && $(DOTNET) build

backend-run:
	cd $(BACKEND_DIR) && ASPNETCORE_ENVIRONMENT=Development $(DOTNET) run

backend-watch:
	cd $(BACKEND_DIR) && ASPNETCORE_ENVIRONMENT=Development $(DOTNET) watch run

backend-test:
	cd $(BACKEND_DIR) && $(DOTNET) test

backend-migrate:
	cd $(BACKEND_DIR) && ASPNETCORE_ENVIRONMENT=Development $(DOTNET) ef database update

backend-add-migration:
	@if [ -z "$(NAME)" ]; then \
		echo "Usage: make backend-add-migration NAME=<MigrationName>"; \
		exit 1; \
	fi
	cd $(BACKEND_DIR) && ASPNETCORE_ENVIRONMENT=Development $(DOTNET) ef migrations add $(NAME)

# ---------------------------------------------------------------------------
# Frontend (Vite SPA)
# ---------------------------------------------------------------------------
frontend: frontend-dev

frontend-install:
	cd $(FRONTEND_DIR) && $(PKG) install

frontend-dev:
	cd $(FRONTEND_DIR) && $(PKG) run dev

frontend-build:
	cd $(FRONTEND_DIR) && $(PKG) run build

frontend-preview:
	cd $(FRONTEND_DIR) && $(PKG) run preview

frontend-lint:
	cd $(FRONTEND_DIR) && $(PKG) run lint

frontend-test:
	cd $(FRONTEND_DIR) && $(PKG) run test

frontend-e2e:
	cd $(FRONTEND_DIR) && $(PKG) run e2e

# ---------------------------------------------------------------------------
# Mobile (Flutter)
# ---------------------------------------------------------------------------
mobile: mobile-run

mobile-get:
	cd $(MOBILE_DIR) && $(FLUTTER) pub get

mobile-run:
	cd $(MOBILE_DIR) && $(FLUTTER) run

mobile-clean:
	cd $(MOBILE_DIR) && $(FLUTTER) clean

mobile-reset:
	$(MAKE) -C $(MOBILE_DIR) reset

mobile-build-apk:
	$(MAKE) -C $(MOBILE_DIR) build-apk

mobile-build-appbundle:
	$(MAKE) -C $(MOBILE_DIR) build-appbundle

mobile-build-ipa:
	$(MAKE) -C $(MOBILE_DIR) build-ipa

# ---------------------------------------------------------------------------
# Aggregate helpers
# ---------------------------------------------------------------------------
install: backend-restore frontend-install mobile-get
	@echo "All dependencies installed."

run:
	@echo "Run each app in its own terminal:"
	@echo "  Terminal 1:  make backend-watch"
	@echo "  Terminal 2:  make frontend-dev"
	@echo "  Terminal 3:  make mobile-run"

clean:
	cd $(BACKEND_DIR) && $(DOTNET) clean || true
	cd $(FRONTEND_DIR) && rm -rf dist node_modules/.vite || true
	cd $(MOBILE_DIR) && $(FLUTTER) clean || true
	@echo "Clean complete."
