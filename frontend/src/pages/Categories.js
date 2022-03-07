import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import CategoryTable from "../components/Dashboard/tables/CategoryTable";
import CategoryCreateForm from "../components/Dashboard/Forms/CategoryCreateForm";

const Categories = () => {
	const [open, setOpen] = React.useState(false);
	const [editCategory, setEditCategory] = React.useState(null);

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

			<Box mb={4} display="flex" justifyContent="flex-end">
				<Button variant="contained" onClick={handleCategoryCreate}>
					<AddIcon /> New Category
				</Button>
			</Box>

			<CategoryTable handleCategoryEdit={handleCategoryEdit} />
		</>
	);
};

export default Categories;
