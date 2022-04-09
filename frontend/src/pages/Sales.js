import React from "react";
import { useDispatch } from "react-redux";
import { listSales } from "../redux/actions/saleAction";
import Box from "@mui/material/Box";
import SearchBox from "../components/SearchBox";
import SalesTable from "../components/Dashboard/tables/SalesTable";

const Sales = () => {
	const [searchVal, setSearchVal] = React.useState("");

	const dispatch = useDispatch();

	// sale search handler
	const handleSearch = (e) => {
		e.preventDefault();

		const params = `search=${searchVal}`;
		dispatch(listSales(params));
	};

	return (
		<>
			<Box
				mb={4}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<SearchBox
					searchVal={searchVal}
					setSearchVal={setSearchVal}
					handleSearch={handleSearch}
				/>
			</Box>

			<SalesTable searchVal={searchVal} />
		</>
	);
};

export default Sales;
