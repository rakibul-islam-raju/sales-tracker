import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/actions/productActions";
import Spinner from "../../Spinner";
import Messages from "../../Messages";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { debounce } from "lodash";

const SaleCreateForm = () => {
	const [searchVal, setSearchVal] = useState("");
	const dispatch = useDispatch();

	// product list state
	const productList = useSelector((state) => state.productList);
	const {
		loading: productLoading,
		error: productError,
		products,
	} = productList;

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	console.log("search val =>", searchVal);
	const handleSearch = () => {
		const params = `search=${searchVal}`;
		dispatch(listProducts(params));
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceLoadData = debounce(handleSearch, 1000);

	const handleChange = (e) => {
		console.log("target =>", e.target.value);
		setSearchVal(e.target.value);
		debounceLoadData();
	};

	useEffect(() => {
		if (!products || products.length === 0) {
			dispatch(listProducts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box component="form" onSubmit={handleSubmit}>
			{productLoading && <Spinner />}

			{productError && typeof productError !== "object" && (
				<Messages type="error" text={productError} />
			)}

			<TextField
				id="products"
				label="Search Product"
				variant="outlined"
				fullWidth
				value={searchVal}
				onChange={(e) => {
					setSearchVal(e.target.value);
					debounceLoadData();
				}}
			/>

			<List>
				{products?.results?.length === 0 ? (
					<ListItemButton disablePadding>
						<ListItemText primary="Product not found!" />
					</ListItemButton>
				) : (
					products?.results?.map((product) => (
						<ListItemButton disablePadding sx={{ width: "100%" }}>
							<ListItemText
								primary={`${product.name} - ${product.category.name}`}
							/>
						</ListItemButton>
					))
				)}
			</List>

			{/* <Autocomplete
				id="products"
				options={products?.results}
				getOptionLabel={(option) =>
					`${option?.name} - ${option?.category?.name}`
				}
				loading={productLoading}
				// inputValue={input}
				// onChange={handleChange}
				// onChange={() => console.log("changing")}
				isOptionEqualToValue={(option, value) =>
					option?.name === value?.name
				}
				style={{ width: 300 }}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Product"
						onChange={handleChange}
						variant="outlined"
						fullWidth
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{productLoading ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/> */}
		</Box>
	);
};

export default SaleCreateForm;
