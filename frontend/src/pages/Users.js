import React from "react";
import { listUsers } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import UserTable from "../components/Dashboard/tables/UserTable";
import UserCreateForm from "../components/Dashboard/Forms/UserCreateForm";
import UserEditForm from "../components/Dashboard/Forms/UserEditForm";
import SearchBox from "../components/SearchBox";

const Categories = () => {
	const [open, setOpen] = React.useState(false);
	const [editUser, setEditUser] = React.useState(null);
	const [searchVal, setSearchVal] = React.useState("");

	const dispatch = useDispatch();

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

	// search handler
	const handleSearch = (e) => {
		e.preventDefault();

		const params = `search=${searchVal}`;
		dispatch(listUsers(params));
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
				<SearchBox
					handleSearch={handleSearch}
					searchVal={searchVal}
					setSearchVal={setSearchVal}
				/>
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
