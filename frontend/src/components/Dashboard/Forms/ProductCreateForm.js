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
import { listCategories } from "../../../redux/actions/categoryActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";

const ProductCreateForm = ({ setOpen, editProduct: initialData }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [category, setCategory] = useState(0);

	const dispatch = useDispatch();

	console.log("product create form");

	// product create state
	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = productCreate;

	// product edit state
	const productEdit = useSelector((state) => state.productEdit);
	const {
		loading: editLoading,
		error: editError,
		success: editSuccess,
	} = productEdit;

	// categories list state
	const categoryList = useSelector((state) => state.categoryList);
	const {
		loading: categoryLoading,
		error: categoryError,
		categories,
	} = categoryList;

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
		}
		if (editSuccess) {
			setOpen(false);
			dispatch({ type: PRODUCT_EDIT_RESET });
			dispatch(listProducts());
		}
		if (!categories || categories.length === 0) {
			dispatch(listCategories());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createSuccess, editSuccess, dispatch, setOpen]);

	// set initial value
	useEffect(() => {
		// setProductData(initialData);
		if (initialData) {
			setName(initialData.name);
			setPrice(initialData.price);
			setQuantity(initialData.quantity);
			setCategory(initialData.category?.id);
		} else {
			setName("");
			setPrice(0);
			setQuantity(0);
			setCategory(0);
		}
	}, [initialData]);

	return (
		<Box component="form" onSubmit={handleSubmit}>
			{(createLoading || editLoading || categoryLoading) && <Spinner />}
			{editError && typeof editError !== "object" && (
				<Messages type="error" text={editError} />
			)}
			{createError && typeof createError !== "object" && (
				<Messages type="error" text={createError} />
			)}
			{categoryError && typeof categoryError !== "object" && (
				<Messages type="error" text={categoryError} />
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
				helperText={createError?.name || editError?.name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Box display="flex" justifyContent="space-between">
				<FormControl
					variant="standard"
					fullWidth
					margin="dense"
					error={createError?.category || editError?.category}
				>
					<InputLabel id="category">Category</InputLabel>
					<Select
						labelId="category"
						id="category"
						name="category"
						value={category}
						label="Category"
						onChange={(e) => setCategory(e.target.value)}
					>
						<MenuItem value="0">Select Category</MenuItem>
						{categories?.results?.map((cat) => (
							<MenuItem key={cat.id} value={cat.id}>
								{cat.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>
						{createError?.category[0] || editError?.category[0]}
					</FormHelperText>
				</FormControl>
				<TextField
					margin="dense"
					id="price"
					name="price"
					label="Product Price"
					type="number"
					autoComplete="false"
					variant="standard"
					value={price}
					error={createError?.price || editError?.price}
					helperText={createError?.price || editError?.price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<TextField
					margin="dense"
					id="quantity"
					name="quantity"
					label="Product Quantity"
					type="number"
					autoComplete="false"
					variant="standard"
					value={quantity}
					error={createError?.quantity || editError?.quantity}
					helperText={createError?.quantity || editError?.quantity}
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

export default React.memo(ProductCreateForm);
