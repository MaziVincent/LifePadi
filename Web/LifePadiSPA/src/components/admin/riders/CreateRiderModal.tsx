import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
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

interface CreateRiderModalProps {
	open: boolean;
	handleClose: (action: any) => void;
}

const CreateRiderModal = ({ open, handleClose }: CreateRiderModalProps) => {
	const post = usePost();
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
		reset,
		formState: { errors, isValid, isSubmitting },
	} = form;

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

	const create = async (data: any) => {
		const formData = new FormData();
		const payload = { ...data, IdentityImg: file };
		Object.entries(payload).forEach(([k, v]) => formData.append(k, v as any));
		await post(`${baseUrl}rider/create`, formData, auth?.accessToken);
	};

	const { mutate, isPending: saving } = useMutation({ mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["riders"] });
			toast.success("Rider created successfully");
			reset();
			setFile(null);
			setPreviewUrl("");
			handleClose({ type: "open" });
		},
		onError: (e: any) => {
			toast.error((e?.message as string) || "Create failed");
		},
	});

	return (
		<Dialog open={open} onOpenChange={() => handleClose({ type: "open" })}>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Create Rider</DialogTitle>
				</DialogHeader>
				<form
					id="create-rider-form"
					onSubmit={handleSubmit((d) => mutate(d))}
					className="space-y-4"
				>
					<h3 className="text-sm font-semibold text-muted-foreground">Personal & Contact</h3>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="create"
						sections={["personal"]}
					/>
					<Separator />
					<h3 className="text-sm font-semibold text-muted-foreground">Account</h3>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="create"
						sections={["account"]}
					/>
					<Separator />
					<h3 className="text-sm font-semibold text-muted-foreground">Identity</h3>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="create"
						sections={["identity"]}
						fileError={fileError}
						onFileChange={handleFile}
						previewUrl={previewUrl}
						clearFile={clearFile}
					/>
				</form>
				<DialogFooter>
					<Button
						type="button"
						variant="ghost"
						onClick={() => handleClose({ type: "open" })}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						form="create-rider-form"
						disabled={!isValid || saving || isSubmitting || !!fileError}
					>
						{saving ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Plus className="mr-2 h-4 w-4" />
						)}
						Create Rider
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateRiderModal;
