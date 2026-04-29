import { useReducer } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";

import CreateVoucher from "./CreateVoucher";
import DeleteDialogue from "../subcomponents/DeleteDialogue";
import DeActivateDialogue from "../subcomponents/DeActivateDialogue";
import ActivateDialogue from "../subcomponents/ActivateDialogue";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface VoucherRow {
	Id: number | string;
	Name: string;
	Code: string;
	IsActive?: boolean;
	IsExpired?: boolean;
	TotalNumberAvailable?: number;
	TotalNumberUsed?: number;
	DiscountPercentage?: number;
	DiscountAmount?: number;
	Description?: string;
}

interface State {
	open: boolean;
	activate: boolean;
	deActivate: boolean;
	delete: boolean;
	id: number | string | null;
}

type Action =
	| { type: "open" | "activate" | "deActivate" | "delete" }
	| { type: "id"; payload: number | string | null };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "open":
			return { ...state, open: !state.open };
		case "activate":
			return { ...state, activate: !state.activate };
		case "deActivate":
			return { ...state, deActivate: !state.deActivate };
		case "delete":
			return { ...state, delete: !state.delete };
		case "id":
			return { ...state, id: action.payload };
		default:
			throw new Error();
	}
};

const AdminVoucher = () => {
	const fetch = useFetch();
	const { auth } = useAuth();
	const url = `${baseUrl}voucher`;

	const [state, dispatch] = useReducer(reducer, {
		open: false,
		activate: false,
		deActivate: false,
		delete: false,
		id: null,
	});

	const { data, isError, isLoading, isSuccess } = useQuery<VoucherRow[]>({
		queryKey: ["vouchers"],
		queryFn: async () => {
			const r = await fetch(`${url}/all`, auth.accessToken);
			return r.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	return (
		<div className="space-y-6 p-4 md:p-6">
			<section className="text-center">
				<div className="text-3xl font-bold">{data?.length ?? 0}</div>
				<div className="text-sm text-muted-foreground">Vouchers</div>
				<h1 className="mt-4 text-3xl font-bold">Vouchers</h1>
			</section>

			<CreateVoucher open={state.open} handleClose={dispatch} />
			<DeleteDialogue
				open={state.delete}
				handleClose={dispatch}
				deleteId={state.id as number | string}
				url={url}
				name="voucher"
			/>
			<DeActivateDialogue
				open={state.deActivate}
				handleClose={dispatch}
				Id={state.id as number | string}
				url={url}
				entity="voucher"
			/>
			<ActivateDialogue
				open={state.activate}
				handleClose={dispatch}
				Id={state.id as number | string}
				url={url}
				entity="voucher"
			/>

			<Card>
				<CardContent className="p-4 space-y-4">
					<div className="flex justify-end">
						<Button onClick={() => dispatch({ type: "open" })}>
							<Plus className="mr-2 h-4 w-4" />
							Create Voucher
						</Button>
					</div>

					{isLoading && (
						<div className="flex items-center justify-center py-10">
							<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
						</div>
					)}
					{isError && (
						<Alert variant="destructive">
							<AlertDescription>We can't get your vouchers currently</AlertDescription>
						</Alert>
					)}
					{isSuccess && (
						<div className="overflow-x-auto rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Code</TableHead>
										<TableHead>Active</TableHead>
										<TableHead>Expired</TableHead>
										<TableHead>Usage</TableHead>
										<TableHead>Used</TableHead>
										<TableHead>Discount %</TableHead>
										<TableHead>Discount Amt</TableHead>
										<TableHead>Description</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data?.length ? (
										data.map((v) => (
											<TableRow key={v.Id}>
												<TableCell className="font-medium">{v.Name}</TableCell>
												<TableCell>{v.Code}</TableCell>
												<TableCell>
													<Badge variant={v.IsActive ? "default" : "secondary"}>
														{v.IsActive ? "Active" : "Inactive"}
													</Badge>
												</TableCell>
												<TableCell>
													<Badge variant={v.IsExpired ? "destructive" : "default"}>
														{v.IsExpired ? "Expired" : "Valid"}
													</Badge>
												</TableCell>
												<TableCell>{v.TotalNumberAvailable}</TableCell>
												<TableCell>{v.TotalNumberUsed}</TableCell>
												<TableCell>{v.DiscountPercentage}</TableCell>
												<TableCell>{v.DiscountAmount}</TableCell>
												<TableCell className="max-w-xs truncate">{v.Description}</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-2">
														<Button
															variant="ghost"
															size="icon"
															className="text-destructive"
															aria-label="Delete"
															onClick={(e) => {
																e.stopPropagation();
																dispatch({ type: "delete" });
																dispatch({ type: "id", payload: v.Id });
															}}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
														{v.IsActive ? (
															<Button
																variant="destructive"
																size="sm"
																onClick={(e) => {
																	e.stopPropagation();
																	dispatch({ type: "id", payload: v.Id });
																	dispatch({ type: "deActivate" });
																}}
															>
																De-Activate
															</Button>
														) : (
															<Button
																size="sm"
																onClick={(e) => {
																	e.stopPropagation();
																	dispatch({ type: "id", payload: v.Id });
																	dispatch({ type: "activate" });
																}}
															>
																Activate
															</Button>
														)}
													</div>
												</TableCell>
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={10} className="text-center text-muted-foreground py-8">
												No vouchers.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminVoucher;
