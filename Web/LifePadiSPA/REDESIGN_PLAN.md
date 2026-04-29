# LifePadi SPA Redesign Plan

> Full redesign of the LifePadi web app: migrate from **Material UI → shadcn/ui**, convert **JSX → TSX**, restructure routing/folders, refresh visuals while keeping the current green brand identity.

**Status legend:** `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked

---

## 0. Decisions locked in

- **UI library:** [shadcn/ui](https://ui.shadcn.com) on top of Tailwind CSS + Radix primitives (replaces MUI / `@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`, `@emotion/*`).
- **Icons:** [lucide-react](https://lucide.dev) (replaces `@mui/icons-material`).
- **Tables:** [TanStack Table v8](https://tanstack.com/table) styled with shadcn `<Table>` (replaces `@mui/x-data-grid`).
- **Forms:** `react-hook-form` (already in use) + `zod` for schema validation, wired through shadcn `<Form>`.
- **Routing:** keep `react-router-dom` v6, but split into route modules per role.
- **Language:** TypeScript (`.tsx` / `.ts`) across all source.
- **Brand:** keep the existing greens (`#9ec81d` primary action, `#609963` deep brand), expressed as shadcn CSS variables in `src/index.css`. Light + dark mode supported.
- **Build:** Vite (existing). Add path alias `@/*` → `src/*`.
- **Notifications:** consolidate on `sonner` (shadcn-recommended). Remove `react-toastify`; keep `react-hot-toast` only until migration completes, then drop.
- **Data fetching:** keep `react-query` v3 for now, plan optional bump to `@tanstack/react-query` v5 in a later phase.

---

## 1. Target folder structure

```
src/
├─ app/                     # route trees (was AppMainDomain / AppSubDomain)
│  ├─ providers.tsx         # QueryClient, Auth, Theme, Toaster
│  ├─ router.tsx            # createBrowserRouter / Routes
│  └─ routes/
│     ├─ public.tsx
│     ├─ auth.tsx
│     ├─ customer.tsx
│     ├─ shop.tsx
│     ├─ vendor.tsx
│     ├─ rider.tsx
│     └─ admin.tsx
├─ features/                # domain code grouped by feature
│  ├─ auth/                 # login, register, otp, forgot-password
│  ├─ home/                 # marketing pages
│  ├─ shop/                 # storefront, cart, checkout
│  ├─ customer/             # user dashboard, addresses, orders, gifts
│  ├─ vendor/
│  ├─ rider/
│  ├─ admin/
│  └─ logistics/
├─ components/
│  ├─ ui/                   # shadcn-generated primitives (button, dialog, …)
│  ├─ layout/               # AppShell, Sidebar, TopBar, Footer
│  ├─ data-table/           # generic TanStack table wrapper
│  └─ shared/               # cross-feature widgets (EmptyState, ErrorState, …)
├─ hooks/
├─ lib/                     # utils, axios client, formatters, cn()
├─ services/                # API client modules (1 per resource)
├─ context/                 # AuthProvider, CartProvider, ThemeProvider
├─ types/                   # shared TS types & DTOs
├─ assets/
├─ index.css
└─ main.tsx
```

Tests/e2e and stories can be added later under `src/__tests__` / `src/stories`.

---

## 2. Phased delivery

Each phase ends with a working app (no broken routes). MUI is removed only at the end of Phase 4.

### Phase 0 — Tooling & foundations

- [x] Add TypeScript: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`
- [x] Add `tsconfig.json` (`tsconfig.node.json` was added then removed in favor of a single config — see migration log)
- [x] Configure Vite path alias `@` → `src`
- [x] Update ESLint config for TS (`@typescript-eslint/*`)
- [x] Install shadcn deps: `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `lucide-react`, `@radix-ui/*` (pulled in by components)
- [x] Install `zod`, `sonner`, `@tanstack/react-table`
- [x] Run `npx shadcn@latest init` (style: `default`, base color: `neutral` — overridden with our brand greens via CSS vars)
- [x] Add `lib/utils.ts` (`cn` helper)
- [x] Define brand tokens in `index.css` (HSL CSS vars mapped to current greens)
- [ ] Strip `@fontsource/roboto` → switch to **Inter** (or keep Roboto but via CSS vars) _(deferred to Phase 4 cleanup; Inter is the Tailwind sans default, Roboto still bundled but unused by new components)_
- [x] Add `ThemeProvider` (light/dark, system) and `<Toaster />` (sonner) to providers _(uses `next-themes` directly)_
- [ ] Remove unused MUI-only `App.css` rules, keep working CSS until replaced _(deferred to Phase 4)_

**Exit criteria:** `npm run dev` boots, shadcn `<Button>` smoke test page renders, dark mode toggle works. ✅ verified via `/__ui` route.

---

### Phase 1 — Folder restructure & TS migration scaffold

- [x] Create new folders (`app/`, `components/ui`, `components/layout`, `components/shared`, `components/data-table`, `lib/`)
- [x] Move `main.jsx` → `main.tsx`, `App.jsx` → `app/router.tsx`
- [x] Split `AppMainDomain.jsx` into route modules under `app/routes/` (`public`, `auth`, `shop`, `customer`, `vendor`, `rider`, `admin`, `dev`)
- [x] Move `AppSubDomain.jsx` → `app/AppSubDomain.tsx`
- [x] Convert `context/AuthProvider`, `context/CartProvider` → `.tsx` with typed contexts
- [ ] Convert `hooks/*` → `.ts` / `.tsx` _(deferred — incremental, on-touch during Phase 3; `allowJs: true` keeps JS hooks compiling)_
- [ ] Convert `services/*` and `api/*` → `.ts` with typed responses _(deferred — same strategy)_
- [ ] Add shared types in `types/` (User, Order, Product, Vendor, Rider, etc.) _(deferred — added per-feature in Phase 3)_

**Exit criteria:** project compiles under TS strict-ish (`"strict": true` allowed for new files; legacy `.jsx` still works via `allowJs: true`). ✅ `npm run typecheck` clean, `npm run build` green.

---

### Phase 2 — Design system & shared components

Generate shadcn primitives and build app-level shared building blocks.

shadcn primitives to add (`npx shadcn@latest add <name>`):

- [x] button, badge, avatar, separator, skeleton, scroll-area
- [x] input, textarea, label, select, checkbox, radio-group, switch, slider
- [x] form (react-hook-form integration), command, popover, hover-card, tooltip
- [x] dialog, alert-dialog, sheet, drawer
- [x] dropdown-menu, navigation-menu, menubar, context-menu, tabs, accordion
- [x] table, pagination, breadcrumb, alert, toast (sonner already added), progress
- [x] card, calendar, sonner _(`date-picker` is composed from `popover` + `calendar` on demand)_

App-level shared components to build:

- [x] `components/layout/AppShell.tsx` (sidebar + topbar pattern — sidebar + topbar live inside AppShell)
- [x] `components/layout/PublicLayout.tsx` (Header + Footer for marketing)
- [x] `components/layout/AuthLayout.tsx`
- [x] `components/layout/Sidebar.tsx` _(integrated into AppShell.tsx — extract to its own file when a second consumer appears)_
- [x] `components/layout/TopBar.tsx` (search, theme toggle, user menu, notifications)
- [x] `components/layout/Footer.tsx`
- [x] `components/data-table/DataTable.tsx` (TanStack-based, drop-in replacement for MUI DataGrid)
- [ ] `components/data-table/columns.ts` helpers (sort, filter, row actions) _(deferred — added on first concrete table in Phase 3)_
- [x] `components/shared/EmptyState.tsx`
- [x] `components/shared/ErrorState.tsx`
- [x] `components/shared/PageHeader.tsx`
- [x] `components/shared/Loader.tsx` (replaces `<CircularProgress/>`)
- [x] `components/shared/ConfirmDialog.tsx` (wraps alert-dialog)
- [x] `components/shared/StatCard.tsx` (dashboard tiles)
- [ ] `components/shared/FormField.tsx` patterns _(superseded by shadcn `form.tsx` `FormField` / `FormItem` / `FormControl` / `FormMessage`)_
- [x] Brand `<Logo>` component

**Exit criteria:** Storybook-style "kitchen-sink" route at `/__ui` renders every primitive in light + dark mode. ✅ `/__ui` route registered (dev only) and verified to serve.

---

## Migration log

- **2026-04-29 — Phase 0/1/2 implemented.**
  - TypeScript scaffold added with `allowJs: true` to enable incremental migration; full hook/service/.jsx → .ts conversion deferred to Phase 3 (per-touch).
  - `tsconfig.node.json` (composite project reference) caused `TS6310` under `tsc --noEmit -b`; replaced with single `tsconfig.json` that includes `vite.config.ts` directly. `baseUrl` removed (TS 5+ resolves `paths` relative to tsconfig location).
  - Used `next-themes` for the theme provider (instead of a hand-rolled one) so shadcn's `sonner.tsx` wrapper drops in unchanged.
  - shadcn CLI rewrote `tailwind.config.js`; legacy MUI-era color aliases (`text`, `grayTxt`, `graybg`, `darkBg`, …) were preserved during the rewrite to keep existing `.jsx` markup styled until Phase 3 swaps it out.
  - Build/typecheck/dev all verified green; `/`, `/login`, `/__ui` all 200 in dev.

---

### Phase 3 — Surface migrations (per area)

> Each surface = (a) move files into `features/<area>/`, (b) convert `.jsx` → `.tsx`, (c) replace MUI components with shadcn equivalents, (d) replace MUI icons with lucide, (e) re-skin to new design.

#### 3.1 Public / marketing

- [x] `Layout` → `PublicLayout` (Header, Footer) _(now `Layout.tsx` re-using new `TopBar` + `Footer` shadcn shells; legacy `home/Header.jsx` + `home/Footer.jsx` deleted)_
- [ ] `Home` (LandingPageSlide, sections) _(MUI icons → lucide done; full visual refactor deferred — content untouched)_
- [ ] `About`
- [ ] `Contact`
- [ ] `Logistics`
- [ ] `Faq`
- [ ] `PrivacyPolicy`
- [ ] `TermsAndCondition`
- [x] `Page404` → `Page404.tsx` (shadcn Button + lucide)
- [x] `Unauthorized` → `Unauthorized.tsx` (shadcn Button + lucide)

#### 3.2 Auth

- [x] `Login` → `Login.tsx` (shadcn Form/Input/Button/Checkbox + zod + sonner + AuthLayout; tabs deferred — legacy single-form preserved)
- [x] `Register` → `Register.tsx` (shadcn Dialog + Form + zod, replaces MUI Modal/ClickAwayListener)
- [x] `UserLogin` → `UserLogin.tsx` (shadcn Dialog + dual-mode email/phone + zod)
- [x] `VerifyOTP`, `VerifyCode` → shadcn Dialog + new `OTPInput` shared component
- [x] `ChangePassword` → shadcn Dialog + Form + zod (password match validator)
- [x] `ForgotPassword` → AuthLayout page + Form + zod + reused VerifyOTP/ChangePassword dialogs

#### 3.3 Shop (customer storefront)

- [x] `ShopLayout` → `.tsx`, CartProvider wrap preserved
- [x] `Shop` (listing, search) → `.tsx`, MUI icons → lucide (`Heart`, `Star`, `Clock`)
- [x] `ShopHeader` → `.tsx`, MUI Badge → shadcn `Badge`, icons → lucide (`MapPin`, `ShoppingCart`, `User`)
- [x] `ShopFooter` → `.tsx` (no MUI, plain rename)
- [x] `Vendor` (vendor storefront page) → MUI icons swept (`Plus`/`Minus`/`Star`/`Clock`/`ArrowLeft`/`ThumbsUp`/`Bookmark`/`Trash2`/`Info`); MUI `Alert` import dropped (was unused)
- [x] `VendorByLocation` → mechanical icon swap to lucide
- [x] `ProductModal` → shadcn `<Dialog>` + lucide `Plus`/`Minus`
- [x] `EmptyCart` → shadcn `<Dialog>` driven by `state.empty`
- [x] `EmptyCartDesktop` → static sidebar (Modal import dropped)
- [x] `CheckOut` → shadcn `<Dialog>` + `Loader2` (replaces `CircularProgress`)
- [x] `AddAddressModal` → shadcn `<Dialog>` + `<Form>`/`<Input>`/`<Textarea>`/`<Select>` + `Loader2`
- [x] `NewAddressModal` → shadcn `<Dialog>` + Google Places suggestions list
- [x] `VendorChangeDialogue` → shadcn `<AlertDialog>`
- [x] `Cart` → shadcn `<Dialog>`; lucide icons (`Plus`/`Minus`/`Trash2`/`Info`/`ThumbsUp`/`Bookmark`/`X`); `react-hot-toast` removed; `.jsx` retained (props untyped, allowJs)
- [x] `PaymentResponse` → `.tsx`, typed payment status & error handler, removed dead imports
- [x] `CurrentLocation.jsx` deleted (was broken/unreferenced skeleton)
- [x] Verified `npx tsc --noEmit` clean + `npm run build` ✓ (3,382 kB main, gz 941 kB)

#### 3.4 Customer dashboard

- [x] `UserHeader` — replaced `@mui/base ClickAwayListener` with `useRef` + outside-`mousedown` listener; toast → `sonner`
- [x] `UserLayout` / `Aside` / `UserFooter` / `Gift` / `Favourite` — no MUI; left untouched (no migration needed)
- [x] `UserDashboard` — lucide icons (`Frown`, `ChevronLeft`, `AlertOctagon`, `Crosshair`, `Eye`, `History`, `Truck`, `Loader2`, `X`, `Check`); shadcn `<Alert>` + `<Pagination>` (manual page list); MUI `CircularProgress`/`Pagination`/`Alert`/`@mui/icons-material` removed
- [x] `Address` — `Loader2`, shadcn `<Alert>`; MUI Pagination already commented; `react-hot-toast` → `sonner`
- [x] `OrderDetails` — shadcn `<Breadcrumb>` + `<Alert>` + `Loader2` (12 MUI sites swept via perl)
- [x] `TrackOrder` — shadcn `<Breadcrumb>` + lucide `Frown` (replaces `SentimentVeryDissatisfiedIcon`)
- [x] `subcomponents/CancelOrder` — shadcn `<AlertDialog>` with destructive action; `react-hot-toast` → `sonner`; `Loader2` for pending state
- [x] Verified `npx tsc --noEmit` clean + `npm run build` ✓ (3,381.77 kB main, gz 940.93 kB)

#### 3.5 Vendor portal

- [x] `VendorLayout` — shadcn AppShell: fixed top bar + `<Sheet>` mobile drawer + desktop sidebar; `ThemeToggle` integration; lucide nav icons (`LayoutDashboard`, `Store`, `LogOut`, `Menu`); removed MUI AppBar/Drawer/Switch/local theme localStorage in favor of next-themes
- [x] `VendorDashboard` — shadcn `<Card>` stat tiles + lucide (`Package`, `CheckCircle2`, `PauseCircle`, `Plus`, `Loader2`); shadcn `<Alert>` error state; gradient hero card; FAB via Button
- [x] `VendorProducts` — shadcn `<Card>` grid + `<Skeleton>` + `<Badge>` status pills + `<Pagination>` + `<Input>` search with `Search` icon + `<Alert>` error; lucide `LayoutGrid`/`List`/`Plus`; mobile FAB; route fix `/vendor/products/:id` → `/vendor/product/:id` (matched route module)
- [x] `VendorViewProduct` — shadcn `<Breadcrumb>` + `<Card>` + `<Table>` recent reviews; custom lucide `<Star>` rating stars (replaces MUI `Rating`); `<Skeleton>` loading; `<Alert>` error; deleted unused `VendorViewProductNew.jsx` duplicate
- [x] `AddProductModal` — shadcn `<Dialog>` + `<Form>` primitives (`Input`/`Textarea`/`Select`/`Label`); lucide `ImagePlus`/`Loader2`; `sonner` for success/error; removed bespoke MUI dark-mode `fieldSx` (Tailwind dark: classes via next-themes)
- [x] `UpdateProductModal` — shadcn `<Dialog>` + form primitives + `<Badge>` preview + `<Select>`; manual zod-light validation w/ inline error text; `Save`/`X`/`Loader2`; `sonner`
- [x] `VendorActions` — shadcn `<DropdownMenu>` row actions with lucide (`MoreVertical`, `Eye`, `Pencil`, `Trash2`, `ToggleLeft`, `ToggleRight`); destructive Delete styled
- [x] `VendorModals` — slimmed to actually-used exports (`ViewModal`, `DeleteModal`, `ToggleStatusModal`); `<Dialog>` for view, `<AlertDialog>` for confirms; removed dead legacy `UpdateModal`/`DeleteProductModal`/`addProductStyle`/Modal variants (~250 LOC dropped)
- [x] Verified `npx tsc --noEmit` clean + `npm run build` ✓ (3,315.10 kB main, gz 924.77 kB — **−66 kB / −16 kB gz vs Phase 3.4**)

#### 3.6 Rider portal

- [x] `RiderLayout` — shadcn AppShell: top bar + `<Sheet>` mobile drawer + desktop sidebar; `ThemeToggle`; lucide `LayoutDashboard`/`LogOut`/`Menu`/`Bike`; SideNav merged into layout (`SideNav.jsx` deleted as redundant); MUI `ClickAwayListener` removed
- [x] `RiderDashboard` — shadcn `<Card>` stat tiles + `<Table>` deliveries grid + `<Pagination>` + `<Input>` debounced search + `<Skeleton>` rows + `<Alert>` errors + lucide icons (`Package`, `CheckCircle2`, `Clock`, `ShieldCheck`, `ShieldAlert`, `Search`); replaced MUI `Chip`/`CircularProgress`/`Alert`/`Button` with `Badge`/`Loader2`/shadcn equivalents; gradient hero card
- [x] `ViewDelivery` — shadcn `<Breadcrumb>` + `<Card>` triple-column layout + `<Skeleton>` loaders + `<Alert>` errors + `<Separator>`; custom `StatusBadge`/`DeliveredBadge` replacing MUI `Chip`; lucide `ArrowLeft`/`Package`; preserved currency/address helpers
- [x] `RiderModal` — slimmed to single `UpdateModal` confirm dialog using `<AlertDialog>`; `sonner` toasts; React Query invalidation for `riderDeliveries`/`pendingDeliveriesCount`/`successfulDeliveriesCount`; removed unused `ViewModal` (~180 LOC of dead MUI Modal/table dropped — internal `riderDeliveriesLoading`/`FadeMenu` refs were broken)
- [x] `FadeMenu` → shadcn `<DropdownMenu>` with lucide `MoreVertical`/`Eye`/`CheckCircle2`; uses `useNavigate` instead of inline `<Link>` + `Fade`/`Menu`/`MenuItem`
- [x] Verified `npm run build` ✓ (3,310.25 kB main, gz 922.68 kB — **−4.85 kB / −2.09 kB gz vs Phase 3.5**)

#### 3.7 Admin portal

##### 3.7a Shell + shared subcomponents (shipped)

- [x] `AdminLayout` — slim shadcn shell, hosts header/sidebar/footer with proper md offset
- [x] `AdminHeader` — `<Button>` triggers + `ThemeToggle` + `sonner` logout toast; lucide `Menu`/`X`/`LogOut`; replaced `ClickAwayListener` (mobile toggle uses Aside backdrop instead)
- [x] `Aside` — fixed sidebar w/ mobile backdrop (replaces `ClickAwayListener`); `NavLink` active styling via `cn`; lucide nav icons (`LayoutDashboard`, `Settings`, `ListOrdered`, `Store`, `Bike`, `Users`, `ShieldCheck`, `Ticket`)
- [x] `AdminFooter` — minimal shadcn-friendly fixed footer
- [x] `subcomponents/ActionsMenu` → shadcn `<DropdownMenu>` + lucide (`MoreHorizontal`, `Eye`, `Pencil`)
- [x] `subcomponents/DeleteDialogue` → `<AlertDialog>` + `sonner` + Loader2; preserved `useDelete` + queryClient invalidation
- [x] `subcomponents/ActivateDialogue` → `<AlertDialog>` (emerald action); `sonner`
- [x] `subcomponents/DeActivateDialogue` → `<AlertDialog>` (destructive action); `sonner`
- [x] `subcomponents/UploadImageModal` → `<Dialog>` + `<Input type=file>` + `<Alert>` errors; lucide `Upload`/`Loader2`; `sonner`; preserved 200kb client-side validation
- [x] `subcomponents/AssignRider` → `<Dialog>` + react-hook-form `Controller` driving shadcn `<Select>`; lucide `UserCheck`/`Loader2`; `sonner`
- [x] `subcomponents/AdminPasswordChange` → `<Dialog>` + shadcn `<Input>`/`<Label>`/`<Alert>`; lucide `Eye`/`EyeOff`/`Loader2`; `sonner`; same `password-reset` PUT contract
- [x] `subcomponents/CustomTabPanel` — MUI `Box` removed, plain div with padding (will be retired entirely once consumers move to shadcn `<Tabs>`)
- [x] `subcomponents/SubmitButton` — already MUI-free, left as-is
- [x] **Migrated all admin shell + subcomponent files from `.jsx` to `.tsx`** with proper TypeScript types/interfaces (props, form values, dispatch actions, reducer state)
- [x] Verified `npm run build` ✓ (3,282.27 kB main, gz 914.77 kB — **−27.98 kB / −7.91 kB gz vs Phase 3.6**)

##### 3.7b Section pages (in progress)

- [x] `OverView` (dashboard) — 12-tile shadcn `<Card>` stat grid driven by `STAT_TILES` config; shadcn `<Table>` for recent orders w/ `<Badge>` status pills; shadcn `<Pagination>`; `<Input>` + lucide `Search`; `<Skeleton>`/`Loader2`/`<Alert>` loading & error states; dropped dead "filter brand" placeholder UI (~150 LOC). Migrated to `.tsx` w/ typed reducer (`OverviewState`/`OverviewAction`). Verified `npm run build` ✓ (3,271.40 kB / gz 914.21 kB — **−10.87 kB / −0.56 kB gz** vs 3.7a)
- [x] `services/`: shipped as `.tsx`
  - `AdminService.tsx` (330 → 268 LOC) — shadcn `<Card>`+`<Table>`+`<Pagination>`+`<Input>`+`<Badge>` for status; lucide `Plus`/`Search`/`Pencil`/`Trash2`/`Loader2`; typed reducer (`ServiceState`/`ServiceAction`); replaces MUI `CircularProgress`/`Pagination`/`Alert`/`Toaster`
  - `CreateServiceModal.tsx` (225 → 159 LOC) — shadcn `<Dialog>`+`<Input>`+`<Textarea>`+`<Alert>`; 50kb file validation; `sonner`; lucide `Plus`/`Loader2`; typed `CreateServiceFormValues`
  - `EditServiceModal.tsx` (283 → 215 LOC) — shadcn `<Dialog>` + react-hook-form `Controller` driving shadcn `<Select>` for status; two-step PUT (uploadImg then update) preserved; lucide `Save`/`Loader2`; typed `EditServiceFormValues` and exported `ServiceRow`
  - `AdminServiceDetails.tsx` (154 → 167 LOC) — shadcn `<Breadcrumb>` (replaces MUI), `<Card>` triple-column, `<Table>` for vendors (replaces MUI `DataGrid`); `<Loader2>`/`<Alert>` states
  - Verified `npx tsc --noEmit` clean + `npm run build` ✓ (3,255.38 kB / gz 913.46 kB — **−8.69 kB / −0.99 kB gz vs 3.7c**)
- [x] `categories/`: shipped as `.tsx`
  - `AdminCategory.tsx` (305 → 264 LOC) — shadcn `<Card>`+`<Table>`+`<Pagination>`+`<Input>` w/ lucide `Plus`/`Search`/`Pencil`/`Trash2`; typed reducer (`CategoryState`/`CategoryAction`); dropped MUI `CircularProgress`/`Pagination`/`Alert` and dead actions dropdown placeholder
  - `CreateCategoryModal.tsx` (229 → 165 LOC) — shadcn `<Dialog>`+`<Input>`+`<Textarea>`+`<Alert>` for 50kb file-error; `sonner`; lucide `Plus`/`Loader2`; typed `CreateCategoryFormValues`
  - `EditCategoryModal.tsx` (239 → 175 LOC) — shadcn `<Dialog>` + `setValue` prefill via `useEffect`; optional Icon upload; lucide `Save`/`Loader2`; `sonner`; typed `EditCategoryFormValues`
  - `AdminCategoryDetail.tsx` (153 → 168 LOC) — shadcn `<Breadcrumb>` (replaces MUI), `<Card>` triple-column, `<Table>` for products with `<Badge>` status (replaces MUI `DataGrid`); `<Loader2>`/`<Alert>` states
  - Verified `npx tsc --noEmit` clean + `npm run build` ✓ (3,264.07 kB / gz 914.45 kB — **−7.36 kB main vs 3.7b**)
- [x] `riders/`: shipped as `.tsx`
  - `AdminRider.tsx` (427 → 320 LOC) — shadcn `<Card>`+`<Table>`+`<Pagination>`+`<Input>`+`<Badge>` for status/verification; lucide `Plus`/`Search`/`Pencil`/`Trash2`/`ShieldCheck`/`ShieldX`/`Loader2`; typed reducer (`RiderState`/`RiderAction`); replaces MUI `CircularProgress`/`Pagination`/`Alert`/`Toaster` and inline SVGs
  - `RiderFormFields.tsx` (277 → 197 LOC) — shadcn `<Input>`/`<Textarea>`/`<Label>`/`<Alert>` + native `<select>` styled like shadcn for IdentityType (registered directly, no external state); lucide `X` for clear-file; replaces MUI `TextField`/`Grid`/`MenuItem`/`Box`/`IconButton`/`PropTypes`; sectioned (personal / account / identity)
  - `CreateRiderModal.tsx` (195 → 148 LOC) — shadcn `<Dialog>` (max-w-3xl, scrollable) with `<Separator>` between sections; renders all sections at once instead of MUI `Stepper` (simpler UX, no `Step`/`StepLabel`/`Collapse`/`LinearProgress`); `sonner`; lucide `Plus`/`Loader2`
  - `EditRiderModal.tsx` (133 → 158 LOC) — shadcn `<Dialog>` + `<Separator>`; `useEffect` setValue prefill; preserved `update("rider/update/${id}")` contract; `sonner`; lucide `Save`/`Loader2`; exports `RiderRow` interface for reuse
  - `AdminRiderDetails.tsx` (218 → 226 LOC) — shadcn `<Breadcrumb>`+`<Card>`+`<Badge>`+`<Table>` (replaces MUI `DataGrid`/`Breadcrumbs`/`Button`); lucide `KeyRound`/`ImageIcon`/`Loader2`; PasswordChangeModal preserved
  - Verified `npx tsc --noEmit` clean + `npm run build` ✓ (3,214.21 kB / gz 903.24 kB — **−41.17 kB / −10.22 kB gz vs 3.7d**)
- [x] `users/`: `AdminCustomer`, `AdminCustomerDetails` — typed reducer, shadcn Card/Table/Pagination/Input/Badge, lucide icons, Breadcrumb on details page; tsc clean.
- [x] `vendors/`: `AdminVendorCategory(+Details)`, `AdminVendorDetails`, `Create/EditVendorModal`, `Create/EditVendorCategoryModal`, `product/AdminProduct`, `product/Create/EditProductModal` — dropped MUI Tabs in favor of stacked sections + `<Separator>` headers; native styled `<select>` for service/state/LGA/category; Promise.all fetch on AdminVendorDetails; PasswordChangeModal integration. Verified build ✓ (2,588.90 kB / gz 745.51 kB — **−625.31 kB / −157.73 kB gz vs 3.7e**)
- [x] `vouchers/`: `AdminVoucher`, `CreateVoucher` — typed reducer, shadcn Dialog/Input/Textarea, mutually exclusive percent/amount validation. Bundled with admins+orders below.
- [x] `admins/`: `Admin`, `Create/EditAdminModal` — typed `AdminListResp`, shadcn Pagination, ShieldCheck/ShieldX/KeyRound/Pencil/Trash2 row actions, AdminPasswordChange integration; CreateAdminModal stacks Personal/Login sections via `<Separator>`; EditAdminModal targets `${baseUrl}admin/update/${id}`.
- [x] `orders/`: `AdminOrderDetails`, `OrderStatusModal` — Breadcrumb (Dashboard → Order Details), 4 parallel `useQuery` (order/delivery/transaction/logistics), shadcn Card/Table/Badge/Alert; OrderStatusModal native styled `<select>` w/ Pending/Ongoing/Completed; AssignRider preserved. Verified `npx tsc --noEmit` clean + `npm run build` ✓ (2,492.28 kB / gz 724.57 kB — **−721.93 kB / −178.67 kB gz vs 3.7e**)

#### 3.8 Logistics

- [x] `TryLogistics` — shadcn `<Card>` chooser w/ lucide `PackageCheck`/`PackageOpen`, typed reducer, gated by `useAuth` `setLogin` for unauthenticated users.
- [x] `SendPackage`, `RecievePackage` — collapsed ~1,800 LOC of duplicated MUI `<Modal>` + `<ClickAwayListener>` into a single shared `PackageDialog.tsx` (shadcn `<Dialog>`) with a `kind: "send" | "recieve"` prop; both exported names kept for back-compat with existing imports. Address autocomplete (Google Places), `useDeliveryFee`, `useDistanceCalculator`, `useAddressFromPlaceId` preserved; MUI `Chip`/`Stack` → shadcn `<Badge>` flex-wrap; native location button → lucide `MapPin`.
- [x] `ChooseAddressModal` — radio list rebuilt as bordered shadcn rows with `accent-primary`; `<Loader2>` spinner, empty-state via `<Label>`.

#### 3.9 Subdomain app shell

- [x] `AppSubDomain` rebuild — replaced placeholder with branded shadcn `<Card>` landing page for `app.lifepadi.com` (Play Store / App Store CTAs + back-link to main domain), lucide `Smartphone`/`ArrowLeft`.

---

### Phase 4 — Cleanup & cutover

- [x] Verify zero `@mui/*` and `@emotion/*` imports remain (`grep` check) — clean.
- [x] Remove from `package.json`: `@mui/material`, `@mui/icons-material`, `@mui/x-data-grid`, `@emotion/react`, `@emotion/styled`, `@fontsource/roboto`, `react-toastify`, `react-hot-toast` — `npm uninstall` clean.
- [x] Remove unused legacy CSS — deleted `src/assets/css/` (only commented-out imports in dead `home/Prof.jsx` referenced them).
- [x] Drop `@fontsource/roboto/*.css` imports from `src/main.tsx`.
- [x] `vercel.json` audited — no migration-related changes needed (rewrites + .well-known headers preserved).
- [x] Run full typecheck + production build — `npx tsc --noEmit` clean, `npm run build` ✓ **2,284.90 kB / gz 674.33 kB** (CSS 84.13 kB / gz 16.58 kB), **−207.38 kB main / −50.24 kB gz** vs end of 3.7j.
- [ ] Manual QA pass on each role: public, login, customer flow, vendor flow, rider flow, admin flow — _deferred to staging_.
- [ ] Lighthouse pass (perf, a11y, best-practices) — _deferred to staging_.
- [ ] Update `README.md` with new structure & shadcn workflow — _deferred (low priority, no migration impact)_.

---

### Phase 5 — Stretch (post-launch)

- [x] Bump `react-query` v3 → `@tanstack/react-query` v5 — bulk migration: 58 import sites rewritten, 21 positional `useMutation(fn, opts)` calls converted to single-object `useMutation({ mutationFn: fn, ...opts })`, 32 `keepPreviousData: true` shorthand replaced with `placeholderData: keepPreviousData` (named import added), all `queryClient.invalidateQueries(string|template|array)` rewritten to `{ queryKey: [...] }` form, mutation `isLoading` → `isPending` (with destructure aliases preserving call sites), one residual `useQuery({ onSuccess })` in `Shop.tsx` migrated to `useEffect(() => …, [isSuccess, data])`. `QueryClient` defaults set: `staleTime: 30s`, `gcTime: 5m`, `retry: 1`, `refetchOnWindowFocus: false`. Build verified ✓ **2,286.79 kB / gz ~676 kB** (+1.67 kB gz vs 5a, expected for v5 + devtools).
- [x] Add `@tanstack/react-query-devtools` — wired in `app/providers.tsx`, dev-only via `import.meta.env.DEV`, button bottom-left, `initialIsOpen={false}`.
- [x] Add Vitest + React Testing Library — `vitest`, `@vitest/ui`, `jsdom`, `@testing-library/{react,jest-dom,user-event}`. `vite.config.ts` extended with `test.{globals,environment:"jsdom",setupFiles}`, `tsconfig.json` types extended with `vitest/globals` + `@testing-library/jest-dom`, setup file at `src/test/setup.ts` (cleanup + jest-dom matchers). Smoke tests for `Button` (4 cases) and `Badge` (3 cases) — **7/7 passing**. Scripts: `npm test`, `npm run test:watch`, `npm run test:ui`.
- [x] Add Ladle (lighter Storybook alternative) for `components/ui/` — `.ladle/components.tsx` provider wires `index.css` + `next-themes`, `.ladle/config.mjs` sets `outDir: "ladle-dist"` (gitignored), stories for `Button` (Default/Variants/Sizes/Disabled), `Badge` (Default/Variants), `Card` (Default), `Input` (Default/Disabled/Invalid). Build verified ✓ in 2.03s. Scripts: `npm run ladle`, `npm run ladle:build`.
- [x] Add Playwright e2e scaffold — `@playwright/test` installed, `playwright.config.ts` with chromium project + auto-spawned `npm run dev` web server on port 5173 (overridable via `PLAYWRIGHT_BASE_URL` for staging), separate `tsconfig.e2e.json` to isolate Playwright globals from Vitest globals, smoke `e2e/home.spec.ts` (title check + console-error check). `e2e/` excluded from main `tsconfig.json`. Scripts: `npm run e2e`, `npm run e2e:ui`, `npm run e2e:install`.
- [x] Replace `axios` global instance with typed API client — `src/api/axios.ts` (`AxiosInstance` typed default + named `axiosPrivate`) and `src/api/baseUrl.ts` (`baseUrl: string`); legacy `.js` versions deleted. Existing `useAxiosPrivate` interceptor wiring preserved.
- [ ] PWA / offline support for shop — _explicitly deferred per user request_.
- [ ] i18n (`react-i18next`) if needed for NG/Diaspora markets — _explicitly deferred per user request_.

---

## 3. Component mapping cheat-sheet

| Material UI                   | shadcn replacement                                                              |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `Button`                      | `Button`                                                                        |
| `IconButton`                  | `Button variant="ghost" size="icon"`                                            |
| `Modal` / `Dialog`            | `Dialog` (or `Sheet` / `Drawer` for side panels)                                |
| `Dialog` (alert)              | `AlertDialog`                                                                   |
| `Snackbar` / `Alert`          | `sonner` toast / `Alert`                                                        |
| `CircularProgress`            | `<Loader />` (custom) or `Skeleton`                                             |
| `Pagination`                  | `Pagination` (shadcn)                                                           |
| `Breadcrumbs`                 | `Breadcrumb`                                                                    |
| `Chip`                        | `Badge`                                                                         |
| `Tabs` / `Tab`                | `Tabs`                                                                          |
| `Menu` / `MenuItem`           | `DropdownMenu`                                                                  |
| `Tooltip`                     | `Tooltip`                                                                       |
| `TextField`                   | `Input` + `Label` (+ `Form*` from shadcn)                                       |
| `Select`                      | `Select`                                                                        |
| `Checkbox`                    | `Checkbox`                                                                      |
| `Switch`                      | `Switch`                                                                        |
| `Radio`                       | `RadioGroup`                                                                    |
| `Autocomplete`                | `Command` + `Popover` (combobox pattern)                                        |
| `Stack` / `Box`               | plain `<div>` + Tailwind                                                        |
| `Typography`                  | semantic tags + Tailwind utility classes                                        |
| `ClickAwayListener`           | Radix handles outside-click via `Popover`/`Dialog`; otherwise small custom hook |
| `@mui/x-data-grid` `DataGrid` | TanStack Table + shadcn `Table` (`components/data-table`)                       |
| `@mui/material/colors`        | Tailwind color tokens via CSS vars                                              |
| `@mui/icons-material`         | `lucide-react`                                                                  |

---

## 4. Brand tokens (shadcn CSS vars)

Will be set in `src/index.css`:

- `--primary` ≈ `#9ec81d` (lime-green — CTA)
- `--primary-foreground` ≈ near-black for legibility on lime
- `--brand` (custom) ≈ `#609963` (deep brand)
- `--secondary`, `--accent`, `--muted`, `--destructive`, `--ring` derived from neutrals
- Dark variants: shifted lightness, primary remains the lime accent

Tailwind config will be rewritten to consume these via `hsl(var(--…))` instead of the current static color map. Existing class names (`bg-primary`, `text-secondary`, etc.) will be re-pointed so legacy markup still styles correctly during the migration.

---

## 5. Tracking

- One PR per phase (or per surface in Phase 3) keeps reviews tractable.
- Update this file: tick `[ ] → [x]` as items land. Add notes inline when scope changes.
- Keep a short "Migration log" at the bottom for any decisions worth remembering.

### Migration log

- _date · note_

---

## Phase 6 — Marketing redesign + dark-mode polish

- [x] Dark-mode token sweep across ~20 customer/shop/admin/shared `.jsx` files: `darkBg`/`darkMenu`/`darkHover`/`darkSecondaryText` legacy aliases replaced with shadcn semantic tokens (`bg-background`, `bg-card`, `bg-muted`, `text-muted-foreground`, `border-border`, etc.). Verified `grep -rn "darkBg\|darkMenu\|darkHover\|darkSecondaryText" src` → 0 hits.
- [x] New shared `components/shared/FadeIn.tsx` (typed framer-motion scroll-reveal with `direction="up|down|left|right"`, configurable delay, `once` toggle).
- [x] **Landing redesign** — `components/home/Home.tsx` rewritten with bold marketing layout: gradient hero with rotating word animation, AnimatePresence transitions, Lottie hero, trusted-by Marquee, services grid, role cards (Vendor/Rider/Build), testimonials grid with Star/Quote, gradient CTA section with App Store/Play Store badges + iPhone mock.
- [x] **About redesign** — `components/home/About.tsx` rewritten: gradient hero, stats strip (50K+/1.2K+/30 min/99.5%), values cards (Mission/Values/Why), 4-up team grid with social links, core-values marquee.
- [x] **Contact redesign** — `components/home/Contact.tsx` rewritten with shadcn `Form`/`Input`/`Textarea`/`Label`/`Card` primitives, contact info cards (Email/Phone/Address), expandable account-deletion section with `Trash2`/`ChevronDown` collapse, loading state via `Loader2`.
- [x] **Logistics redesign** — `components/home/Logistics.tsx` rewritten: gradient hero, perks strip (same-day/insured/live tracking), numbered 5-step "How it works" grid (replaces Swiper carousel), banner image, gradient CTA with app store badges.
- [x] Removed legacy duplicates: `components/home/{Home,About,Contact,Logistics,FadeIn}.jsx`.
- [x] **Shop migrations** — `components/shop/{Cart,Vendor,VendorByLocation}.jsx` → `.tsx` (with `// @ts-nocheck` header to defer per-line typing). Compatible with `allowJs:true` tsconfig; 0 import-path breakages (extension-less imports auto-resolve).
- [x] Deleted stale `components/admin/OverView.jsx` (resolved `react-query` build error — was a duplicate of the migrated `.tsx`).
- [x] Verified `npx tsc --noEmit` clean.
- [x] Verified `npm run build` ✓ — main bundle **2,090.00 kB / gz 622.71 kB** vs prior baseline **2,286.79 kB / gz ~676 kB** = **−196.79 kB / −53 kB gz** (lighter despite redesign — savings from removing duplicated `.jsx` modules + tree-shaken Swiper code paths).
- [x] Verified `npx vitest run` ✓ — 7/7 tests passing.

### Deferred (low-risk, incremental work for future PRs)

- Per-line typing of the three shop `.tsx` files currently behind `@ts-nocheck` (Cart 513 LOC, Vendor 940 LOC, VendorByLocation 539 LOC). Recommend splitting Vendor into `Vendor.tsx` + `VendorProducts.tsx` + `ProductCategoryTabs.tsx` during typing.
- Convert `Cart.tsx` UI to a shadcn `Sheet` (slide-in) for mobile while preserving desktop side-by-side layout.
- Optional code-splitting via `React.lazy` for the `/shop/*` route group (the build still warns at >500 kB chunks).
- Code-shift the `Heroanimation4.json` Lottie asset (~lazy-loaded via `<Suspense>`) to slim the landing entry chunk further.

