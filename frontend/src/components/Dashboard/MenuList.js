import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";

const mainMenus = [
	{ title: "Dashboard", path: "/", icon: <DashboardIcon /> },
	{ title: "Sales", path: "/sales", icon: <AllInboxIcon /> },
	{ title: "Products", path: "/products", icon: <AllInboxIcon /> },
	{ title: "Categories", path: "/categories", icon: <CategoryIcon /> },
	{ title: "Customers", path: "/customers", icon: <PeopleAltIcon /> },
	{ title: "Users", path: "/users", icon: <PeopleAltIcon /> },
];

const MenuList = () => {
	return (
		<>
			<List>
				{mainMenus.map((menu) => (
					<NavLink
						className={(nav) => (nav.isActive ? "active" : "")}
						to={menu.path}
						key={`${menu.title}-menu`}
					>
						<ListItem button className="activeListItem">
							<ListItemIcon className="activeIcon">
								{menu.icon}
							</ListItemIcon>
							<ListItemText primary={menu.title} />
						</ListItem>
					</NavLink>
				))}
			</List>
		</>
	);
};

export default MenuList;
