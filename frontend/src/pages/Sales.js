import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import CategoryTable from "../components/Dashboard/tables/CategoryTable";
import CategoryCreateForm from "../components/Dashboard/Forms/CategoryCreateForm";
import SearchBox from "../components/SearchBox";
import { listCategories } from "../redux/actions/categoryActions";
import { useDispatch } from "react-redux";
import { Autocomplete, Grid, TextField } from "@mui/material";
import SaleCreateForm from "../components/Dashboard/Forms/SaleCreateForm";
import SaleProductsTable from "../components/Dashboard/tables/SaleProductsTable";

const Sales = () => {
	const [open, setOpen] = React.useState(false);
	const [editCategory, setEditCategory] = React.useState(null);
	const [searchVal, setSearchVal] = React.useState("");

	const dispatch = useDispatch();

	// modal close handler
	const handleClose = () => {
		setOpen(false);
	};

	// category create handler
	const handleCategoryCreate = () => {
		setEditCategory(null);
		setOpen(true);
	};

	// category edit handler
	const handleCategoryEdit = (product) => {
		setEditCategory(product);
		setOpen(true);
	};

	// search handler
	const handleSearch = (e) => {
		e.preventDefault();

		const params = `search=${searchVal}`;
		dispatch(listCategories(params));
	};

	return (
		<Grid container spacing={2} columns={12}>
			<Grid item md={8}>
				<SaleCreateForm />
			</Grid>
			<Grid item md={4}>
				<Paper elevation={1} sx={{ padding: "10px" }}>
					asdfa sdf asdf
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Sales;
