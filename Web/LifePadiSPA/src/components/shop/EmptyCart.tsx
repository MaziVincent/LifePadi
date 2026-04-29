import emptyCart from "@/assets/images/empty cart.svg";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useCart from "@/hooks/useCart";

const EmptyCart = () => {
	const { state, dispatch } = useCart();
	return (
		<Dialog
			open={Boolean(state.empty)}
			onOpenChange={() => dispatch({ type: "empty" })}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Your cart is empty</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center gap-4 py-2 text-center text-muted-foreground">
					<img src={emptyCart} alt="Empty cart" className="h-44 w-auto" />
					<p>Add items from a vendor to get started.</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EmptyCart;
