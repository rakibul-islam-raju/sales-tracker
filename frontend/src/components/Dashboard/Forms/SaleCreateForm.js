import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/actions/productActions";
import { addToBucket } from "../../../redux/actions/bucketActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";
import {
	Button,
	List,
	ListItemButton,
	ListItemText,
	Paper,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { debounce } from "lodash";

const SaleCreateForm = ({
	product,
	setProduct,
	price,
	setPrice,
	quantity,
	setQuantity,
}) => {
	const [searchVal, setSearchVal] = useState("");

	const dispatch = useDispatch();

	// product list state
	const productList = useSelector((state) => state.productList);
	const {
		loading: productLoading,
		error: productError,
		products,
	} = productList;

	const handleChange = debounce((text) => {
		setSearchVal(text);
	}, 1000);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (product && price && quantity) {
			dispatch(addToBucket(product, quantity, price));
			setProduct({});
			setPrice(0);
			setQuantity(0);
		} else {
			return;
		}
	};

	useEffect(() => {
		if (!products || products.length === 0) {
			dispatch(listProducts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const params = `search=${searchVal}`;
		dispatch(listProducts(params));
	}, [searchVal, dispatch]);

	return (
		<Box>
			<Paper elevation={1} sx={{ padding: "10px" }}>
				<TextField
					id="products"
					label="Search Product"
					variant="outlined"
					fullWidth
					onChange={(e) => handleChange(e.target.value)}
				/>

				{productLoading ? (
					<Spinner />
				) : productError ? (
					productError &&
					typeof productError !== "object" && (
						<Messages type="error" text={productError} />
					)
				) : (
					<List
						sx={{
							height: "200px",
							overflow: "scroll",
						}}
					>
						{products?.results?.length === 0 ? (
							<ListItemButton dense divider disablePadding>
								<ListItemText primary="Product not found!" />
							</ListItemButton>
						) : (
							products?.results?.map((item) => (
								<ListItemButton
									selected={item.id === product?.id}
									key={item.id}
									dense
									divider
									onClick={() => setProduct(item)}
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<ListItemText
										primary={item.name}
										secondary={item.category.name}
									/>
									<ListItemText
										sx={{ textAlign: "right" }}
										primary={`$ ${item.price} (${item.quantity})`}
									/>
								</ListItemButton>
							))
						)}
					</List>
				)}
			</Paper>

			<Box mt={4} component="form" onSubmit={handleSubmit}>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
				>
					<TextField label="Product" value={product?.name || ""} />
					<TextField
						type="number"
						label="Quantity"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
					<TextField
						type="number"
						label="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Box>

				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ mt: 2 }}
				>
					Add To Bucket <ShoppingCartCheckoutIcon sx={{ ml: 4 }} />
				</Button>
			</Box>
		</Box>
	);
};

export default SaleCreateForm;
