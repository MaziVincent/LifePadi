import PackageDialog from "./PackageDialog";

interface SendPackageProps {
	open: boolean;
	handleClose: (action: any) => void;
}

const SendPackage = ({ open, handleClose }: SendPackageProps) => (
	<PackageDialog kind="send" open={open} handleClose={handleClose} />
);

export default SendPackage;
