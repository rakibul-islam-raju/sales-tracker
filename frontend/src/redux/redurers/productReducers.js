import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };

		case PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		case PRODUCT_LIST_RESET:
			return {};
		default:
			return state;
	}
};
