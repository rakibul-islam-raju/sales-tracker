import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { rowsPerPage } from "../../config";

const Pagination = ({
	count,
	page,
	handleChangePage,
	handleChangeRowsPerPage,
}) => {
	return (
		<TablePagination
			component="div"
			count={count}
			page={page}
			onPageChange={handleChangePage}
			rowsPerPageOptions={[]}
			rowsPerPage={rowsPerPage}
			// onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
};

export default Pagination;
