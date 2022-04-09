import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	listProducts,
	deleteProducts,
} from "../../../redux/actions/productActions";
import {
	PRODUCT_LIST_RESET,
	PRODUCT_DELETE_RESET,
} from "../../../redux/constants/productConstants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Messages from "../../../components/Messages";
import Spinner from "../../../components/Spinner";
import ConfirmModal from "../../ConfirmModal";
import Pagination from "../Pagination";

const ProductTable = ({ searchVal }) => {
	const dispatch = useDispatch();

	const [currentID, setCurrentID] = useState(null);

	// pagination state
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(2);

	// page change handler
	const handleChangePage = (event, newPage) => {
		setPage(newPage + 1);
		let params = searchVal
			? `page=${newPage + 1}&search=${searchVal}`
			: `page=${newPage + 1}`;
		dispatch(listProducts(params));
	};

	// row per page change handler
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		// setPage(0);
	};

	// useState state
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// product list state
	const productList = useSelector((state) => state.productList);
	const { loading: listLoading, error: listError, products } = productList;

	useEffect(() => {
		if (!products) {
			dispatch(listProducts());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<>
			<TableContainer component={Paper}>
				{listError && typeof listError !== "object" && (
					<Messages type="error" text={listError} />
				)}

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
						{products?.results?.map((row) => (
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
								<TableCell align="right">
									{row.quantity}
								</TableCell>
								<TableCell align="right">
									<ButtonGroup>
										<Button
											variant="outline"
											// onClick={() => handleProductEdit(row)}
										>
											<ShoppingCartCheckoutIcon color="primary" />
										</Button>
									</ButtonGroup>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Pagination
					count={products?.count}
					page={page - 1}
					rowsPerPage={rowsPerPage}
					setPage={setPage}
					handleChangePage={handleChangePage}
				/>
			</TableContainer>
		</>
	);
};

export default React.memo(ProductTable);
