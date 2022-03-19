import {
	SALE_LIST_REQUEST,
	SALE_LIST_SUCCESS,
	SALE_LIST_FAIL,
	SALE_CREATE_REQUEST,
	SALE_CREATE_SUCCESS,
	SALE_CREATE_FAIL,
	SALE_EDIT_REQUEST,
	SALE_EDIT_SUCCESS,
	SALE_EDIT_FAIL,
	SALE_DELETE_REQUEST,
	SALE_DELETE_SUCCESS,
	SALE_DELETE_FAIL,
} from "../constants/saleConstants";
import { saleUrl } from "../../utils/urls";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

export const listSales = (params) => async (dispatch) => {
	try {
		dispatch({ type: SALE_LIST_REQUEST });
		const url = params ? saleUrl + "?" + params : saleUrl;
		const { data } = await axiosPrivateInstance.get(url);
		dispatch({ type: SALE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SALE_LIST_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const createSales = (categoryData) => async (dispatch) => {
	try {
		dispatch({ type: SALE_CREATE_REQUEST });
		const { data } = await axiosPrivateInstance.post(saleUrl, categoryData);
		dispatch({ type: SALE_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SALE_CREATE_FAIL,
			payload:
				error.response.status === 500
					? error.response.statusText
					: error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const editSales = (id, categoryData) => async (dispatch) => {
	try {
		dispatch({ type: SALE_EDIT_REQUEST });
		const { data } = await axiosPrivateInstance.patch(
			saleUrl + id + "/",
			categoryData
		);
		dispatch({ type: SALE_EDIT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SALE_EDIT_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const deleteSales = (id) => async (dispatch) => {
	try {
		dispatch({ type: SALE_DELETE_REQUEST });
		const { data } = await axiosPrivateInstance.delete(saleUrl + id + "/");
		dispatch({ type: SALE_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SALE_DELETE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};
