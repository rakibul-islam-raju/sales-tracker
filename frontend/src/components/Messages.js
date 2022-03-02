import Alert from "@mui/material/Alert";

const Messages = ({ type, text }) => {
	console.log("text =>>", text);
	return (
		<Alert variant="filled" severity={type} sx={{ my: 2 }}>
			{text}
		</Alert>
	);
};

export default Messages;
