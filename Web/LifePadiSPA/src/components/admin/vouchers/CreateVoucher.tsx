import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateVoucherProps {
	open: boolean;
	handleClose: (action: any) => void;
}

const CreateVoucher = ({ open, handleClose }: CreateVoucherProps) => {
	const post = usePost();
	const { auth } = useAuth();
	const url = `${baseUrl}voucher/create`;
	const queryClient = useQueryClient();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isSubmitting, isValid },
	} = useForm({ mode: "all" });

	const create = async (data: Record<string, any>) => {
		setIsLoading(true);
		const fd = new FormData();
		Object.entries(data).forEach(([k, v]) => fd.append(k, v as any));
		await post(url, fd, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vouchers"] });
			toast.success("Voucher Created Successfully");
			reset();
			handleClose({ type: "open" });
			setIsLoading(false);
		},
		onError: () => {
			setIsLoading(false);
			toast.error("Failed to create voucher");
		},
	});

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Voucher</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
					<div className="space-y-1">
						<Label>Name</Label>
						<Input {...register("Name", { required: true })} />
						{errors.Name && <p className="text-xs text-destructive">Required</p>}
					</div>
					<div className="space-y-1">
						<Label>Description</Label>
						<Textarea rows={3} {...register("Description", { required: true })} />
					</div>
					<div className="space-y-1">
						<Label>Number of Usage</Label>
						<Input type="number" {...register("TotalNumberAvailable", { required: true })} />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div className="space-y-1">
							<Label>Start Date</Label>
							<Input type="date" {...register("StartDate", { required: true })} />
						</div>
						<div className="space-y-1">
							<Label>End Date</Label>
							<Input type="date" {...register("EndDate", { required: true })} />
						</div>
						<div className="space-y-1">
							<Label>Discount Percentage</Label>
							<Input
								type="number"
								{...register("DiscountPercentage", {
									required: {
										value: !getValues("DiscountAmount"),
										message: "Either percentage or amount is required.",
									},
									validate: {
										exclusiveValue: (value: any) => {
											const amount = getValues("DiscountAmount");
											return (
												!(value && amount) || "Only one of percentage or amount can be filled."
											);
										},
									},
								})}
							/>
							{errors.DiscountPercentage && (
								<p className="text-xs text-destructive">
									{errors.DiscountPercentage.message as string}
								</p>
							)}
						</div>
						<div className="space-y-1">
							<Label>Discount Amount</Label>
							<Input
								type="number"
								{...register("DiscountAmount", {
									required: {
										value: !getValues("DiscountPercentage"),
										message: "Either percentage or amount is required.",
									},
									validate: {
										exclusiveValue: (value: any) => {
											const pct = getValues("DiscountPercentage");
											return (
												!(value && pct) || "Only one of percentage or amount can be filled."
											);
										},
									},
								})}
							/>
							{errors.DiscountAmount && (
								<p className="text-xs text-destructive">
									{errors.DiscountAmount.message as string}
								</p>
							)}
						</div>
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || isLoading || !isValid}>
							{isSubmitting || isLoading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Plus className="mr-2 h-4 w-4" />
							)}
							Create Voucher
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CreateVoucher;
