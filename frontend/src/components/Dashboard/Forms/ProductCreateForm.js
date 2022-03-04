import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_EDIT_RESET,
} from "../../../redux/constants/productConstants";
import {
	listProducts,
	createProducts,
	editProducts,
} from "../../../redux/actions/productActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";

const ProductCreateForm = ({ setOpen, editProduct: initialData }) => {
	const [name, setName] = useState(initialData?.name || null);
	const [price, setPrice] = useState(initialData?.price || null);
	const [quantity, setQuantity] = useState(initialData?.quantity || null);

	const dispatch = useDispatch();

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = productCreate;

	const productEdit = useSelector((state) => state.productEdit);
	const {
		loading: editLoading,
		error: editError,
		success: editSuccess,
	} = productEdit;

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		if (!initialData) {
			dispatch(createProducts(data));
		} else {
			dispatch(editProducts(initialData.id, data));
		}
	};

	useEffect(() => {
		if (createSuccess) {
			setOpen(false);
			dispatch({ type: PRODUCT_CREATE_RESET });
			dispatch(listProducts());
		} else if (editSuccess) {
			setOpen(false);
			dispatch({ type: PRODUCT_EDIT_RESET });
			dispatch(listProducts());
		}
	}, [createSuccess, editSuccess, dispatch, setOpen]);

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
				label="Product Name"
				type="text"
				fullWidth
				variant="standard"
				value={name}
				error={createError?.name || editError?.name}
				helperText={createError?.name || createError?.name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Box display="flex" justifyContent="space-between">
				<TextField
					margin="dense"
					id="price"
					name="price"
					label="Product Price"
					type="number"
					variant="standard"
					value={price}
					error={createError?.price || editError?.price}
					helperText={createError?.price || createError?.price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="quantity"
					name="quantity"
					label="Product Quantity"
					type="number"
					variant="standard"
					value={quantity}
					error={createError?.quantity || editError?.quantity}
					helperText={createError?.quantity || createError?.quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
			</Box>
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

export default ProductCreateForm;
