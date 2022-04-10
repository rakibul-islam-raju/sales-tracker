import React from "react";
import { listCustomers } from "../redux/actions/customerActions";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import CustomerTable from "../components/Dashboard/tables/customerTable";
import CustomerCreateForm from "../components/Dashboard/Forms/CustomerCreateForm";
import SearchBox from "../components/SearchBox";
import CachedIcon from "@mui/icons-material/Cached";

const Customers = () => {
	const [open, setOpen] = React.useState(false);
	const [editCustomer, setEditCustomer] = React.useState(null);
	const [searchVal, setSearchVal] = React.useState("");

	const dispatch = useDispatch();

	// modal close handler
	const handleClose = () => {
		setOpen(false);
	};

	// customer create handler
	const handleCustomerCreate = () => {
		setEditCustomer(null);
		setOpen(true);
	};

	// customer edit handler
	const handleCustomerEdit = (customer) => {
		setEditCustomer(customer);
		setOpen(true);
	};

	const refreshPage = () => {
		dispatch(listCustomers());
	};

	// search handler
	const handleSearch = (e) => {
		e.preventDefault();

		const params = `search=${searchVal}`;
		dispatch(listCustomers(params));
	};

	return (
		<>
			<FormModal
				open={open}
				handleClose={handleClose}
				title={editCustomer ? "Edit Customer" : "Create New Customer"}
				formElement={
					<CustomerCreateForm
						editCustomer={editCustomer}
						setOpen={setOpen}
					/>
				}
			/>

			<Box
				mb={4}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<SearchBox
					handleSearch={handleSearch}
					searchVal={searchVal}
					setSearchVal={setSearchVal}
				/>

				<Box>
					<Button
						variant="contained"
						onClick={refreshPage}
						sx={{ mr: 1 }}
					>
						<CachedIcon />
					</Button>
					<Button variant="contained" onClick={handleCustomerCreate}>
						<AddIcon /> New Customer
					</Button>
				</Box>
			</Box>

			<CustomerTable handleCustomerEdit={handleCustomerEdit} />
		</>
	);
};

export default Customers;
