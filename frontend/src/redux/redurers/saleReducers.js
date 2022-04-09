import {
	SALE_LIST_REQUEST,
	SALE_LIST_SUCCESS,
	SALE_LIST_FAIL,
	SALE_LIST_RESET,
	SALE_CREATE_REQUEST,
	SALE_CREATE_SUCCESS,
	SALE_CREATE_FAIL,
	SALE_CREATE_RESET,
	SALE_DETAIL_REQUEST,
	SALE_DETAIL_SUCCESS,
	SALE_DETAIL_FAIL,
	SALE_DETAIL_RESET,
	SALE_EDIT_REQUEST,
	SALE_EDIT_SUCCESS,
	SALE_EDIT_FAIL,
	SALE_EDIT_RESET,
	SALE_DELETE_REQUEST,
	SALE_DELETE_SUCCESS,
	SALE_DELETE_FAIL,
	SALE_DELETE_RESET,
} from "../constants/saleConstants";

export const saleListReducer = (state = {}, action) => {
	switch (action.type) {
		case SALE_LIST_REQUEST:
			return { loading: true, sales: [] };

		case SALE_LIST_SUCCESS:
			return {
				loading: false,
				sales: action.payload,
			};
		case SALE_LIST_FAIL:
			return { loading: false, error: action.payload };
		case SALE_LIST_RESET:
			return {};
		default:
			return state;
	}
};

export const saleDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case SALE_DETAIL_REQUEST:
			return { loading: true };

		case SALE_DETAIL_SUCCESS:
			return {
				loading: false,
				sale: action.payload,
			};

		case SALE_DETAIL_FAIL:
			return { loading: false, error: action.payload };

		case SALE_DETAIL_RESET:
			return {};

		default:
			return state;
	}
};

export const saleCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SALE_CREATE_REQUEST:
			return { loading: true };

		case SALE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				sale: action.payload,
			};

		case SALE_CREATE_FAIL:
			return { loading: false, error: action.payload };

		case SALE_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

export const saleEditReducer = (state = {}, action) => {
	switch (action.type) {
		case SALE_EDIT_REQUEST:
			return { loading: true };

		case SALE_EDIT_SUCCESS:
			return {
				loading: false,
				success: true,
				sale: action.payload,
			};

		case SALE_EDIT_FAIL:
			return { loading: false, error: action.payload };

		case SALE_EDIT_RESET:
			return {};

		default:
			return state;
	}
};

export const saleDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case SALE_DELETE_REQUEST:
			return { loading: true };

		case SALE_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			};

		case SALE_DELETE_FAIL:
			return { loading: false, error: action.payload };

		case SALE_DELETE_RESET:
			return {};

		default:
			return state;
	}
};
