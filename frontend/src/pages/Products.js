import React from "react";
import { useDispatch } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "../components/Dashboard/tables/ProductTable";
import ProductCreateForm from "../components/Dashboard/Forms/ProductCreateForm";
import FormModal from "../components/FormModal";
import SearchBox from "../components/SearchBox";
import CachedIcon from "@mui/icons-material/Cached";

const Products = () => {
	const [open, setOpen] = React.useState(false);
	const [editProduct, setEditProduct] = React.useState(null);
	const [searchVal, setSearchVal] = React.useState("");

	const dispatch = useDispatch();

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

	const refreshPage = () => {
		dispatch(listProducts());
	};

	// product search handler
	const handleSearch = (e) => {
		e.preventDefault();

		const params = `search=${searchVal}`;
		dispatch(listProducts(params));
	};

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

			<Box
				mb={4}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<SearchBox
					searchVal={searchVal}
					setSearchVal={setSearchVal}
					handleSearch={handleSearch}
				/>

				<Box>
					<Button
						variant="contained"
						onClick={refreshPage}
						sx={{ mr: 1 }}
					>
						<CachedIcon />
					</Button>
					<Button variant="contained" onClick={handleProductCreate}>
						<AddIcon /> New Product
					</Button>
				</Box>
			</Box>

			<ProductTable
				handleProductEdit={handleProductEdit}
				searchVal={searchVal}
			/>
		</>
	);
};

export default Products;
