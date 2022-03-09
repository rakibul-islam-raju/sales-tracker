import {
	USER_LOGOUT,
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
	USER_AUTH_TOKEN_SUCCESS,
	USER_AUTH_TOKEN_RESET,
} from "../constants/userConstants";

export const userTokenReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_AUTH_TOKEN_SUCCESS:
			return { tokens: action.payload };
		case USER_AUTH_TOKEN_RESET:
			return {};
		default:
			return state;
	}
};

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userListReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true, users: [] };

		case USER_LIST_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			};
		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case USER_LIST_RESET:
			return {};
		default:
			return state;
	}
};

export const userCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_CREATE_REQUEST:
			return { loading: true };

		case USER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				user: action.payload,
			};

		case USER_CREATE_FAIL:
			return { loading: false, error: action.payload };

		case USER_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

export const userEditReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_EDIT_REQUEST:
			return { loading: true };

		case USER_EDIT_SUCCESS:
			return {
				loading: false,
				success: true,
				user: action.payload,
			};

		case USER_EDIT_FAIL:
			return { loading: false, error: action.payload };

		case USER_EDIT_RESET:
			return {};

		default:
			return state;
	}
};

export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { loading: true };

		case USER_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case USER_DELETE_FAIL:
			return { loading: false, error: action.payload };

		case USER_DELETE_RESET:
			return {};

		default:
			return state;
	}
};

export const userDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DETAIL_REQUEST:
			return { loading: true };

		case USER_DETAIL_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			};

		case USER_DETAIL_FAIL:
			return { loading: false, error: action.payload };

		case USER_DETAIL_RESET:
			return {};

		default:
			return state;
	}
};
