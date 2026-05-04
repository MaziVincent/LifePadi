/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateModal } from "./RiderModal";

const FadeMenu = ({ delivery }: { delivery: any }) => {
	const navigate = useNavigate();
	const [openUpdateModal, setOpenUpdateModal] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" aria-label="Delivery actions">
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => navigate(`delivery/${delivery.Id}`)}>
						<Eye className="mr-2 h-4 w-4" />
						View
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpenUpdateModal(true)}>
						<CheckCircle2 className="mr-2 h-4 w-4" />
						Mark Delivered
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<UpdateModal
				delivery={delivery}
				openUpdateModal={openUpdateModal}
				setOpenUpdateModal={setOpenUpdateModal}
			/>
		</>
	);
};

export default FadeMenu;
