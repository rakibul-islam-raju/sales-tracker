import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({ handleSearch, searchVal, setSearchVal }) => {
	return (
		<Box component="form" onSubmit={handleSearch} sx={{ display: "flex" }}>
			<TextField
				autoFocus
				id="search"
				name="search"
				label="Search"
				type="text"
				size="small"
				value={searchVal}
				onChange={setSearchVal}
				autoComplete="false"
				variant="outlined"
				sx={{ width: "250px" }}
			/>
			<Button variant="contained">
				<SearchIcon />
			</Button>
		</Box>
	);
};
export default SearchBox;
