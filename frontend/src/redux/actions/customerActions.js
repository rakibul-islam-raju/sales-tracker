import axios from "axios";
import {
	CUSTOMER_LIST_REQUEST,
	CUSTOMER_LIST_SUCCESS,
	CUSTOMER_LIST_FAIL,
	CUSTOMER_CREATE_REQUEST,
	CUSTOMER_CREATE_SUCCESS,
	CUSTOMER_CREATE_FAIL,
	CUSTOMER_EDIT_REQUEST,
	CUSTOMER_EDIT_SUCCESS,
	CUSTOMER_EDIT_FAIL,
	CUSTOMER_DELETE_REQUEST,
	CUSTOMER_DELETE_SUCCESS,
	CUSTOMER_DELETE_FAIL,
} from "../constants/customerConstants";
import { customerUrl } from "../../utils/urls";

export const listCustomers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CUSTOMER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.get(customerUrl, config);

		dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CUSTOMER_LIST_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const createCustomers = (customerData) => async (dispatch, getState) => {
	try {
		dispatch({ type: CUSTOMER_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.post(customerUrl, customerData, config);

		dispatch({ type: CUSTOMER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CUSTOMER_CREATE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const editCustomers =
	(id, customerData) => async (dispatch, getState) => {
		try {
			dispatch({ type: CUSTOMER_EDIT_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${userInfo.access}`,
				},
			};

			const { data } = await axios.patch(
				customerUrl + id + "/",
				customerData,
				config
			);

			dispatch({ type: CUSTOMER_EDIT_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: CUSTOMER_EDIT_FAIL,
				payload:
					error.response && error.response.data
						? error.response.data
						: error.message,
			});
		}
	};

export const deleteCustomers = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: CUSTOMER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.delete(customerUrl + id + "/", config);

		dispatch({ type: CUSTOMER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CUSTOMER_DELETE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};
