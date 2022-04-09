import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import SaleCreateForm from "../components/Dashboard/Forms/SaleCreateForm";
import Bucket from "../components/Dashboard/Bucket";

const NewSale = () => {
	const [product, setProduct] = useState({});
	const [price, setPrice] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [customer, setCustomer] = useState({});

	const customerRef = useRef();

	return (
		<>
			<Grid container spacing={2} columns={12}>
				<Grid item sm={12} md={8}>
					<SaleCreateForm
						product={product}
						setProduct={setProduct}
						price={price}
						setPrice={setPrice}
						quantity={quantity}
						setQuantity={setQuantity}
						customer={customer}
						setCustomer={setCustomer}
						customerRef={customerRef}
					/>
				</Grid>
				<Grid item sm={12} md={4}>
					<Bucket
						product={product}
						setProduct={setProduct}
						price={price}
						setPrice={setPrice}
						quantity={quantity}
						setQuantity={setQuantity}
						customer={customer}
						setCustomer={setCustomer}
						customerRef={customerRef}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default NewSale;
