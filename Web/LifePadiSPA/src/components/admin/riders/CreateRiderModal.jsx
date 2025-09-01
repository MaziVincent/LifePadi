import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Stepper,
	Step,
	StepLabel,
	Box,
	LinearProgress,
	Alert,
	Collapse,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import usePost from "../../../hooks/usePost";
import useAuth from "../../../hooks/useAuth";
import baseUrl from "../../../api/baseUrl";
import RiderFormFields from "./RiderFormFields";

const steps = ["Personal & Contact", "Account", "Identity"];

const CreateRiderModal = ({ open, handleClose }) => {
	const post = usePost();
	const { auth } = useAuth();
	const queryClient = useQueryClient();
	const [activeStep, setActiveStep] = useState(0);
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
		trigger,
		formState: { errors, isValid, isSubmitting },
	} = form;

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

	const create = async (data) => {
		const formData = new FormData();
		const riderPayload = { ...data, IdentityImg: file };
		Object.entries(riderPayload).forEach(([k, v]) => formData.append(k, v));
		await post(`${baseUrl}rider/create`, formData, auth?.accessToken);
	};

	const { mutate, isLoading: saving } = useMutation(create, {
		onSuccess: () => {
			queryClient.invalidateQueries("riders");
			toast.success("Rider created");
			setSuccessOpen(true);
			reset();
			setFile(null);
			setPreviewUrl("");
			setActiveStep(0);
		},
		onError: (e) => toast.error(e?.message || "Create failed"),
	});

	const onSubmit = (data) => mutate(data);
	// Step-specific required fields for gating
	const stepFieldMap = {
		0: [
			"FirstName",
			"LastName",
			"PhoneNumber",
			"EmergencyContact",
			"ContactAddress",
			"Email",
		],
		1: ["Password", "ConfirmPassword"],
		2: ["IdentityType", "IdentityNumber"],
	};

	const validateCurrentStep = async () => {
		const fields = stepFieldMap[activeStep] || [];
		if (fields.length === 0) return true;
		const valid = await trigger(fields);
		return valid;
	};

	const handleNext = async () => {
		const ok = await validateCurrentStep();
		if (ok) setActiveStep((s) => s + 1);
	};

	const currentStepFields = stepFieldMap[activeStep];
	const nextDisabled = !currentStepFields?.every((f) => !!watch(f));

	// Determine which sections to show based on active step
	const sectionsByStep = {
		0: ["personal"],
		1: ["account"],
		2: ["identity"],
	};
	const sections = sectionsByStep[activeStep];

	return (
		<Dialog
			open={open}
			onClose={() => handleClose?.({ type: "open" })}
			maxWidth="md"
			fullWidth>
			<Toaster />
			<DialogTitle>Create Rider</DialogTitle>
			<DialogContent dividers>
				<Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<Collapse in={successOpen} unmountOnExit>
					<Alert
						severity="success"
						onClose={() => setSuccessOpen(false)}
						sx={{ mb: 2 }}>
						Rider created successfully. You can create another or close.
					</Alert>
				</Collapse>
				<Box
					component="form"
					id="create-rider-form"
					onSubmit={handleSubmit(onSubmit)}>
					<RiderFormFields
						register={register}
						errors={errors}
						watch={watch}
						mode="create"
						fileError={fileError}
						onFileChange={handleFile}
						sections={sections}
						previewUrl={previewUrl}
						clearFile={clearFile}
					/>
				</Box>
				{(isSubmitting || saving) && <LinearProgress sx={{ mt: 2 }} />}
			</DialogContent>
			<DialogActions>
				<Button onClick={() => handleClose?.({ type: "open" })}>Cancel</Button>
				{activeStep > 0 && (
					<Button onClick={() => setActiveStep((s) => s - 1)}>Back</Button>
				)}
				{activeStep < steps.length - 1 ? (
					<Button
						disabled={nextDisabled}
						onClick={handleNext}
						variant="contained">
						Next
					</Button>
				) : (
					<Button
						type="submit"
						form="create-rider-form"
						variant="contained"
						disabled={!isValid || saving}>
						{saving ? "Saving..." : "Create Rider"}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default CreateRiderModal;
