import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../redux/actions/productActions";

const Dashboard = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<Box>
				<Typography variant="h4" gutterBottom>
					Inventory Stock
				</Typography>
				{/* <ResponsiveContainer width="100%" height="100%"> */}
				<LineChart
					width={1000}
					height={450}
					data={products.results}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey="quantity"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
					<Line type="monotone" dataKey="price" stroke="#82ca9d" />
				</LineChart>
				{/* </ResponsiveContainer> */}
			</Box>
		</>
	);
};

export default Dashboard;
