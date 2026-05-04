/* eslint-disable react/prop-types */
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import { updateDeliveryOrderStatusUrl } from "./rider_uri/RiderURI";

export const UpdateModal = ({
	delivery,
	openUpdateModal,
	setOpenUpdateModal,
}: {
	delivery: any;
	openUpdateModal: boolean;
	setOpenUpdateModal: (v: boolean) => void;
}) => {
	const updateData = useUpdate();
	const { auth } = useAuth();
	const queryClient = useQueryClient();
	const [submitting, setSubmitting] = useState(false);

	const isDelivered = !!delivery?.Order?.IsDelivered;

	const handleUpdateStatus = async () => {
		setSubmitting(true);
		const url =
			updateDeliveryOrderStatusUrl +
			`?orderId=${delivery.Order.Id}&deliveryId=${delivery.Id}&deliveryStatus=Delivered`;
		try {
			await updateData(
				url,
				{
					deliveryId: delivery.Id,
					orderId: delivery.Order.Id,
					deliveryStatus: "Delivered",
				},
				auth.accessToken,
			);
			toast.success("Delivery marked as delivered");
			queryClient.invalidateQueries({ queryKey: ["riderDeliveries"] });
			queryClient.invalidateQueries({ queryKey: ["pendingDeliveriesCount"] });
			queryClient.invalidateQueries({
				queryKey: ["successfulDeliveriesCount"],
			});
			setOpenUpdateModal(false);
		} catch (err: any) {
			toast.error(err?.message || "Failed to update delivery status");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<AlertDialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Update Delivery</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to mark this delivery as{" "}
						<span className="font-semibold text-foreground">Delivered</span>?
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							if (!isDelivered) handleUpdateStatus();
						}}
						disabled={submitting || isDelivered}>
						{submitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Updating…
							</>
						) : isDelivered ? (
							"Already Delivered"
						) : (
							"Yes, Mark Delivered"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
