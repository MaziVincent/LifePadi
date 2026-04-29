import { useEffect, useMemo, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
	Heart,
	Star,
	Clock,
	Search,
	MapPin,
	Sparkles,
	Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import baseUrl from "@/api/baseUrl";
import CategorySkeleton from "@/components/shared/CategorySkeleton";
import VendorSkeleton from "@/components/shared/VendorSkeleton";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Vendor {
	Id: string | number;
	Name: string;
	Tag?: string;
	VendorImgUrl?: string;
	ContactAddress?: string;
}

interface VendorCategory {
	Id: string | number;
	Name: string;
	IconUrl?: string;
	Vendors: Vendor[];
}

interface VendorListResponse {
	result?: Vendor[];
	dataList?: { HasNext?: boolean };
}

interface CategoriesResponse {
	result?: VendorCategory[];
}

const Shop = () => {
	const url = `${baseUrl}vendor`;
	const fetcher = useFetch();
	const { auth } = useAuth();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [activeCategoryId, setActiveCategoryId] = useState<
		string | number | null
	>(null);
	const [vendors, setVendors] = useState<Vendor[]>([]);

	// Debounce search input → query
	useEffect(() => {
		const t = setTimeout(() => {
			setSearch(searchInput);
			setPage(1);
			setVendors([]);
		}, 350);
		return () => clearTimeout(t);
	}, [searchInput]);

	/* ---------------- Vendors ---------------- */

	const {
		data: vendorsData,
		isLoading: vendorsLoading,
		isSuccess: vendorsSuccess,
		isFetching: vendorsFetching,
	} = useQuery<VendorListResponse>({
		queryKey: ["vendors", page, search],
		queryFn: async () => {
			const response = (await fetcher(
				`${url}/all?PageNumber=${page}&SearchString=${search}&PageSize=6`,
				auth?.accessToken,
			)) as { data?: VendorListResponse };
			return response.data ?? {};
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	useEffect(() => {
		if (vendorsSuccess && vendorsData?.result) {
			setVendors((prev) => {
				const merged = [...prev];
				for (const v of vendorsData.result ?? []) {
					if (!merged.find((m) => m.Id === v.Id)) merged.push(v);
				}
				return merged;
			});
		}
	}, [vendorsSuccess, vendorsData]);

	/* ---------------- Categories (cached, dedup'd) ---------------- */

	const {
		data: categoriesData,
		isLoading: categoriesLoading,
		isError: categoriesError,
	} = useQuery<CategoriesResponse>({
		queryKey: ["vendor-categories"],
		queryFn: async () => {
			const response = (await fetcher(`${baseUrl}vendorcategory/all`)) as {
				data?: CategoriesResponse;
			};
			return response.data ?? {};
		},
		// 5 min stale + global retry-on-429 in providers handles rate limits.
		staleTime: 5 * 60_000,
	});

	const categories = categoriesData?.result ?? [];

	const visibleVendors = useMemo(() => {
		if (!activeCategoryId) return vendors;
		const cat = categories.find((c) => c.Id === activeCategoryId);
		if (!cat) return vendors;
		const ids = new Set(cat.Vendors.map((v) => v.Id));
		return vendors.filter((v) => ids.has(v.Id));
	}, [vendors, activeCategoryId, categories]);

	const loadMore = () => {
		if (vendorsData?.dataList?.HasNext) setPage((p) => p + 1);
	};

	const locationAddress =
		(auth as unknown as { location?: { address?: string } })?.location
			?.address;

	return (
		<div className="bg-background text-foreground">
			{/* HERO */}
			<section className="relative overflow-hidden border-b">
				<div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-accent/10 dark:from-primary/10 dark:to-accent/5" />
				<div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
					<Badge variant="secondary" className="mb-3 gap-1.5 rounded-full">
						<Sparkles className="h-3.5 w-3.5" />
						Order with LifePadi
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Find <span className="text-primary">vendors</span> near you
					</h1>
					<p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
						Restaurants, supermarkets and more — delivered fast.
					</p>

					<div className="mt-6 flex w-full max-w-2xl items-center gap-2">
						<div className="relative flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								placeholder="Search vendors, restaurants…"
								className="h-11 pl-9"
							/>
						</div>
						{locationAddress && (
							<div className="hidden items-center gap-1.5 rounded-md border bg-card px-3 py-2 text-xs text-muted-foreground md:flex">
								<MapPin className="h-3.5 w-3.5 text-primary" />
								<span className="max-w-[180px] truncate">
									{locationAddress}
								</span>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* CATEGORIES */}
			<section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
				<div className="mb-4 flex items-end justify-between">
					<h2 className="text-xl font-semibold sm:text-2xl">
						Explore Categories
					</h2>
					{activeCategoryId && (
						<button
							type="button"
							onClick={() => setActiveCategoryId(null)}
							className="text-sm text-primary hover:underline">
							Clear filter
						</button>
					)}
				</div>

				{categoriesLoading && (
					<div className="flex w-full items-center gap-4 overflow-x-auto">
						<CategorySkeleton />
						<CategorySkeleton />
						<CategorySkeleton />
					</div>
				)}

				{categoriesError && (
					<p className="text-sm text-destructive">
						Failed to load categories. Please refresh.
					</p>
				)}

				{!categoriesLoading && categories.length > 0 && (
					<div className="-mx-1 flex w-full snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-1 pb-3">
						{categories.map((category) => {
							const isActive = activeCategoryId === category.Id;
							return (
								<button
									type="button"
									key={category.Id}
									onClick={() =>
										setActiveCategoryId(isActive ? null : category.Id)
									}
									className={`group flex min-w-[120px] snap-start flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition ${
										isActive
											? "border-primary bg-primary/10 shadow-sm"
											: "border-border bg-card hover:border-primary/40 hover:bg-accent/40"
									}`}>
									<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 p-2 transition group-hover:scale-105">
										<img
											src={category.IconUrl}
											className="max-h-full max-w-full object-contain"
											alt=""
											loading="lazy"
										/>
									</div>
									<span className="text-sm font-medium leading-tight">
										{category.Name}
									</span>
								</button>
							);
						})}
					</div>
				)}
			</section>

			{/* VENDORS */}
			<section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
				<div className="mb-4 flex items-end justify-between">
					<h2 className="text-xl font-semibold sm:text-2xl">
						{activeCategoryId ? "Filtered vendors" : "All vendors"}
					</h2>
					{vendorsFetching && (
						<span className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<Loader2 className="h-3 w-3 animate-spin" />
							Updating
						</span>
					)}
				</div>

				{vendorsLoading && (
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						<VendorSkeleton />
						<VendorSkeleton />
						<VendorSkeleton />
					</div>
				)}

				{!vendorsLoading && visibleVendors.length === 0 && (
					<div className="rounded-xl border border-dashed bg-card/40 p-12 text-center">
						<p className="text-sm text-muted-foreground">
							{search
								? `No vendors match "${search}".`
								: "No vendors available right now."}
						</p>
					</div>
				)}

				{!vendorsLoading && visibleVendors.length > 0 && (
					<>
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{visibleVendors.map((vendor) => (
								<Card
									key={vendor.Id}
									className="group overflow-hidden border-border/60 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
									<Link to={`/shop/vendor/${vendor.Id}`} className="block">
										<div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
											{vendor.VendorImgUrl ? (
												<img
													src={vendor.VendorImgUrl}
													alt={vendor.Name}
													className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
													loading="lazy"
												/>
											) : (
												<div className="flex h-full items-center justify-center text-muted-foreground">
													No image
												</div>
											)}
											<button
												type="button"
												onClick={(e) => e.preventDefault()}
												aria-label="Save vendor"
												className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition hover:bg-background hover:text-primary">
												<Heart className="h-4 w-4" />
											</button>
											{vendor.Tag && (
												<Badge
													variant="secondary"
													className="absolute left-3 top-3 rounded-full">
													{vendor.Tag}
												</Badge>
											)}
										</div>

										<CardContent className="p-4">
											<div className="flex items-start justify-between gap-3">
												<h3 className="line-clamp-1 text-base font-semibold">
													{vendor.Name}
												</h3>
												<span className="flex shrink-0 items-center gap-1 text-sm">
													<Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
													<span className="text-muted-foreground">4.3</span>
												</span>
											</div>
											<div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
												<span className="flex items-center gap-1">
													<Clock className="h-3.5 w-3.5" />
													16–26 mins
												</span>
												{vendor.ContactAddress && (
													<span className="flex items-center gap-1 truncate">
														<MapPin className="h-3.5 w-3.5" />
														<span className="truncate">
															{vendor.ContactAddress}
														</span>
													</span>
												)}
											</div>
										</CardContent>
									</Link>
								</Card>
							))}
						</div>

						<div className="mt-10 flex justify-center">
							{vendorsData?.dataList?.HasNext ? (
								<Button
									variant="outline"
									onClick={loadMore}
									disabled={vendorsFetching}
									className="gap-2">
									{vendorsFetching && (
										<Loader2 className="h-4 w-4 animate-spin" />
									)}
									{vendorsFetching ? "Loading…" : "Load more vendors"}
								</Button>
							) : (
								<p className="text-xs text-muted-foreground">
									You've reached the end.
								</p>
							)}
						</div>
					</>
				)}
			</section>
		</div>
	);
};

export default Shop;
