import { MoreHorizontal, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LongMenuProps {
	view: (id: number | string) => void;
	dispatch: (action: any) => void;
	id: number | string;
}

export default function LongMenu({ view, dispatch, id }: LongMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Order actions"
					className="text-emerald-600 hover:text-emerald-700">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => view(id)}>
					<Eye className="mr-2 h-4 w-4 text-emerald-600" />
					View Order
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						dispatch({ type: "edit" });
						dispatch({ type: "id", payload: id });
					}}>
					<Pencil className="mr-2 h-4 w-4 text-blue-600" />
					Edit Status
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
