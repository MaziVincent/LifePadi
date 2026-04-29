import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
	CheckCircle2,
	XCircle,
	Loader2,
	Bike,
	Store,
	ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

interface PendingVendor {
	Id: number;
	Name?: string;
	Email?: string;
	PhoneNumber?: string;
	Tag?: string;
	ContactAddress?: string;
	CreatedAt?: string;
	ApprovalStatus?: string;
}

interface PendingRider {
	Id: number;
	FirstName?: string;
	LastName?: string;
	Email?: string;
	PhoneNumber?: string;
	IdentityType?: string;
	IdentityNumber?: string;
	IdentityImgUrl?: string;
	ContactAddress?: string;
	CreatedAt?: string;
	ApprovalStatus?: string;
}

const PendingApprovals = () => {
	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const [tab, setTab] = useState<"vendors" | "riders">("vendors");
	const [vendors, setVendors] = useState<PendingVendor[]>([]);
	const [riders, setRiders] = useState<PendingRider[]>([]);
	const [loading, setLoading] = useState(false);
	const [reject, setReject] = useState<{
		kind: "vendor" | "rider";
		id: number;
		name: string;
	} | null>(null);
	const [reason, setReason] = useState("");
	const [busy, setBusy] = useState<number | null>(null);

	const token = auth?.accessToken as string | undefined;

	const load = async () => {
		setLoading(true);
		try {
			const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
			const [v, r] = await Promise.all([
				axiosPrivate.get("approval/vendors?status=Pending", { headers }),
				axiosPrivate.get("approval/riders?status=Pending", { headers }),
			]);
			setVendors(v.data?.result ?? []);
			setRiders(r.data?.result ?? []);
		} catch {
			toast.error("Failed to load pending applications");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const approve = async (kind: "vendor" | "rider", id: number) => {
		setBusy(id);
		try {
			const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
			await axiosPrivate.put(
				`approval/${kind}s/${id}/approve`,
				{},
				{ headers },
			);
			toast.success(`${kind === "vendor" ? "Vendor" : "Rider"} approved`);
			if (kind === "vendor") setVendors((xs) => xs.filter((x) => x.Id !== id));
			else setRiders((xs) => xs.filter((x) => x.Id !== id));
		} catch {
			toast.error("Approval failed");
		} finally {
			setBusy(null);
		}
	};

	const submitReject = async () => {
		if (!reject) return;
		if (reason.trim().length < 4) {
			toast.error("Provide a reason");
			return;
		}
		setBusy(reject.id);
		try {
			const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
			await axiosPrivate.put(
				`approval/${reject.kind}s/${reject.id}/reject`,
				{ reason },
				{ headers },
			);
			toast.success("Rejected");
			if (reject.kind === "vendor")
				setVendors((xs) => xs.filter((x) => x.Id !== reject.id));
			else setRiders((xs) => xs.filter((x) => x.Id !== reject.id));
			setReject(null);
			setReason("");
		} catch {
			toast.error("Rejection failed");
		} finally {
			setBusy(null);
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold">Pending approvals</h1>
					<p className="text-sm text-muted-foreground">
						Review vendor and rider applications.
					</p>
				</div>
				<Button variant="outline" onClick={load} disabled={loading}>
					{loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
					Refresh
				</Button>
			</div>

			<Tabs
				value={tab}
				onValueChange={(v) => setTab(v as "vendors" | "riders")}>
				<TabsList>
					<TabsTrigger value="vendors" className="gap-2">
						<Store className="h-4 w-4" /> Vendors
						<span className="ml-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
							{vendors.length}
						</span>
					</TabsTrigger>
					<TabsTrigger value="riders" className="gap-2">
						<Bike className="h-4 w-4" /> Riders
						<span className="ml-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
							{riders.length}
						</span>
					</TabsTrigger>
				</TabsList>

				<TabsContent value="vendors" className="space-y-3">
					{vendors.length === 0 && !loading && (
						<EmptyState message="No pending vendor applications." />
					)}
					{vendors.map((v) => (
						<div
							key={v.Id}
							className="flex flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
							<div className="space-y-1">
								<div className="flex items-center gap-2">
									<span className="font-semibold">{v.Name || "Unnamed"}</span>
									<span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
										@{v.Tag}
									</span>
								</div>
								<p className="text-sm text-muted-foreground">
									{v.Email} · {v.PhoneNumber}
								</p>
								<p className="text-xs text-muted-foreground">
									{v.ContactAddress}
								</p>
							</div>
							<div className="flex flex-wrap gap-2">
								<Button asChild variant="outline" size="sm">
									<Link to={`/admin/vendor/${v.Id}`}>
										<ExternalLink className="mr-1 h-3.5 w-3.5" /> Details
									</Link>
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="text-destructive"
									disabled={busy === v.Id}
									onClick={() =>
										setReject({ kind: "vendor", id: v.Id, name: v.Name || "" })
									}>
									<XCircle className="mr-1 h-3.5 w-3.5" /> Reject
								</Button>
								<Button
									size="sm"
									disabled={busy === v.Id}
									onClick={() => approve("vendor", v.Id)}>
									{busy === v.Id ? (
										<Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
									) : (
										<CheckCircle2 className="mr-1 h-3.5 w-3.5" />
									)}
									Approve
								</Button>
							</div>
						</div>
					))}
				</TabsContent>

				<TabsContent value="riders" className="space-y-3">
					{riders.length === 0 && !loading && (
						<EmptyState message="No pending rider applications." />
					)}
					{riders.map((r) => (
						<div
							key={r.Id}
							className="flex flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-3">
								{r.IdentityImgUrl && (
									<img
										src={r.IdentityImgUrl}
										alt="ID"
										className="h-14 w-14 rounded-md border object-cover"
									/>
								)}
								<div className="space-y-1">
									<p className="font-semibold">
										{r.FirstName} {r.LastName}
									</p>
									<p className="text-sm text-muted-foreground">
										{r.Email} · {r.PhoneNumber}
									</p>
									<p className="text-xs text-muted-foreground">
										{r.IdentityType} · {r.IdentityNumber}
									</p>
								</div>
							</div>
							<div className="flex flex-wrap gap-2">
								<Button
									size="sm"
									variant="outline"
									className="text-destructive"
									disabled={busy === r.Id}
									onClick={() =>
										setReject({
											kind: "rider",
											id: r.Id,
											name: `${r.FirstName ?? ""} ${r.LastName ?? ""}`.trim(),
										})
									}>
									<XCircle className="mr-1 h-3.5 w-3.5" /> Reject
								</Button>
								<Button
									size="sm"
									disabled={busy === r.Id}
									onClick={() => approve("rider", r.Id)}>
									{busy === r.Id ? (
										<Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
									) : (
										<CheckCircle2 className="mr-1 h-3.5 w-3.5" />
									)}
									Approve
								</Button>
							</div>
						</div>
					))}
				</TabsContent>
			</Tabs>

			<Dialog
				open={!!reject}
				onOpenChange={(o) => {
					if (!o) {
						setReject(null);
						setReason("");
					}
				}}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Reject {reject?.kind}</DialogTitle>
						<DialogDescription>
							Tell {reject?.name || "this applicant"} why their application is
							being rejected. They will be emailed this reason.
						</DialogDescription>
					</DialogHeader>
					<Textarea
						rows={4}
						placeholder="Reason"
						value={reason}
						onChange={(e) => setReason(e.target.value)}
					/>
					<DialogFooter>
						<Button
							variant="ghost"
							onClick={() => {
								setReject(null);
								setReason("");
							}}>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={submitReject}
							disabled={busy !== null}>
							{busy !== null && (
								<Loader2 className="mr-1 h-4 w-4 animate-spin" />
							)}
							Reject application
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

const EmptyState = ({ message }: { message: string }) => (
	<div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
		{message}
	</div>
);

export default PendingApprovals;
