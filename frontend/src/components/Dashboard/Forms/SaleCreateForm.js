import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/actions/productActions";
import { listCustomers } from "../../../redux/actions/customerActions";
import { addToBucket } from "../../../redux/actions/bucketActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";
import {
	Button,
	List,
	ListItemButton,
	ListItemText,
	Paper,
	Typography,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { debounce } from "lodash";
import { CUSTOMER_LIST_RESET } from "../../../redux/constants/customerConstants";

const SaleCreateForm = ({
	product,
	setProduct,
	price,
	setPrice,
	quantity,
	setQuantity,
	customer,
	setCustomer,
}) => {
	const [customerSearch, setCustomerSearch] = useState("");
	const [searchVal, setSearchVal] = useState("");

	const dispatch = useDispatch();

	// product list state
	const productList = useSelector((state) => state.productList);
	const {
		loading: productLoading,
		error: productError,
		products,
	} = productList;

	// customer list state
	const customerList = useSelector((state) => state.customerList);
	const {
		loading: customerLoading,
		error: customerError,
		customers,
	} = customerList;

	const searchCustomers = debounce((text) => {
		setCustomerSearch(text);
	}, 1000);

	const searchProducts = debounce((text) => {
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

	const customerSelectHandler = (data) => {
		setCustomer(data);
		dispatch({ type: CUSTOMER_LIST_RESET });
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

	useEffect(() => {
		const params = `search=${customerSearch}`;
		dispatch(listCustomers(params));
	}, [customerSearch, dispatch]);

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Customer
			</Typography>

			<Paper elevation={1} sx={{ padding: "10px", mb: 2 }}>
				<TextField
					id="phone"
					label="Search Customer"
					type="text"
					fullWidth
					onChange={(e) => searchCustomers(e.target.value)}
				/>
				{customerLoading ? (
					<Spinner />
				) : (
					customers?.results?.length > 0 &&
					customerSearch && (
						<List>
							{customers?.results?.map((customer) => (
								<ListItemButton
									key={customer.id}
									divider
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
									onClick={() =>
										customerSelectHandler(customer)
									}
								>
									<ListItemText>{customer.name}</ListItemText>
									<ListItemText sx={{ textAlign: "right" }}>
										{customer.phone}
									</ListItemText>
								</ListItemButton>
							))}
						</List>
					)
				)}
			</Paper>

			<Paper elevation={1} sx={{ padding: "10px" }}>
				<Typography variant="h5" gutterBottom>
					Product
				</Typography>
				<TextField
					id="products"
					label="Search Product"
					variant="outlined"
					fullWidth
					onChange={(e) => searchProducts(e.target.value)}
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
							<ListItemButton dense divider>
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
