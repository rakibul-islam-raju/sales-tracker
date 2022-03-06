import {
	CUSTOMER_LIST_REQUEST,
	CUSTOMER_LIST_SUCCESS,
	CUSTOMER_LIST_FAIL,
	CUSTOMER_LIST_RESET,
	CUSTOMER_CREATE_REQUEST,
	CUSTOMER_CREATE_SUCCESS,
	CUSTOMER_CREATE_FAIL,
	CUSTOMER_CREATE_RESET,
	CUSTOMER_EDIT_REQUEST,
	CUSTOMER_EDIT_SUCCESS,
	CUSTOMER_EDIT_FAIL,
	CUSTOMER_EDIT_RESET,
	CUSTOMER_DELETE_REQUEST,
	CUSTOMER_DELETE_SUCCESS,
	CUSTOMER_DELETE_FAIL,
	CUSTOMER_DELETE_RESET,
} from "../constants/customerConstants";

export const customerListReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_LIST_REQUEST:
			return { loading: true, customers: [] };

		case CUSTOMER_LIST_SUCCESS:
			return {
				loading: false,
				customers: action.payload,
			};
		case CUSTOMER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case CUSTOMER_LIST_RESET:
			return {};
		default:
			return state;
	}
};

export const customerCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_CREATE_REQUEST:
			return { loading: true };

		case CUSTOMER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				customer: action.payload,
			};

		case CUSTOMER_CREATE_FAIL:
			return { loading: false, error: action.payload };

		case CUSTOMER_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

export const customerEditReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_EDIT_REQUEST:
			return { loading: true };

		case CUSTOMER_EDIT_SUCCESS:
			return {
				loading: false,
				success: true,
				customer: action.payload,
			};

		case CUSTOMER_EDIT_FAIL:
			return { loading: false, error: action.payload };

		case CUSTOMER_EDIT_RESET:
			return {};

		default:
			return state;
	}
};

export const customerDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CUSTOMER_DELETE_REQUEST:
			return { loading: true };

		case CUSTOMER_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case CUSTOMER_DELETE_FAIL:
			return { loading: false, error: action.payload };

		case CUSTOMER_DELETE_RESET:
			return {};

		default:
			return state;
	}
};
