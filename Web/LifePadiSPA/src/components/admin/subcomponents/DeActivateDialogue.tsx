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
import useDeActivate from "../../../hooks/useDeactivate";
import useAuth from "../../../hooks/useAuth";

interface DeActivateDialogueProps {
	open: boolean;
	handleClose: (action: any) => void;
	Id: number | string;
	url: string;
	entity: string;
}

const DeActivateDialogue = ({
	open,
	handleClose,
	Id,
	url,
	entity,
}: DeActivateDialogueProps) => {
	const { auth } = useAuth();
	const del = useDeActivate();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const close = () => handleClose({ type: "deActivate" });

	const handleDeactivate = async () => {
		setLoading(true);
		try {
			const result = await del(`${url}/deactivate/${Id}`, auth.accessToken);
			if (!result?.success) {
				toast.error(`Error deactivating ${entity}`);
				return;
			}
			toast.success(`${entity} deactivated successfully`);
			queryClient.invalidateQueries({ queryKey: [`${entity}s`] });
			close();
		} catch (error) {
			console.error(error);
			toast.error(`Error deactivating ${entity}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={(o) => !o && close()}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>De-activate {entity}?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to de-activate this {entity}?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>No, cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleDeactivate();
						}}
						disabled={loading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Deactivating…
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

export default DeActivateDialogue;
