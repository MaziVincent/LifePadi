/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
	useQuery,
	useMutation,
	useQueryClient,
	keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, UserCheck } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useUpdate from "../../../hooks/useUpdate";
import useFetch from "../../../hooks/useFetch";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

interface AssignRiderProps {
	id: number | string;
	open: boolean;
	handleClose: (open: boolean) => void;
}

interface AssignRiderFormValues {
	RiderId: string;
}

interface RiderOption {
	Id: number | string;
	FirstName: string;
	LastName: string;
}

const AssignRider = ({ id, open, handleClose }: AssignRiderProps) => {
	const update = useUpdate();
	const fetch = useFetch();
	const { auth } = useAuth();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const url = `${baseUrl}rider/allActive?PageSize=10`;

	const getRiders = async (u: string) => {
		const res = await fetch(u, auth.accessToken);
		return res.data;
	};

	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ["riders"],
		queryFn: () => getRiders(url),
		placeholderData: keepPreviousData,
		staleTime: 20000,
		refetchOnMount: "always",
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm<AssignRiderFormValues>({ mode: "all" });

	const create = async (formData: AssignRiderFormValues) => {
		setLoading(true);
		const info = { riderId: formData.RiderId, id };
		return update(
			`${baseUrl}delivery/assignRider/${id}/${formData.RiderId}`,
			info,
			auth?.accessToken,
		);
	};

	const { mutate } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["delivery"] });
			toast.success("Rider assigned successfully");
			setLoading(false);
			reset();
			handleClose(false);
		},
		onError: () => {
			setLoading(false);
			toast.error("Failed to assign rider");
		},
	});

	return (
		<Dialog open={open} onOpenChange={(o) => !o && handleClose(false)}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Assign Rider</DialogTitle>
				</DialogHeader>
				<form
					id="assign-rider-form"
					onSubmit={handleSubmit((d) => mutate(d))}
					className="space-y-3">
					<div>
						<Label htmlFor="rider">Select Rider</Label>
						<Controller
							name="RiderId"
							control={control}
							rules={{ required: "Rider is required" }}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger id="rider">
										<SelectValue
											placeholder={
												isLoading
													? "Loading riders…"
													: isError
														? "Error loading riders"
														: "Select rider"
											}
										/>
									</SelectTrigger>
									<SelectContent>
										{isSuccess &&
											data?.result?.map((rider: RiderOption) => (
												<SelectItem key={rider.Id} value={String(rider.Id)}>
													{rider.FirstName} {rider.LastName}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.RiderId && (
							<p className="mt-1 text-xs text-destructive">
								{errors.RiderId.message as string}
							</p>
						)}
					</div>
				</form>
				<DialogFooter>
					<Button
						variant="outline"
						type="button"
						onClick={() => handleClose(false)}>
						Cancel
					</Button>
					<Button
						type="submit"
						form="assign-rider-form"
						disabled={!isValid || isSubmitting || loading}>
						{isSubmitting || loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Assigning…
							</>
						) : (
							<>
								<UserCheck className="mr-2 h-4 w-4" />
								Assign Rider
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AssignRider;
