import {
	TextField,
	Grid,
	MenuItem,
	Typography,
	Box,
	Alert,
	IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

const idTypes = ["National ID", "Voters Card", "Drivers Licence"];

// Section rendering helpers keep grouping logic simple & make Stepper segmentation easy.
function PersonalSection({ register, errors }) {
	return (
		<>
			<Grid item xs={12} sm={6}>
				<TextField
					label="First Name"
					fullWidth
					{...register("FirstName", { required: "First name required" })}
					error={!!errors.FirstName}
					helperText={errors.FirstName?.message}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Last Name"
					fullWidth
					{...register("LastName", { required: "Last name required" })}
					error={!!errors.LastName}
					helperText={errors.LastName?.message}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Phone Number"
					fullWidth
					{...register("PhoneNumber", { required: "Phone number required" })}
					error={!!errors.PhoneNumber}
					helperText={errors.PhoneNumber?.message}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Emergency Contact"
					fullWidth
					{...register("EmergencyContact", {
						required: "Emergency contact required",
					})}
					error={!!errors.EmergencyContact}
					helperText={errors.EmergencyContact?.message}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Contact Address"
					fullWidth
					multiline
					minRows={2}
					{...register("ContactAddress", {
						required: "Contact address required",
					})}
					error={!!errors.ContactAddress}
					helperText={errors.ContactAddress?.message}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Email Address"
					type="email"
					fullWidth
					{...register("Email", {
						required: "Email required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Invalid email",
						},
					})}
					error={!!errors.Email}
					helperText={errors.Email?.message}
				/>
			</Grid>
		</>
	);
}

function AccountSection({ register, errors, watch, mode }) {
	if (mode !== "create") return null; // only on create
	return (
		<>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Password"
					type="password"
					fullWidth
					{...register("Password", {
						required: "Password required",
						minLength: { value: 4, message: "Min 4 chars" },
					})}
					error={!!errors.Password}
					helperText={errors.Password?.message}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Confirm Password"
					type="password"
					fullWidth
					{...register("ConfirmPassword", {
						required: "Confirm password",
						validate: (v) =>
							v === watch("Password") || "Passwords do not match",
					})}
					error={!!errors.ConfirmPassword}
					helperText={errors.ConfirmPassword?.message}
				/>
			</Grid>
		</>
	);
}

function IdentitySection({
	register,
	errors,
	fileError,
	onFileChange,
	previewUrl,
	existingIdentityUrl,
	clearFile,
}) {
	return (
		<>
			<Grid item xs={12} sm={6}>
				<TextField
					select
					label="Identity Type"
					fullWidth
					defaultValue=""
					{...register("IdentityType", { required: "Identity type required" })}
					error={!!errors.IdentityType}
					helperText={errors.IdentityType?.message}>
					{idTypes.map((t) => (
						<MenuItem key={t} value={t}>
							{t}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Identity Number"
					fullWidth
					{...register("IdentityNumber", {
						required: "Identity number required",
						minLength: { value: 6, message: "Too short" },
					})}
					error={!!errors.IdentityNumber}
					helperText={errors.IdentityNumber?.message}
				/>
			</Grid>
			<Grid item xs={12}>
				<Box
					sx={{
						display: "flex",
						gap: 2,
						alignItems: "flex-start",
						flexWrap: "wrap",
					}}>
					<Box>
						<input
							type="file"
							accept="image/*"
							onChange={onFileChange}
							style={{ marginTop: 8 }}
						/>
						{fileError && (
							<Alert severity="error" sx={{ mt: 1 }}>
								{fileError}
							</Alert>
						)}
						<Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
							Max 200KB image.
						</Typography>
					</Box>
					{(previewUrl || existingIdentityUrl) && (
						<Box sx={{ position: "relative" }}>
							<img
								src={previewUrl || existingIdentityUrl}
								alt="Identity preview"
								style={{
									width: 150,
									height: 150,
									objectFit: "cover",
									borderRadius: 8,
									boxShadow: "0 0 4px rgba(0,0,0,0.15)",
								}}
							/>
							{previewUrl && (
								<IconButton
									size="small"
									onClick={clearFile}
									sx={{
										position: "absolute",
										top: 2,
										right: 2,
										bgcolor: "rgba(0,0,0,0.4)",
										color: "#fff",
										"&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
									}}>
									<CloseIcon fontSize="small" />
								</IconButton>
							)}
						</Box>
					)}
				</Box>
			</Grid>
		</>
	);
}

export default function RiderFormFields({
	register,
	errors,
	watch,
	mode,
	fileError,
	onFileChange,
	sections = ["personal", "account", "identity"],
	previewUrl,
	existingIdentityUrl,
	clearFile,
}) {
	return (
		<Box>
			<Grid container spacing={2} sx={{ mt: 0 }}>
				{sections.includes("personal") && (
					<PersonalSection register={register} errors={errors} />
				)}
				{sections.includes("account") && (
					<AccountSection
						register={register}
						errors={errors}
						watch={watch}
						mode={mode}
					/>
				)}
				{sections.includes("identity") && (
					<IdentitySection
						register={register}
						errors={errors}
						fileError={fileError}
						onFileChange={onFileChange}
						previewUrl={previewUrl}
						existingIdentityUrl={existingIdentityUrl}
						clearFile={clearFile}
					/>
				)}
			</Grid>
		</Box>
	);
}

RiderFormFields.propTypes = {
	register: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	watch: PropTypes.func.isRequired,
	mode: PropTypes.string,
	fileError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	onFileChange: PropTypes.func,
	sections: PropTypes.arrayOf(PropTypes.string),
	previewUrl: PropTypes.string,
	existingIdentityUrl: PropTypes.string,
	clearFile: PropTypes.func,
};
