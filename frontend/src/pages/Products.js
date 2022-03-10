import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "../components/Dashboard/tables/ProductTable";
import ProductCreateForm from "../components/Dashboard/Forms/ProductCreateForm";
import FormModal from "../components/FormModal";

const Products = () => {
	const [open, setOpen] = React.useState(false);
	const [editProduct, setEditProduct] = React.useState(null);

	// modal close handler
	const handleClose = () => {
		setOpen(false);
	};

	// product create handler
	const handleProductCreate = () => {
		setEditProduct(null);
		setOpen(true);
	};

	// product edit handler
	const handleProductEdit = (product) => {
		setEditProduct(product);
		setOpen(true);
	};

	console.log("product page");

	return (
		<>
			<FormModal
				open={open}
				handleClose={handleClose}
				title={editProduct ? "Edit Product" : "Create New Product"}
				formElement={
					<ProductCreateForm
						editProduct={editProduct}
						setOpen={setOpen}
					/>
				}
			/>

			<Box mb={4} display="flex" justifyContent="flex-end">
				<Button variant="contained" onClick={handleProductCreate}>
					<AddIcon /> New Product
				</Button>
			</Box>

			<ProductTable handleProductEdit={handleProductEdit} />
		</>
	);
};

export default Products;
