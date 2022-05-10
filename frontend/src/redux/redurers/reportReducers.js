import {
	SALE_REPORT_REQUEST,
	SALE_REPORT_SUCCESS,
	SALE_REPORT_FAIL,
	SALE_REPORT_RESET,
} from "../constants/reportConstants";

export const saleReportListReducer = (state = {}, action) => {
	switch (action.type) {
		case SALE_REPORT_REQUEST:
			return { loading: true, data: [] };
		case SALE_REPORT_SUCCESS:
			return {
				loading: false,
				data: action.payload,
			};
		case SALE_REPORT_FAIL:
			return { loading: false, error: action.payload };
		case SALE_REPORT_RESET:
			return {};
		default:
			return state;
	}
};
