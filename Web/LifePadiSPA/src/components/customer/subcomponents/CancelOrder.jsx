import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, XCircle } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import useUpdate from "../../../hooks/useUpdate";

const CancelOrder = ({ open, handleClose, Id }) => {
	const { auth } = useAuth();
	const url = `${baseUrl}order/updateStatus/${Id}`;
	const queryClient = useQueryClient();
	const update = useUpdate();
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		const result = await update(
			`${url}?status=Cancelled`,
			{ id: Id },
			auth.accessToken,
		);
		if (result?.error) {
			toast.error("Error cancelling order, please try again");
			setLoading(false);
			return;
		}
		toast.success("Order cancelled successfully");
		queryClient.invalidateQueries(`orders`);
		setLoading(false);
		handleClose({ type: "cancel" });
	};

	const onOpenChange = (next) => {
		if (!next) handleClose({ type: "cancel" });
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex justify-center mb-2">
						<XCircle className="h-12 w-12 text-destructive" />
					</div>
					<AlertDialogTitle className="text-center">
						Cancel this order?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center">
						Are you sure you want to cancel this order? This action cannot be
						undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						No, keep order
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						{loading ? (
							<span className="inline-flex items-center gap-2">
								<Loader2 className="h-4 w-4 animate-spin" /> Cancelling...
							</span>
						) : (
							"Yes, cancel order"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CancelOrder;
