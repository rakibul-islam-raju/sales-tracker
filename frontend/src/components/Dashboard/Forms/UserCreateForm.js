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
import { USER_CREATE_RESET } from "../../../redux/constants/userConstants";
import { listUsers, createUsers } from "../../../redux/actions/userActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";

const UserCreateForm = ({ setOpen }) => {
	const [fullname, setFullname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isActive, setIsActive] = useState(true);

	const dispatch = useDispatch();

	// user create state
	const userCreate = useSelector((state) => state.userCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = userCreate;

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		data.append("is_active", isActive);
		dispatch(createUsers(data));
	};

	useEffect(() => {
		if (createSuccess) {
			setOpen(false);
			dispatch({ type: USER_CREATE_RESET });
			dispatch(listUsers());

			setFullname("");
			setEmail("");
			setPassword("");
			setIsActive(true);
		}
	}, [createSuccess, dispatch, setOpen]);

	return (
		<Box component="form" onSubmit={handleSubmit}>
			{createLoading && <Spinner />}

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
				error={createError?.name}
				helperText={createError?.name}
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
				error={createError?.email}
				helperText={createError?.email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<TextField
				margin="dense"
				id="password"
				name="password"
				label="Password"
				type="password"
				fullWidth
				required
				autoComplete="email"
				variant="standard"
				value={password}
				error={createError?.password}
				helperText={createError?.password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<FormControlLabel
				control={
					<Checkbox
						defaultChecked={isActive}
						onChange={() => setIsActive(!isActive)}
					/>
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
