import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
	CATEGORY_CREATE_RESET,
	CATEGORY_EDIT_RESET,
} from "../../../redux/constants/categoryConstants";
import {
	listCategories,
	createCategories,
	editCategories,
} from "../../../redux/actions/categoryActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";

const CategoryCreateForm = ({ setOpen, editCategory: initialData }) => {
	const [name, setName] = useState("");
	const [isActive, setIsActive] = useState(true);

	const dispatch = useDispatch();

	// category create state
	const categoryCreate = useSelector((state) => state.categoryCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = categoryCreate;

	// category edit state
	const categoryEdit = useSelector((state) => state.categoryEdit);
	const {
		loading: editLoading,
		error: editError,
		success: editSuccess,
	} = categoryEdit;

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		data.append("is_active", isActive);
		if (!initialData) {
			dispatch(createCategories(data));
		} else {
			dispatch(editCategories(initialData.id, data));
		}
	};

	useEffect(() => {
		if (createSuccess) {
			setOpen(false);
			dispatch({ type: CATEGORY_CREATE_RESET });
			dispatch(listCategories());
			setName("");
			setIsActive(true);
		}
		if (editSuccess) {
			setOpen(false);
			dispatch({ type: CATEGORY_EDIT_RESET });
			dispatch(listCategories());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createSuccess, editSuccess, dispatch, setOpen]);

	// set initial value
	useEffect(() => {
		if (initialData) {
			setName(initialData.name);
			setIsActive(initialData.is_active);
		} else {
			setName("");
			setIsActive(true);
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
				label="Category Name"
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

export default CategoryCreateForm;
