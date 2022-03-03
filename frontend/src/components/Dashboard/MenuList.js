import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";

const mainMenus = [
	{ title: "Dashboard", path: "/", icon: <DashboardIcon /> },
	{ title: "Products", path: "/products", icon: <AllInboxIcon /> },
	{ title: "Categories", path: "/categories", icon: <CategoryIcon /> },
	{ title: "Users", path: "/users", icon: <PeopleAltIcon /> },
];

const MenuList = () => {
	return (
		<>
			<List>
				{mainMenus.map((menu) => (
					<NavLink to={menu.path} key={`${menu.title}-menu`}>
						<ListItem button>
							<ListItemIcon>{menu.icon}</ListItemIcon>
							<ListItemText primary={menu.title} />
						</ListItem>
					</NavLink>
				))}
			</List>
		</>
	);
};

export default MenuList;
