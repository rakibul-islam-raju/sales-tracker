import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const Router: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
