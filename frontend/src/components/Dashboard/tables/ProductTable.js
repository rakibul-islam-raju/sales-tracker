import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/actions/productActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Messages from "../../../components/Messages";
import Spinner from "../../../components/Spinner";

const ProductTable = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		if (!products || products.length === 0) {
			dispatch(listProducts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);
	return (
		<TableContainer component={Paper}>
			{loading && <Spinner />}
			{error && <Messages type="error" error={error} />}
			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell>Product</TableCell>
						<TableCell align="right">Code</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Quantity</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products?.map((row) => (
						<TableRow
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell>{row.name}</TableCell>
							<TableCell align="right">ASD002</TableCell>
							<TableCell align="right">{row.price}</TableCell>
							<TableCell align="right">{row.quantity}</TableCell>
							<TableCell align="right">
								<ButtonGroup>
									<Button variant="outline">
										<EditIcon color="primary" />
									</Button>
									<Button variant="outline">
										<DeleteIcon color="error" />
									</Button>
								</ButtonGroup>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductTable;
