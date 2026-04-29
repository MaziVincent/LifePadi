import PackageDialog from "./PackageDialog";

interface RecievePackageProps {
	open: boolean;
	handleClose: (action: any) => void;
}

const RecievePackage = ({ open, handleClose }: RecievePackageProps) => (
	<PackageDialog kind="recieve" open={open} handleClose={handleClose} />
);

export default RecievePackage;
