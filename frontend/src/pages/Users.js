import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import UserTable from "../components/Dashboard/tables/UserTable";
import UserCreateForm from "../components/Dashboard/Forms/UserCreateForm";

const Categories = () => {
	const [open, setOpen] = React.useState(false);
	const [editUser, setEditUser] = React.useState(null);

	// modal close handler
	const handleClose = () => {
		setOpen(false);
	};

	// user create handler
	const handleUserCreate = () => {
		setEditUser(null);
		setOpen(true);
	};

	// user edit handler
	const handleUserEdit = (user) => {
		setEditUser(user);
		setOpen(true);
	};

	return (
		<>
			<FormModal
				open={open}
				handleClose={handleClose}
				title="Create New User"
				formElement={
					<UserCreateForm editUser={editUser} setOpen={setOpen} />
				}
			/>

			{/* <Box mb={4} display="flex" justifyContent="flex-end">
				<Button variant="contained" onClick={handleUserCreate}>
					<AddIcon /> New User
				</Button>
			</Box> */}

			<UserTable handleCategoryEdit={handleUserEdit} />
		</>
	);
};

export default Categories;
