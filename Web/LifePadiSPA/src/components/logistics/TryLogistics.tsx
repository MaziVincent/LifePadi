import { useReducer } from "react";
import { PackageCheck, PackageOpen } from "lucide-react";

import SendPackage from "./SendPackage";
import RecievePackage from "./RecievePackage";
import useAuth from "../../hooks/useAuth";

import { Card, CardContent } from "@/components/ui/card";

interface State {
	send: boolean;
	recieve: boolean;
	error: string;
}

type Action =
	| { type: "send" | "recieve" }
	| { type: "error"; payload: string };

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "send":
			return { ...state, send: !state.send };
		case "recieve":
			return { ...state, recieve: !state.recieve };
		case "error":
			return { ...state, error: action.payload };
		default:
			throw new Error();
	}
};

const TryLogistics = () => {
	const [state, dispatch] = useReducer(reducer, {
		send: false,
		recieve: false,
		error: "",
	});
	const { auth, setLogin } = useAuth() as { auth: any; setLogin: (v: boolean) => void };

	const handleClick = (action: "send" | "recieve") => {
		if (!auth.accessToken) {
			setLogin(true);
			return;
		}
		dispatch({ type: action });
	};

	return (
		<section className="bg-muted/30 py-20">
			<div className="container mx-auto flex flex-col items-center gap-8 px-4">
				<header className="text-center space-y-2 max-w-2xl">
					<h1 className="text-3xl md:text-4xl font-bold">Try Our Logistics</h1>
					<p className="text-muted-foreground">
						Send or receive packages anywhere — fast, secure, and tracked end to end.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-10/12">
					<Card
						onClick={() => handleClick("send")}
						className="cursor-pointer hover:shadow-lg transition overflow-hidden"
					>
						<CardContent className="p-0">
							<div className="bg-primary/10 p-6 flex items-center justify-center">
								<img
									src="https://res.cloudinary.com/dbxapeqzu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1737024495/LifePadi/others/send_package_mo83bl.png"
									alt="Send a package"
									loading="lazy"
									className="max-h-56 w-full object-contain"
								/>
							</div>
							<div className="p-5 flex items-center justify-center gap-3">
								<PackageCheck className="h-6 w-6 text-primary" />
								<h2 className="text-2xl font-bold">SEND PACKAGE</h2>
							</div>
						</CardContent>
					</Card>

					<Card
						onClick={() => handleClick("recieve")}
						className="cursor-pointer hover:shadow-lg transition overflow-hidden"
					>
						<CardContent className="p-0">
							<div className="bg-primary/10 p-6 flex items-center justify-center">
								<img
									src="https://res.cloudinary.com/dbxapeqzu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1737024536/LifePadi/others/recieve_package_el1dua.png"
									alt="Receive a package"
									loading="lazy"
									className="max-h-56 w-full object-contain"
								/>
							</div>
							<div className="p-5 flex items-center justify-center gap-3">
								<PackageOpen className="h-6 w-6 text-primary" />
								<h2 className="text-2xl font-bold">RECEIVE A PACKAGE</h2>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			<SendPackage open={state.send} handleClose={dispatch} />
			<RecievePackage open={state.recieve} handleClose={dispatch} />
		</section>
	);
};

export default TryLogistics;
