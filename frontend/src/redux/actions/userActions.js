import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_CREATE_REQUEST,
	USER_CREATE_SUCCESS,
	USER_CREATE_FAIL,
	USER_CREATE_RESET,
	USER_EDIT_REQUEST,
	USER_EDIT_SUCCESS,
	USER_EDIT_FAIL,
	USER_EDIT_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_DELETE_RESET,
	USER_DETAIL_REQUEST,
	USER_DETAIL_SUCCESS,
	USER_DETAIL_FAIL,
	USER_DETAIL_RESET,
} from "../constants/userConstants";
import { loginUrl, usersUrl } from "../../utils/urls";

export const login = (credential) => async (dispatch) => {
	console.log("trigerred =>>");
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post(loginUrl, credential, config);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data.detail });

		// save userInfo in local storage
		localStorage.setItem("userInfo_inventory", JSON.stringify(data.detail));
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

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.get(usersUrl, config);

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

export const createUsers = (userData) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.post(usersUrl, userData, config);

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

export const editUsers = (id, userData) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_EDIT_REQUEST });

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
			usersUrl + id + "/",
			userData,
			config
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

export const deleteUsers = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.delete(usersUrl + id + "/", config);

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

export const detailUsers = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAIL_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${userInfo.access}`,
			},
		};

		const { data } = await axios.delete(usersUrl + id + "/", config);

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
