import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
	Activity,
	BadgeCheck,
	Bell,
	CalendarDays,
	CheckCircle2,
	CircleAlert,
	Info,
	Plus,
	Settings,
	ShoppingBag,
	Trash2,
	TrendingUp,
	Users,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Loader } from "@/components/shared/Loader";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { DataTable } from "@/components/data-table/DataTable";

interface Order {
	id: string;
	customer: string;
	status: "pending" | "delivered" | "cancelled";
	amount: number;
}

const orders: Order[] = [
	{
		id: "ORD-001",
		customer: "Ada Lovelace",
		status: "delivered",
		amount: 12500,
	},
	{
		id: "ORD-002",
		customer: "Linus Torvalds",
		status: "pending",
		amount: 8400,
	},
	{
		id: "ORD-003",
		customer: "Grace Hopper",
		status: "delivered",
		amount: 30200,
	},
	{ id: "ORD-004", customer: "Alan Turing", status: "cancelled", amount: 5400 },
	{
		id: "ORD-005",
		customer: "Margaret Hamilton",
		status: "delivered",
		amount: 19900,
	},
];

const orderColumns: ColumnDef<Order>[] = [
	{ accessorKey: "id", header: "Order" },
	{ accessorKey: "customer", header: "Customer" },
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const s = row.original.status;
			return (
				<Badge
					variant={
						s === "delivered"
							? "default"
							: s === "pending"
								? "secondary"
								: "destructive"
					}>
					{s}
				</Badge>
			);
		},
	},
	{
		accessorKey: "amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => (
			<div className="text-right font-medium">
				₦{row.original.amount.toLocaleString()}
			</div>
		),
	},
];

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="space-y-4">
			<div className="flex items-center gap-3">
				<h2 className="text-lg font-semibold tracking-tight">{title}</h2>
				<Separator className="flex-1" />
			</div>
			<div className="rounded-lg border bg-background p-6">{children}</div>
		</section>
	);
}

