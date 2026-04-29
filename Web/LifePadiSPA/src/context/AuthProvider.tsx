import {
	createContext,
	useState,
	type ReactNode,
	type Dispatch,
	type SetStateAction,
} from "react";

export interface AuthState {
	[key: string]: unknown;
	accessToken?: string;
	id?: number;
	role?: string;
	roles?: string[];
}

export interface LocationState {
	[key: string]: unknown;
}

export interface AuthContextValue {
	auth: AuthState;
	setAuth: Dispatch<SetStateAction<AuthState>>;
	persist: boolean;
	setPersist: Dispatch<SetStateAction<boolean>>;
	login: boolean;
	setLogin: Dispatch<SetStateAction<boolean>>;
	location: LocationState;
	setLocation: Dispatch<SetStateAction<LocationState>>;
	reg: boolean;
	setRegister: Dispatch<SetStateAction<boolean>>;
	verify: boolean;
	setVerify: Dispatch<SetStateAction<boolean>>;
	regData: Record<string, unknown>;
	setRegData: Dispatch<SetStateAction<Record<string, unknown>>>;
	verificationInfo: Record<string, unknown>;
	setVerificationInfo: Dispatch<SetStateAction<Record<string, unknown>>>;
	verifyOTP: boolean;
	setVerifyOTP: Dispatch<SetStateAction<boolean>>;
	forgotPassword: boolean;
	setForgotPassword: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<AuthState>({});

	const getPersistValue = (): boolean => {
		const raw = localStorage.getItem("persist");
		if (raw == null || raw === "undefined") return false;
		try {
			return Boolean(JSON.parse(raw));
		} catch {
			return false;
		}
	};

	const [persist, setPersist] = useState<boolean>(getPersistValue());
	const [login, setLogin] = useState<boolean>(false);
	const [reg, setRegister] = useState<boolean>(false);
	const [location, setLocation] = useState<LocationState>({});
	const [verify, setVerify] = useState<boolean>(false);
	const [verifyOTP, setVerifyOTP] = useState<boolean>(false);
	const [regData, setRegData] = useState<Record<string, unknown>>({});
	const [verificationInfo, setVerificationInfo] = useState<
		Record<string, unknown>
	>({});
	const [forgotPassword, setForgotPassword] = useState<boolean>(false);

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				persist,
				setPersist,
				login,
				setLogin,
				location,
				setLocation,
				reg,
				setRegister,
				verify,
				setVerify,
				regData,
				setRegData,
				verificationInfo,
				setVerificationInfo,
				verifyOTP,
				setVerifyOTP,
				forgotPassword,
				setForgotPassword,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
