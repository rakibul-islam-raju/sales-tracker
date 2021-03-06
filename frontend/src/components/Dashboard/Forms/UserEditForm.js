import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { USER_EDIT_RESET } from "../../../redux/constants/userConstants";
import { listUsers, editUsers } from "../../../redux/actions/userActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";

const UserEditForm = ({ setOpen, editUser: initialData }) => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [isActive, setIsActive] = useState(true);

	const dispatch = useDispatch();

	// user edit state
	const userEdit = useSelector((state) => state.userEdit);
	const {
		loading: editLoading,
		error: editError,
		success: editSuccess,
	} = userEdit;

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		data.append("is_active", isActive);
		dispatch(editUsers(initialData.id, data));
	};

	useEffect(() => {
		if (editSuccess) {
			setOpen(false);
			dispatch({ type: USER_EDIT_RESET });
			dispatch(listUsers());
		}
	}, [editSuccess, dispatch, setOpen]);

	// set initial value
	useEffect(() => {
		// setProductData(initialData);
		if (initialData) {
			setFullname(initialData.fullname);
			setEmail(initialData.email);
			setIsActive(initialData.is_active);
		}
	}, [initialData]);

	return (
		<Box component="form" onSubmit={handleSubmit}>
			{editLoading && <Spinner />}
			{editError && typeof editError !== "object" && (
				<Messages type="error" text={editError} />
			)}

			<TextField
				autoFocus
				margin="dense"
				id="fullname"
				name="fullname"
				label="Full Name"
				type="text"
				fullWidth
				required
				autoComplete="false"
				variant="standard"
				value={fullname}
				error={editError?.name}
				helperText={editError?.name}
				onChange={(e) => setFullname(e.target.value)}
			/>

			<TextField
				margin="dense"
				id="email"
				name="email"
				label="Email Address"
				type="email"
				fullWidth
				required
				autoComplete="email"
				variant="standard"
				value={email}
				error={editError?.email}
				helperText={editError?.email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<FormControlLabel
				control={
					<Checkbox
						defaultChecked={initialData?.is_active}
						onChange={() => setIsActive(!isActive)}
					/>
				}
				id="is_active"
				name="is_active"
				label="Active"
			/>

			<Box display="flex" justifyContent="flex-end">
				<Button type="submit">Save</Button>
			</Box>
		</Box>
	);
};

export default UserEditForm;
