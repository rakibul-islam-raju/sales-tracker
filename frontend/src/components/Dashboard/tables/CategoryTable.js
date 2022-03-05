import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	listCategories,
	deleteCategories,
} from "../../../redux/actions/categoryActions";
import {
	CATEGORY_LIST_RESET,
	CATEGORY_DELETE_RESET,
} from "../../../redux/constants/categoryConstants";
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

const CategoryTable = ({ handleCategoryEdit }) => {
	const dispatch = useDispatch();

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [deleteVal, setDeleteVal] = useState(false);
	const [currentID, setCurrentID] = useState(null);

	// category list state
	const categoryList = useSelector((state) => state.categoryList);
	const { loading: listLoading, error: listError, categories } = categoryList;

	// category delete state
	const categoryDelete = useSelector((state) => state.categoryDelete);
	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess,
	} = categoryDelete;

	// handler for category delete
	const handleCategoryDelete = (id) => {
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
			dispatch(deleteCategories(currentID));
			setCurrentID(null);
		}
	};

	useEffect(() => {
		if (!categories || categories.length === 0) {
			dispatch(listCategories());
		}

		// after delete
		if (deleteSuccess) {
			setDeleteVal(false);
			dispatch({ type: CATEGORY_DELETE_RESET });
			dispatch({ type: CATEGORY_LIST_RESET });
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
				title="Delete Category"
				desc="Are you sure to delete this category? This action cannot be undo!"
			/>

			<Table
				sx={{ minWidth: 650 }}
				aria-label="simple table"
				size="small"
			>
				<TableHead>
					<TableRow>
						<TableCell>Category</TableCell>
						<TableCell align="right">Created at</TableCell>
						<TableCell align="right">Updated at</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{categories?.map((row) => (
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
								{new Date(row.created_at).toLocaleDateString()}
							</TableCell>
							<TableCell align="right">
								{new Date(row.updated_at).toLocaleDateString()}
							</TableCell>
							<TableCell align="right">
								<ButtonGroup>
									<Button
										variant="outline"
										onClick={() => handleCategoryEdit(row)}
									>
										<EditIcon color="primary" />
									</Button>
									<Button
										variant="outline"
										onClick={() =>
											handleCategoryDelete(row.id)
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

export default CategoryTable;
