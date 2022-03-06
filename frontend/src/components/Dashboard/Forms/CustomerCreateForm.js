import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
	CUSTOMER_CREATE_RESET,
	CUSTOMER_EDIT_RESET,
} from "../../../redux/constants/customerConstants";
import {
	listCustomers,
	createCustomers,
	editCustomers,
} from "../../../redux/actions/customerActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";

const CustomerCreateForm = ({ setOpen, editCustomer: initialData }) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();

	// customer create state
	const customerCreate = useSelector((state) => state.customerCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = customerCreate;

	// customer edit state
	const customerEdit = useSelector((state) => state.customerEdit);
	const {
		loading: editLoading,
		error: editError,
		success: editSuccess,
	} = customerEdit;

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		if (!initialData) {
			dispatch(createCustomers(data));
		} else {
			dispatch(editCustomers(initialData.id, data));
		}
	};

	useEffect(() => {
		if (createSuccess) {
			setOpen(false);
			dispatch({ type: CUSTOMER_CREATE_RESET });
			dispatch(listCustomers());
		}
		if (editSuccess) {
			setOpen(false);
			dispatch({ type: CUSTOMER_EDIT_RESET });
			dispatch(listCustomers());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createSuccess, editSuccess, dispatch, setOpen]);

	// set initial value
	useEffect(() => {
		// setProductData(initialData);
		if (initialData) {
			setName(initialData.name);
			setPhone(initialData.phone);
			setEmail(initialData.email);
		} else {
			setName("");
			setPhone("");
			setEmail("");
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
				id="name"
				name="name"
				label="Full Name"
				type="text"
				fullWidth
				required
				autoComplete="false"
				variant="standard"
				value={name}
				error={createError?.name || editError?.name}
				helperText={createError?.name || editError?.name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextField
				autoFocus
				margin="dense"
				id="phone"
				name="phone"
				label="Phone Number"
				type="tel"
				fullWidth
				required
				autoComplete="false"
				variant="standard"
				value={phone}
				error={createError?.phone || editError?.phone}
				helperText={createError?.phone || editError?.phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<TextField
				autoFocus
				margin="dense"
				id="email"
				name="email"
				label="Email Address"
				type="email"
				fullWidth
				autoComplete="email"
				variant="standard"
				value={email}
				error={createError?.email || editError?.email}
				helperText={createError?.email || editError?.email}
				onChange={(e) => setEmail(e.target.value)}
			/>

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

export default CustomerCreateForm;
