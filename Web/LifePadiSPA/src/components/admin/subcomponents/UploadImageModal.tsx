/* eslint-disable react/prop-types */
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";

interface UploadImageModalProps {
	open: boolean;
	handleClose: (action: any) => void;
	url: string;
	id: number | string;
	name: string;
}

interface UploadFormValues {
	Image: FileList;
}

const UploadImageModal = ({
	open,
	handleClose,
	url,
	id,
	name,
}: UploadImageModalProps) => {
	const update = useUpdate();
	const { auth } = useAuth();
	const URI = `${url}/uploadImg/${id}`;
	const queryClient = useQueryClient();

	const [fileError, setFileError] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<UploadFormValues>({ mode: "all" });

	const close = () => {
		reset();
		setFile(null);
		setFileError(false);
		handleClose({ type: "upload" });
	};

	const create = async (data: UploadFormValues) => {
		const formData = new FormData();
		formData.append("Image", data.Image[0]);
		return update(URI, formData, auth?.accessToken);
	};

	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [`${name}`] });
			toast.success("Image uploaded successfully");
			close();
		},
		onError: () => {
			toast.error("Error uploading image");
		},
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const f = event.target.files?.[0];
		if (!f || f.size > 200 * 1024) {
			setFileError(true);
			setFile(null);
		} else {
			setFileError(false);
			setFile(f);
		}
	};

	return (
		<Dialog open={open} onOpenChange={(o) => !o && close()}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="capitalize">Upload {name} image</DialogTitle>
					<DialogDescription>Image should not exceed 200kb.</DialogDescription>
				</DialogHeader>
				<form
					id="upload-image-form"
					onSubmit={handleSubmit((data) => mutate(data))}
					className="space-y-3">
					<div>
						<Label htmlFor="icon">Image</Label>
						<Input
							id="icon"
							type="file"
							accept="image/*"
							{...register("Image", { required: "Image is required" })}
							onChange={(e) => {
								register("Image").onChange(e);
								handleChange(e);
							}}
						/>
						{errors.Image && (
							<p className="mt-1 text-xs text-destructive">
								{errors.Image.message as string}
							</p>
						)}
						{fileError && (
							<Alert variant="destructive" className="mt-2">
								<AlertDescription>
									File should not exceed 200kb
								</AlertDescription>
							</Alert>
						)}
						{file && !fileError && (
							<p className="mt-2 text-xs text-emerald-600">
								Selected: {file.name}
							</p>
						)}
					</div>
				</form>
				<DialogFooter>
					<Button variant="outline" type="button" onClick={close}>
						Cancel
					</Button>
					<Button
						type="submit"
						form="upload-image-form"
						disabled={fileError || isSubmitting || isLoading}>
						{isSubmitting || isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Uploading…
							</>
						) : (
							<>
								<Upload className="mr-2 h-4 w-4" />
								Upload {name} image
							</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default UploadImageModal;
