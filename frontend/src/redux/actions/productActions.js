import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_EDIT_REQUEST,
	PRODUCT_EDIT_SUCCESS,
	PRODUCT_EDIT_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";
import { productsUrl } from "../../utils/urls";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

export const listProducts = (params) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });
		const { data } = await axiosPrivateInstance.get(
			productsUrl + "?" + params
		);
		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const createProducts = (productData) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_CREATE_REQUEST });
		const { data } = await axiosPrivateInstance.post(
			productsUrl,
			productData
		);
		dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const editProducts = (id, productData) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_EDIT_REQUEST });
		const { data } = await axiosPrivateInstance.patch(
			productsUrl + id + "/",
			productData
		);
		dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_EDIT_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const deleteProducts = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DELETE_REQUEST });
		const { data } = await axiosPrivateInstance.delete(
			productsUrl + id + "/"
		);
		dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};
