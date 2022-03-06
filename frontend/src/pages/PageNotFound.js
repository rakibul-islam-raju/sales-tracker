import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Page404 from "../assets/images/page_not_found.svg";

const PageNotFound = () => {
	return (
		<Container component="main" maxWidth="xs">
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				mt={5}
			>
				<img className="notFound" src={Page404} alt="Page not found" />
				<Typography
					component="h3"
					variant="h3"
					textAlign="center"
					mt={5}
					color="primary.main"
				>
					Page Not Found
				</Typography>
			</Box>
		</Container>
	);
};

export default PageNotFound;
