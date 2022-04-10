import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import CategoryTable from "../components/Dashboard/tables/CategoryTable";
import CategoryCreateForm from "../components/Dashboard/Forms/CategoryCreateForm";
import SearchBox from "../components/SearchBox";
import { listCategories } from "../redux/actions/categoryActions";
import { useDispatch } from "react-redux";
import CachedIcon from "@mui/icons-material/Cached";

const Categories = () => {
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

	const refreshPage = () => {
		dispatch(listCategories());
	};

	// search handler
	const handleSearch = (e) => {
		e.preventDefault();

		const params = `search=${searchVal}`;
		dispatch(listCategories(params));
	};

	return (
		<>
			<FormModal
				open={open}
				handleClose={handleClose}
				title={editCategory ? "Edit Category" : "Create New Category"}
				formElement={
					<CategoryCreateForm
						editCategory={editCategory}
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
					handleSearch={handleSearch}
					searchVal={searchVal}
					setSearchVal={setSearchVal}
				/>

				<Box>
					<Button
						variant="contained"
						onClick={refreshPage}
						sx={{ mr: 1 }}
					>
						<CachedIcon />
					</Button>
					<Button variant="contained" onClick={handleCategoryCreate}>
						<AddIcon /> New Category
					</Button>
				</Box>
			</Box>

			<CategoryTable handleCategoryEdit={handleCategoryEdit} />
		</>
	);
};

export default Categories;
