import { useEffect, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import RiderFormFields from "./RiderFormFields";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface RiderRow {
	Id: number | string;
	FirstName: string;
	LastName: string;
	Email: string;
	PhoneNumber: string;
	EmergencyContact?: string;
	ContactAddress?: string;
	IdentityType?: string;
	IdentityNumber?: string;
	IdentityImgUrl?: string;
	IsActive?: boolean;
	IsVerified?: boolean;
}

interface EditRiderModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	rider: RiderRow | Record<string, any>;
}

const EditRiderModal = ({ open, handleClose, rider }: EditRiderModalProps) => {
	const update = useUpdate();
	const { auth } = useAuth();
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState<string | false>(false);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState("");

	const form = useForm<any>({ mode: "onChange" });
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = form;

	useEffect(() => {
		if (rider) {
			Object.entries(rider).forEach(([k, v]) => setValue(k, v as never));
		}
	}, [rider, setValue]);

	const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0];
		if (!f) {
			setFile(null);
			setFileError(false);
			setPreviewUrl("");
			return;
		}
		if (f.size > 200 * 1024) {
			setFileError("File exceeds 200KB");
			setFile(null);
			setPreviewUrl("");
		} else {
			setFile(f);
			setFileError(false);
			setPreviewUrl(URL.createObjectURL(f));
		}
	};

	const clearFile = () => {
		setFile(null);
		setPreviewUrl("");
	};

	const updateRider = async (data: any) => {
		const fd = new FormData();
		const payload = file ? { ...data, IdentityImg: file } : data;
		Object.entries(payload).forEach(([k, v]) => fd.append(k, v as any));
		await update(`rider/update/${(rider as RiderRow).Id}`, fd, auth?.accessToken);
	};

	const { mutate, isPending: saving } = useMutation({ mutationFn: updateRider,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["riders"] });
			queryClient.invalidateQueries({ queryKey: ["rider", (rider as RiderRow).Id] });
			toast.success("Rider updated successfully");
			handleClose({ type: "edit" });
		},
		onError: (e: any) => {
			toast.error((e?.message as string) || "Update failed");
		},
	});

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "edit" })}>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Update Rider</DialogTitle>
				</DialogHeader>
				<form
					id="edit-rider-form"
					onSubmit={handleSubmit((d) => mutate(d))}
					className="space-y-4"
				>
					<h3 className="text-sm font-semibold text-muted-foreground">Personal & Contact</h3>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="edit"
						sections={["personal"]}
					/>
					<Separator />
					<h3 className="text-sm font-semibold text-muted-foreground">Identity</h3>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="edit"
						sections={["identity"]}
						fileError={fileError}
						onFileChange={handleFile}
						previewUrl={previewUrl}
						existingIdentityUrl={(rider as RiderRow)?.IdentityImgUrl}
						clearFile={clearFile}
					/>
				</form>
				<DialogFooter>
					<Button
						type="button"
						variant="ghost"
						onClick={() => handleClose({ type: "edit" })}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="edit-rider-form"
						disabled={!isValid || saving || isSubmitting || !!fileError}
					>
						{saving ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Save className="mr-2 h-4 w-4" />
						)}
						Save Changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditRiderModal;
