import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_RESET } from "../../../redux/constants/productConstants";
import {
	createProducts,
	listProducts,
} from "../../../redux/actions/productActions";

const ProductCreateForm = ({ setOpen, initialData }) => {
	const [name, setName] = useState(initialData?.name || null);
	const [price, setPrice] = useState(initialData?.price || null);
	const [quantity, setQuantity] = useState(initialData?.quantity || null);

	const dispatch = useDispatch();

	const productCreate = useSelector((state) => state.productCreate);
	const { loading, error, success } = productCreate;

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		dispatch(createProducts(data));
	};

	useEffect(() => {
		if (success) {
			setOpen(false);
			dispatch({ type: PRODUCT_CREATE_RESET });
			dispatch(listProducts());
		}
	}, [success, dispatch, setOpen]);

	return (
		<Box component="form" onSubmit={handleSubmit}>
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
				error={error?.name}
				helperText={error?.name}
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
					error={error?.price}
					helperText={error?.price}
				/>
				<TextField
					margin="dense"
					id="quantity"
					name="quantity"
					label="Product Quantity"
					type="number"
					variant="standard"
					value={quantity}
					error={error?.quantity}
					helperText={error?.quantity}
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
