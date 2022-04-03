import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, ButtonGroup, List, ListItem } from "@mui/material";
import Spinner from "../Spinner";
import Messages from "../Messages";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBucket } from "../../redux/actions/bucketActions";
import { createSales } from "../../redux/actions/saleAction";
import { SALE_CREATE_RESET } from "../../redux/constants/saleConstants";
import { BUCKET_CLEAR } from "../../redux/constants/bucketConstants";

const Bucket = ({
	product,
	setProduct,
	price,
	setPrice,
	quantity,
	setQuantity,
	customer,
	setCustomer,
	customerRef,
}) => {
	const [showMessage, setShowMessage] = useState(false);

	const dispatch = useDispatch();

	// bucket state
	const bucket = useSelector((state) => state.bucket);
	const { bucketItems } = bucket;

	// product list state
	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	// sale create state
	const saleCreate = useSelector((state) => state.saleCreate);
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
	} = saleCreate;

	const editHandler = (item) => {
		const editProduct = products?.results.find(
			(prod) => prod.id === item.product
		);
		setProduct(editProduct);
		setPrice(item.price);
		setQuantity(item.quantity);
		dispatch(removeFromBucket(item.product));
	};

	const saleHandler = () => {
		const data = {
			customer_id: customer?.id,
			sale_items: bucketItems,
		};
		dispatch(createSales(data));
	};

	useEffect(() => {
		if (createSuccess) {
			dispatch({ type: SALE_CREATE_RESET });
			dispatch({ type: BUCKET_CLEAR });
			setProduct({});
			setPrice(0);
			setQuantity(0);
			setCustomer({});
			setShowMessage(true);
			customerRef.current.reset();
		}

		const showSuccessMsg = setInterval(() => {
			setShowMessage(false);
		}, 5000);

		return () => {
			clearInterval(showSuccessMsg);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createSuccess]);

	return (
		<div>
			<Paper elevation={1} sx={{ padding: "10px", width: "100%" }}>
				<Typography
					variant="h6"
					display="flex"
					alignItems="center"
					pb={2}
				>
					<ShoppingCartIcon color="primary" sx={{ mr: 1 }} />
					Bucket
				</Typography>
				<Divider />

				<Box>
					<Typography variant="h6">Customer</Typography>
					{customer?.id ? (
						<>
							<Typography>Name: {customer?.name}</Typography>
							<Typography>Phone: {customer?.phone}</Typography>
							<Typography>Email: {customer?.email}</Typography>
						</>
					) : (
						<Alert sx={{ width: "100%" }} severity="warning">
							Pleaset select a customer!
						</Alert>
					)}
				</Box>
				<Typography variant="h6" mt={2}>
					Products
				</Typography>
				<List disablePadding>
					{bucketItems.length === 0 ? (
						<ListItem>
							<Alert sx={{ width: "100%" }} severity="warning">
								Empty Bucket!
							</Alert>
						</ListItem>
					) : (
						bucketItems.map((item, index) => (
							<ListItem
								key={index}
								divider
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Box>
									{item.name}{" "}
									<Typography variant="subtitle2">
										({item.quantity} X ${item.price}) = $
										{parseFloat(
											item.quantity * item.price
										).toFixed(2)}
									</Typography>
								</Box>
								<ButtonGroup variant="text">
									<Button
										size="small"
										color="primary"
										onClick={() => editHandler(item)}
									>
										<EditIcon />
									</Button>
									<Button
										size="small"
										color="error"
										onClick={() =>
											dispatch(
												removeFromBucket(item.product)
											)
										}
									>
										<DeleteForeverIcon />
									</Button>
								</ButtonGroup>
							</ListItem>
						))
					)}

					{bucketItems.length > 0 && (
						<ListItem>
							<Typography variant="subtitle1">
								Total = $
								{bucketItems
									.reduce(
										(acc, item) =>
											acc + item.quantity * item.price,
										0
									)
									.toFixed(2)}
							</Typography>
						</ListItem>
					)}
				</List>

				{createError &&
					createError &&
					typeof productError !== "object" && (
						<Messages type="error" text={createError} />
					)}

				{showMessage && (
					<Messages type="success" text="Successfully sold!" />
				)}

				{createLoading ? (
					<Spinner />
				) : (
					bucketItems.length > 0 &&
					customer?.id && (
						<Button
							onClick={saleHandler}
							variant="contained"
							fullWidth
							mt={2}
						>
							Proceed
						</Button>
					)
				)}
			</Paper>
		</div>
	);
};

export default Bucket;
