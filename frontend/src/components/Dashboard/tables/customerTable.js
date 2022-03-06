import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	listCustomers,
	deleteCustomers,
} from "../../../redux/actions/customerActions";
import {
	CUSTOMER_LIST_RESET,
	CUSTOMER_DELETE_RESET,
} from "../../../redux/constants/customerConstants";
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

const CustomerTable = ({ handleCustomerEdit }) => {
	const dispatch = useDispatch();

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteVal, setDeleteVal] = useState(false);
	const [currentID, setCurrentID] = useState(null);

	// customer list state
	const customerList = useSelector((state) => state.customerList);
	const { loading: listLoading, error: listError, customers } = customerList;

	// customer delete state
	const customerDelete = useSelector((state) => state.customerDelete);
	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess,
	} = customerDelete;

	// handler for customer delete
	const handleCustomerDelete = (id) => {
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
			dispatch(deleteCustomers(currentID));
			setCurrentID(null);
		}
	};

	useEffect(() => {
		if (!customers || customers.length === 0) {
			dispatch(listCustomers());
		}

		// after delete
		if (deleteSuccess) {
			setDeleteVal(false);
			dispatch({ type: CUSTOMER_DELETE_RESET });
			dispatch({ type: CUSTOMER_LIST_RESET });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, deleteSuccess]);

	return (
		<TableContainer component={Paper}>
			{(listLoading || deleteLoading) && <Spinner />}

			{listError && typeof listError !== "object" && (
				<Messages type="error" text={listError} />
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
				title="Delete Customer"
				desc="Are you sure to delete this customer? This action cannot be undo!"
			/>

			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell>Full Name</TableCell>
						<TableCell align="right">Phone Number</TableCell>
						<TableCell align="right">Email Address</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{customers?.map((row) => (
						<TableRow
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell>{row.name}</TableCell>
							<TableCell align="right">
								+880 {row.phone}
							</TableCell>
							<TableCell align="right">{row.email}</TableCell>
							<TableCell align="right">
								<ButtonGroup>
									<Button
										variant="outline"
										onClick={() => handleCustomerEdit(row)}
									>
										<EditIcon color="primary" />
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											handleCustomerDelete(row.id)
										}
									>
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

export default CustomerTable;
