import {
	createContext,
	useReducer,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";

export interface CartItem {
	id?: number;
	productId?: number;
	name?: string;
	price?: number;
	quantity?: number;
	[key: string]: unknown;
}

export interface CartState {
	deliveryAddress: unknown | null;
	deliveryInstruction: string;
	address: boolean;
	instruction: boolean;
	error: string;
	voucherError: string;
	addresses: unknown[];
	vendor: unknown | null;
	empty: boolean;
	vendorChange: boolean;
	deliveryFee: number;
	amount: number;
	total: number;
	checkOut: boolean;
	order: unknown | null;
	delivery: unknown | null;
	gift: boolean;
	voucherCode: string;
	voucher: unknown | null;
	voucherMessage: string;
	distance: number;
}

export type CartAction =
	| { type: "setAddress"; payload: unknown }
	| { type: "setInstruction"; payload: string }
	| { type: "address" }
	| { type: "instruction" }
	| { type: "error"; payload: string }
	| { type: "voucherError"; payload: string }
	| { type: "setAddresses"; payload: unknown[] }
	| { type: "vendor"; payload: unknown }
	| { type: "empty" }
	| { type: "vendorChange" }
	| { type: "deliveryFee"; payload: number }
	| { type: "amount"; payload: number }
	| { type: "total"; payload: number }
	| { type: "order"; payload: unknown }
	| { type: "delivery"; payload: unknown }
	| { type: "voucherCode"; payload: string }
	| { type: "voucher"; payload: unknown }
	| { type: "voucherMessage"; payload: string }
	| { type: "distance"; payload: number }
	| { type: "gift" }
	| { type: "checkOut" }
	| { type: "RESET" };

const initialState: CartState = {
	deliveryAddress: null,
	deliveryInstruction: "",
	address: false,
	instruction: false,
	error: "",
	voucherError: "",
	addresses: [],
	vendor: null,
	empty: false,
	vendorChange: false,
	deliveryFee: 0,
	amount: 0,
	total: 0,
	checkOut: false,
	order: null,
	delivery: null,
	gift: false,
	voucherCode: "",
	voucher: null,
	voucherMessage: "",
	distance: 0,
};

const reducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case "setAddress":
			return { ...state, deliveryAddress: action.payload };
		case "setInstruction":
			return { ...state, deliveryInstruction: action.payload };
		case "address":
			return { ...state, address: !state.address };
		case "instruction":
			return { ...state, instruction: !state.instruction };
		case "error":
			return { ...state, error: action.payload };
		case "voucherError":
			return { ...state, voucherError: action.payload };
		case "setAddresses":
			return { ...state, addresses: action.payload };
		case "vendor":
			return { ...state, vendor: action.payload };
		case "empty":
			return { ...state, empty: !state.empty };
		case "vendorChange":
			return { ...state, vendorChange: !state.vendorChange };
		case "deliveryFee":
			return { ...state, deliveryFee: action.payload };
		case "amount":
			return { ...state, amount: action.payload };
		case "total":
			return { ...state, total: action.payload };
		case "order":
			return { ...state, order: action.payload };
		case "delivery":
			return { ...state, delivery: action.payload };
		case "voucherCode":
			return { ...state, voucherCode: action.payload };
		case "voucher":
			return { ...state, voucher: action.payload };
		case "voucherMessage":
			return { ...state, voucherMessage: action.payload };
		case "distance":
			return { ...state, distance: action.payload };
		case "gift":
			return { ...state, gift: !state.gift };
		case "checkOut":
			return { ...state, checkOut: !state.checkOut };
		case "RESET":
			return initialState;
		default:
			return state;
	}
};

export interface CartContextValue {
	cart: CartItem[];
	setCart: Dispatch<SetStateAction<CartItem[]>>;
	cartState: boolean;
	setCartState: Dispatch<SetStateAction<boolean>>;
	state: CartState;
	dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue>({} as CartContextValue);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [cart, setCart] = useState<CartItem[]>([]);
	const [cartState, setCartState] = useState<boolean>(false);

	return (
		<CartContext.Provider
			value={{ cart, setCart, cartState, setCartState, state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
