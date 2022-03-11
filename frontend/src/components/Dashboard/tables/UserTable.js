import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUsers } from "../../../redux/actions/userActions";
import {
	USER_LIST_RESET,
	USER_DELETE_RESET,
} from "../../../redux/constants/userConstants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Messages from "../../../components/Messages";
import Spinner from "../../../components/Spinner";
import ConfirmModal from "../../ConfirmModal";
import Pagination from "../Pagination";

const UserTable = ({ handleCategoryEdit }) => {
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
		const params = `page=${newPage + 1}`;
		dispatch(listUsers(params));
	};

	// row per page change handler
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		// setPage(0);
	};

	// user login state
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// user list state
	const userList = useSelector((state) => state.userList);
	const { loading: listLoading, error: listError, users } = userList;

	// user delete state
	const userDelete = useSelector((state) => state.userDelete);
	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess,
	} = userDelete;

	// handler for user delete
	const handleUserDelete = (id) => {
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
			dispatch(deleteUsers(currentID));
			setCurrentID(null);
		}
	};

	useEffect(() => {
		if (!users || users.length === 0) {
			dispatch(listUsers());
		}

		// after delete
		if (deleteSuccess) {
			setDeleteVal(false);
			dispatch({ type: USER_DELETE_RESET });
			dispatch({ type: USER_LIST_RESET });
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
				title="Delete User"
				desc="Are you sure to delete this user? This action cannot be undo!"
			/>

			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell>Full Name</TableCell>
						<TableCell align="right">Email</TableCell>
						<TableCell align="right">Role</TableCell>
						<TableCell align="right">Active</TableCell>
						<TableCell align="right">Admin</TableCell>
						<TableCell align="right">Super Admin</TableCell>
						{userInfo.is_staff && (
							<TableCell align="right">Actions</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{users?.results?.map((row) => (
						<TableRow
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell>{row.fullname}</TableCell>
							<TableCell align="right">{row.email}</TableCell>
							<TableCell align="right">
								{row.role && (
									<Badge
										color={
											row.role === "manager"
												? "primary"
												: "secondary"
										}
										badgeContent={row.role}
									></Badge>
								)}
							</TableCell>
							<TableCell align="right">
								{row.is_active ? (
									<CheckCircleIcon color="success" />
								) : (
									<CancelIcon color="error" />
								)}
							</TableCell>
							<TableCell align="right">
								{row.is_staff ? (
									<CheckCircleIcon color="success" />
								) : (
									<CancelIcon color="error" />
								)}
							</TableCell>
							<TableCell align="right">
								{row.is_superuser ? (
									<CheckCircleIcon color="success" />
								) : (
									<CancelIcon color="error" />
								)}
							</TableCell>
							<TableCell align="right">
								<ButtonGroup>
									{userInfo.is_staff && (
										<>
											<Button
												variant="outline"
												onClick={() =>
													handleCategoryEdit(row)
												}
											>
												<EditIcon color="primary" />
											</Button>
											{userInfo.is_superuser && (
												<Button
													variant="outline"
													onClick={() =>
														handleUserDelete(row.id)
													}
												>
													<DeleteIcon color="error" />
												</Button>
											)}
										</>
									)}
								</ButtonGroup>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Pagination
				count={users?.count}
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

export default UserTable;
