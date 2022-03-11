import {
	CATEGORY_LIST_REQUEST,
	CATEGORY_LIST_SUCCESS,
	CATEGORY_LIST_FAIL,
	CATEGORY_CREATE_REQUEST,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_CREATE_FAIL,
	CATEGORY_EDIT_REQUEST,
	CATEGORY_EDIT_SUCCESS,
	CATEGORY_EDIT_FAIL,
	CATEGORY_DELETE_REQUEST,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_DELETE_FAIL,
} from "../constants/categoryConstants";
import { categoryUrl } from "../../utils/urls";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

export const listCategories = (params) => async (dispatch) => {
	try {
		dispatch({ type: CATEGORY_LIST_REQUEST });
		const url = params ? categoryUrl + "?" + params : categoryUrl;
		const { data } = await axiosPrivateInstance.get(url);
		dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CATEGORY_LIST_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const createCategories = (categoryData) => async (dispatch) => {
	try {
		dispatch({ type: CATEGORY_CREATE_REQUEST });
		const { data } = await axiosPrivateInstance.post(
			categoryUrl,
			categoryData
		);
		dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CATEGORY_CREATE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const editCategories = (id, categoryData) => async (dispatch) => {
	try {
		dispatch({ type: CATEGORY_EDIT_REQUEST });
		const { data } = await axiosPrivateInstance.patch(
			categoryUrl + id + "/",
			categoryData
		);
		dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CATEGORY_EDIT_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const deleteCategories = (id) => async (dispatch) => {
	try {
		dispatch({ type: CATEGORY_DELETE_REQUEST });
		const { data } = await axiosPrivateInstance.delete(
			categoryUrl + id + "/"
		);
		dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CATEGORY_DELETE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};
