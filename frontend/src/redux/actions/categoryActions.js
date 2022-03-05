import axios from "axios";
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

export const listCategories = () => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.get(categoryUrl, config);

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

export const createCategories =
	(categoryData) => async (dispatch, getState) => {
		try {
			dispatch({ type: CATEGORY_CREATE_REQUEST });

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${userInfo.access}`,
				},
			};

			const { data } = await axios.post(
				categoryUrl,
				categoryData,
				config
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

export const editCategories =
	(id, categoryData) => async (dispatch, getState) => {
		try {
			dispatch({ type: CATEGORY_EDIT_REQUEST });

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
				categoryUrl + id + "/",
				categoryData,
				config
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

export const deleteCategories = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: CATEGORY_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.delete(categoryUrl + id + "/", config);

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
