import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Containers/DashboardLayout";
import PrivateRoute from "./Containers/PrivateRoute";
import {
	Login,
	Dashboard,
	NewSale,
	Sales,
	Products,
	Categories,
	Customers,
	Users,
	PageNotFound,
} from "./pages";

const router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<PageNotFound />} />
				<Route path="/login" element={<Login />} />

				<Route
					path=""
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path="/sales" element={<Sales />} />
					<Route path="/sale/new" element={<NewSale />} />
					<Route path="/products" element={<Products />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/customers" element={<Customers />} />
					<Route path="/users" element={<Users />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default router;
