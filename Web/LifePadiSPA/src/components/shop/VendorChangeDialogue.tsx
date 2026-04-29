import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useCart from "@/hooks/useCart";

interface VendorChangeDialogueProps {
	addToCart: (product: unknown) => void;
	product: unknown;
	vendor: unknown;
}

const VendorChangeDialogue = ({
	addToCart,
	product,
	vendor,
}: VendorChangeDialogueProps) => {
	const { state, dispatch } = useCart();

	const handleVendorChange = () => {
		addToCart(product);
		dispatch({ type: "vendor", payload: vendor });
		localStorage.setItem("currentVendor", JSON.stringify(vendor));
		dispatch({ type: "vendorChange" });
	};

	return (
		<AlertDialog
			open={Boolean(state.vendorChange)}
			onOpenChange={() => dispatch({ type: "vendorChange" })}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Switch to another vendor?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will remove your current cart items.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>No, cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleVendorChange}>
						Yes, switch vendor
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default VendorChangeDialogue;
