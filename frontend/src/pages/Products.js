import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import ProductTable from "../components/Dashboard/tables/ProductTable";
import ProductCreateForm from "../components/Dashboard/Forms/ProductCreateForm";
import FormModal from "../components/FormModal";

const Products = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<FormModal
				open={open}
				handleClose={handleClose}
				title="Create New Product"
				width=""
				formElement={<ProductCreateForm setOpen={setOpen} />}
			/>
			<Box mb={4} display="flex" justifyContent="flex-end">
				<Button variant="contained" onClick={handleClickOpen}>
					<AddIcon /> New Product
				</Button>
			</Box>

			<ProductTable />
		</>
	);
};

export default Products;
