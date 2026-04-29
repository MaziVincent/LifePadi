/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import useDelete from "../../../hooks/useDelete";
import useAuth from "../../../hooks/useAuth";

interface DeleteDialogueProps {
	open: boolean;
	handleClose: (action: any) => void;
	deleteId: number | string;
	url: string;
	name: string;
}

const DeleteDialogue = ({
	open,
	handleClose,
	deleteId,
	url,
	name,
}: DeleteDialogueProps) => {
	const { auth } = useAuth();
	const del = useDelete();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const close = () => handleClose({ type: "delete" });

	const handleDelete = async () => {
		setLoading(true);
		try {
			const result = await del(`${url}/delete/${deleteId}`, auth.accessToken);
			if (!result?.success) {
				toast.error("Error deleting item");
				return;
			}
			toast.success("Item deleted successfully");
			queryClient.invalidateQueries({ queryKey: [`${name}s`] });
			close();
		} catch (error) {
			console.error(error);
			toast.error("Error deleting item");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={(o) => !o && close()}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete this item?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this item?
						<span className="mt-1 block text-destructive">
							This action cannot be undone.
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>No, cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleDelete();
						}}
						disabled={loading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deleting…
							</>
						) : (
							"Yes, I'm sure"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteDialogue;
