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
import {
	USER_CREATE_RESET,
	USER_EDIT_RESET,
} from "../../../redux/constants/userConstants";
import {
	listUsers,
	createUsers,
	editUsers,
} from "../../../redux/actions/userActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";

const UserCreateForm = ({ setOpen, editUser: initialData }) => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");

	const dispatch = useDispatch();

	// user create state
	const userCreate = useSelector((state) => state.userCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = userCreate;

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

		if (!initialData) {
			dispatch(createUsers(data));
		} else {
			dispatch(editUsers(initialData.id, data));
		}
	};

	useEffect(() => {
		if (createSuccess) {
			setOpen(false);
			dispatch({ type: USER_CREATE_RESET });
			dispatch(listUsers());
		}
		if (editSuccess) {
			setOpen(false);
			dispatch({ type: USER_EDIT_RESET });
			dispatch(listUsers());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createSuccess, editSuccess, dispatch, setOpen]);

	// set initial value
	useEffect(() => {
		// setProductData(initialData);
		if (initialData) {
			setFullname(initialData.fullname);
			setEmail(initialData.email);
			setRole(initialData.role);
		} else {
			setFullname("");
			setEmail("");
			setRole("");
		}
	}, [initialData]);

	return (
		<Box component="form" onSubmit={handleSubmit}>
			{(createLoading || editLoading) && <Spinner />}
			{editError && typeof editError !== "object" && (
				<Messages type="error" text={editError} />
			)}
			{createError && typeof createError !== "object" && (
				<Messages type="error" text={createError} />
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
				error={createError?.name || editError?.name}
				helperText={createError?.name || editError?.name}
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
				error={createError?.email || editError?.email}
				helperText={createError?.email || editError?.email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<FormControl
				variant="standard"
				fullWidth
				margin="dense"
				error={createError?.role || editError?.role}
			>
				<InputLabel id="role">Role</InputLabel>
				<Select
					labelId="role"
					id="role"
					name="role"
					value={role}
					label="role"
					onChange={(e) => setRole(e.target.value)}
				>
					{["salesman", "manager"]?.map((item) => (
						<MenuItem key={item} value={item}>
							{item}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>
					{createError?.role[0] || editError?.role[0]}
				</FormHelperText>
			</FormControl>

			<FormControlLabel
				control={
					<Checkbox defaultChecked={initialData?.is_active || true} />
				}
				name="is_active"
				label="Active"
			/>

			<Box display="flex" justifyContent="flex-end">
				<Button type="submit">Save</Button>
			</Box>
		</Box>
	);
};

export default UserCreateForm;
