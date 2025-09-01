import { useState } from "react";
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import { useQueryClient } from "react-query";
import { toggolProductStatusUrl } from "./vendorUri/VendorURI";
import {
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { ViewModal, DeleteModal, ToggleStatusModal } from "./VendorModals";
import UpdateProductModal from "./UpdateProductModal";

const VendorActions = ({ product }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const [openViewModal, setOpenViewModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openToggleStatusModal, setOpenToggleStatusModal] = useState(false);
	const update = useUpdate();
	const { auth } = useAuth();
	const queryClient = useQueryClient();

	const handleToggleStatus = async (p) => {
		if (!p?.Id) return;
		const url = toggolProductStatusUrl.replace("{id}", p.Id);
		await update(url, {}, auth.accessToken);
		// Invalidate product lists & stats so UI refreshes
		queryClient.invalidateQueries("vendorProducts");
		queryClient.invalidateQueries("vendorProductsList");
		queryClient.invalidateQueries("vendorProductStats");
	};

	return (
		<>
			<Tooltip title="Actions">
				<IconButton
					size="medium"
					sx={{ color: "black" }}
					onClick={handleClick}
					aria-label="actions">
					<MoreVertIcon />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}>
				<MenuItem
					onClick={() => {
						handleClose();
						setOpenViewModal(true);
					}}>
					<ListItemIcon>
						<VisibilityIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="View" />
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						setOpenToggleStatusModal(true);
					}}>
					<ListItemIcon>
						{product.Status ? (
							<ToggleOffIcon fontSize="small" />
						) : (
							<ToggleOnIcon fontSize="small" />
						)}
					</ListItemIcon>
					<ListItemText primary={product.Status ? "Deactivate" : "Activate"} />
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						setOpenUpdateModal(true);
					}}>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Update" />
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						setOpenDeleteModal(true);
					}}>
					<ListItemIcon>
						<DeleteIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Delete" />
				</MenuItem>
			</Menu>
			<ViewModal
				product={product}
				openViewModal={openViewModal}
				setOpenViewModal={setOpenViewModal}
			/>
			<UpdateProductModal
				open={openUpdateModal}
				onClose={() => setOpenUpdateModal(false)}
				product={product}
			/>
			<DeleteModal
				product={product}
				openDeleteModal={openDeleteModal}
				setOpenDeleteModal={setOpenDeleteModal}
			/>
			<ToggleStatusModal
				product={product}
				open={openToggleStatusModal}
				onClose={() => setOpenToggleStatusModal(false)}
				onToggle={handleToggleStatus}
			/>
		</>
	);
};

export default VendorActions;
