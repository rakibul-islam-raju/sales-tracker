import {
	SALE_REPORT_REQUEST,
	SALE_REPORT_SUCCESS,
	SALE_REPORT_FAIL,
} from "../constants/reportConstants";
import { saleUrl } from "../../utils/urls";
import { axiosPrivateInstance } from "../../utils/axiosInstance";

export const listSaleReports = (params) => async (dispatch) => {
	try {
		dispatch({ type: SALE_REPORT_REQUEST });
		const url = params
			? saleUrl + "last-week/?" + params
			: saleUrl + "last-week/";
		const { data } = await axiosPrivateInstance.get(url);
		dispatch({ type: SALE_REPORT_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SALE_REPORT_FAIL,
			payload:
				error.response && error.response.data
					? error.response.data
					: error.message,
		});
	}
};
