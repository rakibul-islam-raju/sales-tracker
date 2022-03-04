import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

const ConfirmModal = (props) => {
	const { onClose, value: valueProp, open, title, desc, ...other } = props;
	const [value, setValue] = React.useState(valueProp || false);
	const radioGroupRef = React.useRef(null);

	React.useEffect(() => {
		if (!open) {
			setValue(valueProp);
		}
	}, [valueProp, open]);

	const handleEntering = () => {
		if (radioGroupRef.current != null) {
			radioGroupRef.current.focus();
		}
	};

	const handleCancel = () => {
		onClose();
	};

	const handleOk = () => {
		onClose(value);
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<Dialog
			sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
			maxWidth="xs"
			TransitionProps={{ onEntering: handleEntering }}
			open={open}
			{...other}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>
				<Typography paragraph>{desc}</Typography>
				<RadioGroup
					ref={radioGroupRef}
					aria-label="confirmation"
					name="confirmation"
					value={value}
					onChange={handleChange}
				>
					<FormControlLabel
						value={true}
						key="YES"
						control={<Radio />}
						label="YES"
					/>
					<FormControlLabel
						value={false}
						key="NO"
						control={<Radio />}
						label="NO"
					/>
				</RadioGroup>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleCancel}>
					Cancel
				</Button>
				<Button onClick={handleOk}>Ok</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmModal;

ConfirmModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
};
