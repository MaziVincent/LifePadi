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
import useActivate from "../../../hooks/useActivate";
import useAuth from "../../../hooks/useAuth";

interface ActivateDialogueProps {
	open: boolean;
	handleClose: (action: any) => void;
	Id: number | string;
	url: string;
	entity: string;
}

const ActivateDialogue = ({
	open,
	handleClose,
	Id,
	url,
	entity,
}: ActivateDialogueProps) => {
	const { auth } = useAuth();
	const activate = useActivate();
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const close = () => handleClose({ type: "activate" });

	const handleActivate = async () => {
		setLoading(true);
		try {
			const result = await activate(`${url}/activate/${Id}`, auth.accessToken);
			if (!result?.success) {
				toast.error(`Error activating ${entity}`);
				return;
			}
			toast.success(`${entity} activated successfully`);
			queryClient.invalidateQueries({ queryKey: [`${entity}s`] });
			close();
		} catch (error) {
			console.error(error);
			toast.error(`Error activating ${entity}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={(o) => !o && close()}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Activate {entity}?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to activate this {entity}?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>No, cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							handleActivate();
						}}
						disabled={loading}
						className="bg-emerald-600 text-white hover:bg-emerald-700">
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Activating…
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

export default ActivateDialogue;
