import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

const Pagination = ({
	count,
	page,
	rowsPerPageOptions,
	handleChangePage,
	rowsPerPage,
	handleChangeRowsPerPage,
}) => {
	return (
		<TablePagination
			component="div"
			count={count}
			page={page}
			onPageChange={handleChangePage}
			rowsPerPageOptions={rowsPerPageOptions}
			rowsPerPage={rowsPerPage}
			// onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
};

export default Pagination;
