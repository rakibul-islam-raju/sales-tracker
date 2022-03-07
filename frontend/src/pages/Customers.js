import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../components/FormModal";
import CustomerTable from "../components/Dashboard/tables/customerTable";
import CustomerCreateForm from "../components/Dashboard/Forms/CustomerCreateForm";

const Customers = () => {
	const [open, setOpen] = React.useState(false);
	const [editCustomer, setEditCustomer] = React.useState(null);

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

			<Box mb={4} display="flex" justifyContent="flex-end">
				<Button variant="contained" onClick={handleCustomerCreate}>
					<AddIcon /> New Customer
				</Button>
			</Box>

			<CustomerTable handleCustomerEdit={handleCustomerEdit} />
		</>
	);
};

export default Customers;
