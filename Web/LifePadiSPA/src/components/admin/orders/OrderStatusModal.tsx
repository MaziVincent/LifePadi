import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface OrderStatusModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	url: string;
	id: number | string;
	name: string;
}

const selectClasses = cn(
	"flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm capitalize ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);

const OrderStatusModal = ({ open, handleClose, url, id, name }: OrderStatusModalProps) => {
	const update = useUpdate();
	const { auth } = useAuth();
	const URI = `${url}/updateStatus/${id}`;
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm({ mode: "all" });

	const submit = async (data: Record<string, any>) => {
		await update(`${URI}?status=${data.Status}`, data, auth?.accessToken);
	};

	const { mutate } = useMutation({ mutationFn: submit,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`${name}`] });
			toast.success("Status Updated");
			reset();
			handleClose({ type: "edit" });
		},
		onError: () => {
			toast.error("Failed to update status");
		},
	});

	const handleStatus = (data: Record<string, any>) => {
		if (["Pending", "Ongoing", "Completed"].includes(data.Status)) {
			mutate(data);
		} else {
			toast.error("Choose Order Status");
		}
	};

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "edit" })}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="capitalize">{`Update ${name} Status`}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(handleStatus)} className="space-y-4">
					<div className="space-y-1">
						<Label>Select Status</Label>
						<select
							className={selectClasses}
							defaultValue=""
							{...register("Status", { required: "Status is required" })}
						>
							<option value="" disabled>
								Select Status
							</option>
							<option value="Pending">Pending</option>
							<option value="Ongoing">Ongoing</option>
							<option value="Completed">Completed</option>
						</select>
						{errors.Status && (
							<p className="text-xs text-destructive">{errors.Status.message as string}</p>
						)}
					</div>
					<DialogFooter>
						<Button type="submit" disabled={isSubmitting || !isValid} className="capitalize">
							{isSubmitting ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 h-4 w-4" />
							)}
							{`Update ${name} Status`}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default OrderStatusModal;
