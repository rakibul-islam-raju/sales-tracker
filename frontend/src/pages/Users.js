import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import UserTable from "../components/Dashboard/tables/UserTable";
import UserCreateForm from "../components/Dashboard/Forms/UserCreateForm";
import { useSelector } from "react-redux";
import UserEditForm from "../components/Dashboard/Forms/UserEditForm";
import SearchBox from "../components/SearchBox";

const Categories = () => {
	const [open, setOpen] = React.useState(false);
	const [editUser, setEditUser] = React.useState(null);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

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
				title={editUser ? "Edit User" : "Create New User"}
				formElement={
					editUser ? (
						<UserEditForm editUser={editUser} setOpen={setOpen} />
					) : (
						<UserCreateForm setOpen={setOpen} />
					)
				}
			/>

			<Box
				mb={4}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<SearchBox />
				{userInfo?.is_staff && (
					<Button variant="contained" onClick={handleUserCreate}>
						<AddIcon /> New User
					</Button>
				)}
			</Box>

			<UserTable handleCategoryEdit={handleUserEdit} />
		</>
	);
};

export default Categories;
