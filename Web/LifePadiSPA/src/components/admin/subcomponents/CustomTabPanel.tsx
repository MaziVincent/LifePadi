import PropTypes from "prop-types";
import type { ReactNode } from "react";

interface CustomTabPanelProps {
	children?: ReactNode;
	value: number;
	index: number;
	[key: string]: unknown;
}

function CustomTabPanel(props: CustomTabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <div className="p-6">{children}</div>}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

export default CustomTabPanel;
