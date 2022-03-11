import {
	USER_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_AUTH_TOKEN_SUCCESS,
	USER_AUTH_TOKEN_RESET,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_CREATE_FAIL,
	USER_EDIT_REQUEST,
	USER_EDIT_SUCCESS,
	USER_EDIT_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DETAIL_REQUEST,
	USER_DETAIL_SUCCESS,
	USER_DETAIL_FAIL,
	USER_DETAIL_RESET,
} from "../constants/userConstants";
import jwt_decode from "jwt-decode";
import { loginUrl, usersUrl } from "../../utils/urls";
import {
	axiosPrivateInstance,
	axiosPublicInstance,
} from "../../utils/axiosInstance";

export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo_inventory");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_AUTH_TOKEN_RESET });
	dispatch({ type: USER_DETAIL_RESET });
	dispatch({ type: USER_LIST_RESET });
};

export const tokenUpdate = (data) => async (dispatch) => {
	try {
		dispatch({
			type: USER_AUTH_TOKEN_SUCCESS,
			payload: data,
		});

		// save userInfo in local storage
		localStorage.setItem("userInfo_inventory", JSON.stringify(data));
	} catch (error) {
		// logout();
		dispatch(logout());
	}
};

export const login = (credential) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const { data } = await axiosPublicInstance.post(loginUrl, credential);

		const userData = {
			...jwt_decode(data.access),
		};

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: userData,
		});

		dispatch({
			type: USER_AUTH_TOKEN_SUCCESS,
			payload: data,
		});

		// save userInfo in local storage
		localStorage.setItem("userInfo_inventory", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const listUsers = (params) => async (dispatch) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });
		const url = params ? usersUrl + "?" + params : usersUrl;
		const { data } = await axiosPrivateInstance.get(url);
		dispatch({ type: USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const createUsers = (userData) => async (dispatch) => {
	try {
		dispatch({ type: USER_CREATE_REQUEST });
		const { data } = await axiosPrivateInstance.post(usersUrl, userData);
		dispatch({ type: USER_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_CREATE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const editUsers = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: USER_EDIT_REQUEST });
		const { data } = await axiosPrivateInstance.patch(
			usersUrl + id + "/",
			userData
		);
		dispatch({ type: USER_EDIT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_EDIT_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const deleteUsers = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });
		const { data } = await axiosPrivateInstance.delete(usersUrl + id + "/");
		dispatch({ type: USER_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};

export const detailUsers = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAIL_REQUEST });
		const { data } = await axiosPrivateInstance.delete(usersUrl + id + "/");
		dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_DETAIL_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};
