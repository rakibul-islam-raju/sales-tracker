import axios from "axios";
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
} from "../constants/userConstants";
import { loginUrl } from "../../utils/urls";

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
