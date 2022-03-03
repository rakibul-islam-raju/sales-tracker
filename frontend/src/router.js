import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Containers/DashboardLayout";
import { Login, Dashboard, Products, Categories, Shops, Users } from "./pages";

const router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route path="" element={<DashboardLayout />}>
					<Route index element={<Dashboard />} />
					<Route path="/products" element={<Products />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/shops" element={<Shops />} />
					<Route path="/users" element={<Users />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default router;
