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
import { listSaleReports } from "../redux/actions/reportActions";

const Dashboard = () => {
	const dispatch = useDispatch();

	const saleReportList = useSelector((state) => state.saleReportList);
	const { loading, error, data } = saleReportList;

	console.log("data =>", data);

	useEffect(() => {
		dispatch(listSaleReports());
	}, [dispatch]);

	return (
		<>
			<Box>
				<Typography variant="h4" gutterBottom>
					Last Week Sales
				</Typography>
				{/* <ResponsiveContainer width="100%" height="100%"> */}
				<LineChart
					width={1000}
					height={450}
					data={data?.results}
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
						dataKey="created_at"
						stroke="#8884d8"
						activeDot={{ r: 8 }}
					/>
					<Line type="monotone" dataKey="id" stroke="#82ca9d" />
				</LineChart>
				{/* </ResponsiveContainer> */}
			</Box>
		</>
	);
};

export default Dashboard;
