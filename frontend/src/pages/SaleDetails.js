import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailSales } from "../redux/actions/saleAction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "../components/Spinner";
import Messages from "../components/Messages";
import PrintIcon from "@mui/icons-material/Print";
import { TableFooter } from "@mui/material";

const SaleDetails = () => {
	const { saleId } = useParams();

	const dispatch = useDispatch();

	// sale detail state
	const saleDetail = useSelector((state) => state.saleDetail);
	const { loading, error, sale } = saleDetail;

	const totalPrice = sale?.sale_items.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	useEffect(() => {
		dispatch(detailSales(saleId));
	}, [dispatch, saleId]);

	return (
		<>
			<Box
				mb={4}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				{loading && <Spinner />}
				{error && typeof error !== "object" && (
					<Messages type="error" text={error} />
				)}

				<Card sx={{ width: "100%" }}>
					<CardActions
						sx={{ display: "flex", justifyContent: "flex-end" }}
					></CardActions>
					<CardContent>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Box>
								<Typography variant="h4">
									{sale?.customer?.name.toUpperCase()}
								</Typography>
								<Typography
									variant="subtitle"
									color="text.secondary"
									display={`block`}
								>
									{sale?.customer?.phone}
								</Typography>
								<Typography
									variant="subtitle"
									color="text.secondary"
								>
									{sale?.customer?.email}
								</Typography>
							</Box>
							<Button>
								<PrintIcon sx={{ mr: 1 }} /> Print
							</Button>
						</Box>

						<hr />

						<TableContainer>
							<Table
								sx={{ minWidth: 650 }}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell>Product Name</TableCell>
										<TableCell align="right">
											Quantity
										</TableCell>
										<TableCell align="right">
											Price
										</TableCell>
										<TableCell align="right">
											Total
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sale?.sale_items?.map((row) => (
										<TableRow
											key={row.id}
											sx={{
												"&:last-child td, &:last-child th":
													{ border: 0 },
											}}
										>
											<TableCell
												component="th"
												scope="row"
											>
												{row?.product_name}
											</TableCell>
											<TableCell align="right">
												{row?.quantity}
											</TableCell>
											<TableCell align="right">
												{row?.price}
											</TableCell>
											<TableCell align="right">
												{row?.price * row?.quantity}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableHead>
									<TableRow>
										<TableCell colSpan={3}>
											Grand Total
										</TableCell>
										<TableCell align="right">
											{totalPrice}
										</TableCell>
									</TableRow>
								</TableHead>
							</Table>
						</TableContainer>
					</CardContent>
				</Card>
			</Box>
		</>
	);
};

export default SaleDetails;
