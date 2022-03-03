import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const FormModal = ({ open, handleClose, title, formElement }) => {
	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{formElement}</DialogContent>
		</Dialog>
	);
};

export default FormModal;
