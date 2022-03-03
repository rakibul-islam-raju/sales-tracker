import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";
import { DataGrid } from "@mui/x-data-grid";
import Messages from "../components/Messages";

const columns = [
	{ field: "id", headerName: "ID" },
	{ field: "name", headerName: "First name" },
	{
		field: "price",
		headerName: "Price",
		type: "number",
	},
	{
		field: "quantity",
		headerName: "Quantity",
		type: "number",
	},
];

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
];

const Products = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		if (!products || products.length === 0) {
			dispatch(listProducts());
		}
	}, [dispatch, products]);

	return (
		<div style={{ height: 600, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
	);
};

export default Products;
