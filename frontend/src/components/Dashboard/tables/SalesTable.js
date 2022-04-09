import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSales, deleteSales } from "../../../redux/actions/saleAction";
import {
	SALE_LIST_RESET,
	SALE_DELETE_RESET,
} from "../../../redux/constants/saleConstants";
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
import ConfirmModal from "../../ConfirmModal";
import Pagination from "../Pagination";

const SalesTable = ({ searchVal }) => {
	const dispatch = useDispatch();

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteVal, setDeleteVal] = useState(false);
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
		dispatch(listSales(params));
	};

	// row per page change handler
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		// setPage(0);
	};

	// useState state
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// sales list state
	const saleList = useSelector((state) => state.saleList);
	const { loading: saleLoading, error: saleError, sales } = saleList;

	// sale delete state
	const saleDelete = useSelector((state) => state.saleDelete);
	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess,
	} = saleDelete;

	// handler for sale delete
	const handleSaleDelete = (id) => {
		// open confirm modal
		setOpenDeleteModal(true);
		setCurrentID(id);
	};

	// on close confirm modal
	const handleClose = (newValue) => {
		// cloase confirm modal
		setOpenDeleteModal(false);

		// value from confirm modal
		if (newValue) {
			setDeleteVal(true);
			dispatch(deleteSales(currentID));
			setCurrentID(null);
		}
	};

	useEffect(() => {
		if (!sales) {
			dispatch(listSales());
		}

		// after delete
		if (deleteSuccess) {
			setDeleteVal(false);
			dispatch({ type: SALE_DELETE_RESET });
			dispatch({ type: SALE_LIST_RESET });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, deleteSuccess]);

	return (
		<TableContainer component={Paper}>
			{(saleLoading || deleteLoading) && <Spinner />}

			{saleError && typeof listError !== "object" && (
				<Messages type="error" text={saleError} />
			)}

			{deleteError && typeof deleteError !== "object" && (
				<Messages type="error" text={deleteError} />
			)}

			<ConfirmModal
				id="ringtone-menu"
				keepMounted
				open={openDeleteModal}
				value={deleteVal}
				onClose={handleClose}
				title="Delete Product"
				desc="Are you sure to delete this product? This action cannot be undo!"
			/>

			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell>Customer</TableCell>
						<TableCell align="right">Phone</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Total Item</TableCell>
						<TableCell align="right">Total Price</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{sales?.results?.map((row) => (
						<TableRow
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell>{row?.customer?.name}</TableCell>
							<TableCell align="right">
								{row?.customer?.phone}
							</TableCell>
							<TableCell align="right">
								{row?.customer?.email}
							</TableCell>
							<TableCell align="right">
								{(row?.sale_items).length}
							</TableCell>
							<TableCell align="right">500</TableCell>
							<TableCell align="right">
								<ButtonGroup>
									{/* <Button
										variant="outline"
										onClick={() => handleProductEdit(row)}
									>
										<EditIcon color="primary" />
									</Button> */}
									<Button
										variant="outline"
										onClick={() => handleSaleDelete(row.id)}
									>
										<DeleteIcon color="error" />
									</Button>
								</ButtonGroup>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Pagination
				count={sales?.count}
				page={page - 1}
				rowsPerPageOptions={[2, 3]}
				rowsPerPage={rowsPerPage}
				setPage={setPage}
				handleChangePage={handleChangePage}
				// handleChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</TableContainer>
	);
};

export default React.memo(SalesTable);
