import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	LinearProgress,
	Alert,
	Collapse,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import useUpdate from "../../../hooks/useUpdate";
import useAuth from "../../../hooks/useAuth";
import RiderFormFields from "./RiderFormFields";

const EditRiderModal = ({ open, handleClose, rider }) => {
	const update = useUpdate();
	const { auth } = useAuth();
	const queryClient = useQueryClient();
	const [fileError, setFileError] = useState("");
	const [file, setFile] = useState(null);
	const [previewUrl, setPreviewUrl] = useState("");
	const [successOpen, setSuccessOpen] = useState(false);
	const form = useForm({ mode: "onChange" });
	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors, isValid, isSubmitting },
	} = form;

	useEffect(() => {
		if (rider) {
			Object.entries(rider).forEach(([k, v]) => setValue(k, v));
		}
	}, [rider, setValue]);

	const handleFile = (e) => {
		const f = e.target.files?.[0];
		if (!f) {
			setFile(null);
			setFileError("");
			setPreviewUrl("");
			return;
		}
		if (f.size > 200 * 1024) {
			setFileError("File exceeds 200KB");
			setFile(null);
			setPreviewUrl("");
		} else {
			setFile(f);
			setFileError("");
			setPreviewUrl(URL.createObjectURL(f));
		}
	};

	const clearFile = () => {
		setFile(null);
		setPreviewUrl("");
	};

	const updateRider = async (data) => {
		const fd = new FormData();
		const payload = file ? { ...data, IdentityImg: file } : data;
		Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
		await update(`rider/update/${rider.Id}`, fd, auth?.accessToken);
	};

	const { mutate, isLoading: saving } = useMutation(updateRider, {
		onSuccess: () => {
			queryClient.invalidateQueries("riders");
			queryClient.invalidateQueries(["rider", rider?.Id]);
			toast.success("Rider updated");
			setSuccessOpen(true);
		},
		onError: (e) => toast.error(e?.message || "Update failed"),
	});

	const onSubmit = (data) => mutate(data);

	return (
		<Dialog
			open={open}
			onClose={() => handleClose?.({ type: "edit" })}
			maxWidth="md"
			fullWidth>
			<Toaster />
			<DialogTitle>Update Rider</DialogTitle>
			<DialogContent dividers>
				<Collapse in={successOpen} unmountOnExit>
					<Alert
						severity="success"
						onClose={() => setSuccessOpen(false)}
						sx={{ mb: 2 }}>
						Rider updated successfully.
					</Alert>
				</Collapse>
				<form id="edit-rider-form" onSubmit={handleSubmit(onSubmit)}>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="edit"
						fileError={fileError}
						onFileChange={handleFile}
						sections={["personal", "identity"]}
						previewUrl={previewUrl}
						existingIdentityUrl={rider?.IdentityImgUrl}
						clearFile={clearFile}
					/>
				</form>
				{(isSubmitting || saving) && <LinearProgress sx={{ mt: 2 }} />}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleClose?.({ type: "edit" })}>Close</Button>
				<Button
					type="submit"
					form="edit-rider-form"
					variant="contained"
					disabled={!isValid || saving}>
					{saving ? "Saving..." : "Save Changes"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditRiderModal;
