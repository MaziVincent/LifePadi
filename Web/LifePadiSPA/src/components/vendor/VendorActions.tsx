import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
	MoreVertical,
	Eye,
	Pencil,
	Trash2,
	ToggleLeft,
	ToggleRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUpdate from "../../hooks/useUpdate";
import useAuth from "../../hooks/useAuth";
import { toggolProductStatusUrl } from "./vendorUri/VendorURI";
import { ViewModal, DeleteModal, ToggleStatusModal } from "./VendorModals";
import UpdateProductModal from "./UpdateProductModal";

const VendorActions = ({ product }: { product: any }) => {
	const [openViewModal, setOpenViewModal] = useState(false);
	const [openUpdateModal, setOpenUpdateModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openToggleStatusModal, setOpenToggleStatusModal] = useState(false);
	const update = useUpdate();
	const { auth } = useAuth();
	const queryClient = useQueryClient();

	const handleToggleStatus = async (p: any) => {
		if (!p?.Id) return;
		const url = toggolProductStatusUrl.replace("{id}", p.Id);
		await update(url, {}, auth.accessToken);
		queryClient.invalidateQueries({ queryKey: ["vendorProducts"] });
		queryClient.invalidateQueries({ queryKey: ["vendorProductsList"] });
		queryClient.invalidateQueries({ queryKey: ["vendorProductStats"] });
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" aria-label="Actions">
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setOpenViewModal(true)}>
						<Eye className="mr-2 h-4 w-4" /> View
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenToggleStatusModal(true)}>
						{product.Status ? (
							<ToggleLeft className="mr-2 h-4 w-4" />
						) : (
							<ToggleRight className="mr-2 h-4 w-4" />
						)}
						{product.Status ? "Deactivate" : "Activate"}
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenUpdateModal(true)}>
						<Pencil className="mr-2 h-4 w-4" /> Update
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setOpenDeleteModal(true)}
						className="text-destructive focus:text-destructive">
						<Trash2 className="mr-2 h-4 w-4" /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

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
