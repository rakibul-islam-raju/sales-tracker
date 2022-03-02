import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Spinner = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<CircularProgress />
		</Box>
	);
};

export default Spinner;
