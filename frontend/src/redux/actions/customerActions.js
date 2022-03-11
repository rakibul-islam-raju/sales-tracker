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
import { axiosPrivateInstance } from "../../utils/axiosInstance";

export const listCustomers = (params) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_LIST_REQUEST });
		const url = params ? customerUrl + "?" + params : customerUrl;
		const { data } = await axiosPrivateInstance.get(url);
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

export const createCustomers = (customerData) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_CREATE_REQUEST });
		const { data } = await axios.post(customerUrl, customerData);
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

export const editCustomers = (id, customerData) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_EDIT_REQUEST });
		const { data } = await axiosPrivateInstance.patch(
			customerUrl + id + "/",
			customerData
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

export const deleteCustomers = (id) => async (dispatch) => {
	try {
		dispatch({ type: CUSTOMER_DELETE_REQUEST });
		const { data } = await axios.delete(customerUrl + id + "/");
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