export default function KitchenSink() {
	const [progress, setProgress] = useState(45);
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<div className="container py-10">
			<PageHeader
				title="UI Kitchen Sink"
				description="Every shadcn primitive + LifePadi shared component, in one place."
				actions={
					<>
						<ThemeToggle />
						<Button onClick={() => toast.success("Hello from sonner")}>
							<Bell className="mr-2 h-4 w-4" />
							Toast me
						</Button>
					</>
				}
			/>

			<div className="space-y-10">
				<Section title="Buttons & Badges">
					<div className="flex flex-wrap items-center gap-2">
						<Button>Primary</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="link">Link</Button>
						<Button variant="destructive">Destructive</Button>
						<Button size="sm">Small</Button>
						<Button size="lg">Large</Button>
						<Button size="icon" aria-label="Add">
							<Plus className="h-4 w-4" />
						</Button>
						<Button disabled>
							<Loader className="mr-2" size={16} />
							Loading
						</Button>
					</div>
					<div className="mt-4 flex flex-wrap gap-2">
						<Badge>Default</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="outline">Outline</Badge>
						<Badge variant="destructive">Destructive</Badge>
					</div>
				</Section>

				<Section title="Stats">
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<StatCard
							label="Total revenue"
							value="₦4.2M"
							icon={<TrendingUp className="h-4 w-4" />}
							trend={{ value: "+12.4% vs last week", positive: true }}
						/>
						<StatCard
							label="Orders"
							value="1,284"
							icon={<ShoppingBag className="h-4 w-4" />}
							hint="Last 30 days"
						/>
						<StatCard
							label="Active customers"
							value="843"
							icon={<Users className="h-4 w-4" />}
							trend={{ value: "-3.1%", positive: false }}
						/>
						<StatCard
							label="Avg. delivery"
							value="38m"
							icon={<Activity className="h-4 w-4" />}
						/>
					</div>
				</Section>

				<Section title="Avatars & Skeletons">
					<div className="flex items-center gap-4">
						<Avatar>
							<AvatarImage src="https://i.pravatar.cc/64?img=12" alt="" />
							<AvatarFallback>AD</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>LP</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-2">
							<Skeleton className="h-4 w-1/3" />
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-4 w-1/2" />
						</div>
					</div>
				</Section>

				<Section title="Form controls">
					<div className="grid gap-6 md:grid-cols-2">
						<div className="space-y-3">
							<div className="space-y-1.5">
								<Label htmlFor="ks-name">Name</Label>
								<Input id="ks-name" placeholder="Jane Doe" />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="ks-bio">Bio</Label>
								<Textarea id="ks-bio" placeholder="Tell us about yourself" />
							</div>
							<div className="space-y-1.5">
								<Label>Country</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select a country" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ng">Nigeria</SelectItem>
										<SelectItem value="gh">Ghana</SelectItem>
										<SelectItem value="ke">Kenya</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Checkbox id="ks-tos" />
								<Label htmlFor="ks-tos">Accept the terms</Label>
							</div>
							<RadioGroup defaultValue="standard" className="space-y-2">
								<div className="flex items-center gap-2">
									<RadioGroupItem id="ks-r1" value="standard" />
									<Label htmlFor="ks-r1">Standard delivery</Label>
								</div>
								<div className="flex items-center gap-2">
									<RadioGroupItem id="ks-r2" value="express" />
									<Label htmlFor="ks-r2">Express delivery</Label>
								</div>
							</RadioGroup>
							<div className="flex items-center gap-2">
								<Switch id="ks-sw" />
								<Label htmlFor="ks-sw">Email notifications</Label>
							</div>
							<div className="space-y-1.5">
								<Label>Volume</Label>
								<Slider defaultValue={[40]} max={100} step={1} />
							</div>
						</div>
					</div>
				</Section>

				<Section title="Overlays">
					<div className="flex flex-wrap gap-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">Open Dialog</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Confirm action</DialogTitle>
									<DialogDescription>
										Dialogs render above the page content.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button>Save</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline">Open Sheet</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Side sheet</SheetTitle>
									<SheetDescription>Slide in from the edge.</SheetDescription>
								</SheetHeader>
							</SheetContent>
						</Sheet>

						<Drawer>
							<DrawerTrigger asChild>
								<Button variant="outline">Open Drawer</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Mobile drawer</DrawerTitle>
								</DrawerHeader>
								<div className="p-4">Body content</div>
							</DrawerContent>
						</Drawer>

						<Popover>
							<PopoverTrigger asChild>
								<Button variant="outline">Popover</Button>
							</PopoverTrigger>
							<PopoverContent className="w-72">
								<p className="text-sm">
									Anchored content with auto-positioning.
								</p>
							</PopoverContent>
						</Popover>

						<HoverCard>
							<HoverCardTrigger asChild>
								<Button variant="ghost">Hover</Button>
							</HoverCardTrigger>
							<HoverCardContent>
								<div className="flex items-center gap-2">
									<BadgeCheck className="h-4 w-4 text-primary" />
									<span className="text-sm">Verified vendor</span>
								</div>
							</HoverCardContent>
						</HoverCard>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button size="icon" variant="outline" aria-label="Settings">
										<Settings className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>Settings</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">Menu</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Edit</DropdownMenuItem>
								<DropdownMenuItem>Duplicate</DropdownMenuItem>
								<DropdownMenuItem className="text-destructive">
									<Trash2 className="mr-2 h-4 w-4" /> Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<ConfirmDialog
							destructive
							trigger={<Button variant="destructive">Confirm dialog</Button>}
							title="Delete order?"
							description="This action cannot be undone."
							onConfirm={() => {
								toast.success("Deleted");
							}}
						/>
					</div>
				</Section>

				<Section title="Tabs & Accordion">
					<Tabs defaultValue="overview">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="orders">Orders</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>
						<TabsContent value="overview" className="pt-4">
							<p className="text-sm text-muted-foreground">
								Summary content goes here.
							</p>
						</TabsContent>
						<TabsContent value="orders" className="pt-4">
							<DataTable
								columns={orderColumns}
								data={orders}
								searchKey="customer"
								searchPlaceholder="Filter by customer…"
							/>
						</TabsContent>
						<TabsContent value="settings" className="pt-4">
							<p className="text-sm text-muted-foreground">Settings panel.</p>
						</TabsContent>
					</Tabs>

					<div className="mt-6">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="i1">
								<AccordionTrigger>What is LifePadi?</AccordionTrigger>
								<AccordionContent>
									LifePadi is your everyday assistant for shopping, errands, and
									deliveries.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="i2">
								<AccordionTrigger>Where do you operate?</AccordionTrigger>
								<AccordionContent>
									Across major Nigerian cities, with more rolling out.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</Section>

				<Section title="Feedback">
					<div className="grid gap-4 md:grid-cols-2">
						<Alert>
							<Info className="h-4 w-4" />
							<AlertTitle>Heads up</AlertTitle>
							<AlertDescription>
								This is a neutral alert with an icon.
							</AlertDescription>
						</Alert>
						<Alert variant="destructive">
							<CircleAlert className="h-4 w-4" />
							<AlertTitle>Something failed</AlertTitle>
							<AlertDescription>
								Could not load orders. Try again.
							</AlertDescription>
						</Alert>
						<div className="space-y-2">
							<Label>Upload progress</Label>
							<Progress value={progress} />
							<div className="flex gap-2">
								<Button
									size="sm"
									variant="outline"
									onClick={() => setProgress((p) => Math.max(0, p - 10))}>
									-
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setProgress((p) => Math.min(100, p + 10))}>
									+
								</Button>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Button variant="outline" onClick={() => toast("Default toast")}>
								Default toast
							</Button>
							<Button variant="outline" onClick={() => toast.success("Saved!")}>
								Success toast
							</Button>
							<Button variant="outline" onClick={() => toast.error("Failed.")}>
								Error toast
							</Button>
						</div>
					</div>
				</Section>

				<Section title="States">
					<div className="grid gap-4 md:grid-cols-3">
						<EmptyState
							title="No orders yet"
							description="Place your first order to see it here."
						/>
						<ErrorState
							description="We couldn't reach the server."
							onRetry={() => toast("Retrying…")}
						/>
						<Card>
							<CardHeader>
								<CardTitle>Welcome back</CardTitle>
								<CardDescription>Here's a quick snapshot.</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center gap-2">
									<CheckCircle2 className="h-5 w-5 text-emerald-500" />
									<span className="text-sm">All systems operational</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</Section>

				<Section title="Calendar & Pagination">
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
								<CalendarDays className="h-4 w-4" />
								Pick a date
							</div>
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								className="rounded-md border"
							/>
						</div>
						<div className="space-y-4">
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink href="/">Home</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>Orders</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#" isActive>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">2</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
							<ScrollArea className="h-32 rounded-md border p-3 text-sm">
								<p>
									Scrollable region. Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
									dolore magna aliqua.
								</p>
								<p className="mt-2">
									Ut enim ad minim veniam, quis nostrud exercitation ullamco
									laboris nisi ut aliquip ex ea commodo consequat.
								</p>
								<p className="mt-2">
									Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur.
								</p>
							</ScrollArea>
						</div>
					</div>
				</Section>
			</div>
		</div>
	);
}
