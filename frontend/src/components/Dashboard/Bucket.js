import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBucket } from "../../redux/actions/bucketActions";

import React from "react";
import { Box, Button, ButtonGroup, List, ListItem } from "@mui/material";

const Bucket = ({
	product,
	setProduct,
	price,
	setPrice,
	quantity,
	setQuantity,
}) => {
	const dispatch = useDispatch();

	// bucket state
	const bucket = useSelector((state) => state.bucket);
	const { bucketItems } = bucket;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const editHandler = (item) => {
		const editProduct = products?.results.find(
			(prod) => prod.id === item.product
		);
		setProduct(editProduct);
		setPrice(item.price);
		setQuantity(item.quantity);
		dispatch(removeFromBucket(item.product));
	};

	const itemTotal = (total, number) => {
		return total + Math.round(number);
	};

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

				<List disablePadding>
					{bucketItems.length === 0 ? (
						<ListItem>Bucket is empty!</ListItem>
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

				{bucketItems.length > 0 && (
					<Button variant="contained" fullWidth mt={2}>
						Proceed
					</Button>
				)}
			</Paper>
		</div>
	);
};

export default Bucket;
