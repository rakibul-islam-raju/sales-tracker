import axios from "axios";
import dayjs from "dayjs";
import jwt_decode from "jwt-decode";
import { baseUrl, tokenRefreshUrl } from "./urls";
import store from "../redux/store";
import { tokenUpdate } from "../redux/actions/userActions";
import { USER_AUTH_TOKEN_RESET } from "../redux/constants/userConstants";

let getTokenFromLocalStorage = localStorage.getItem("userInfo_inventory")
	? JSON.parse(localStorage.getItem("userInfo_inventory"))
	: null;

// const state = store.getState();
// const userToken = state.userToken;
// const authTokens = state.userToken.userTokens;

const axiosInstance = axios.create({
	baseUrl,
	headers: {
		"Content-type": "application/json",
		Authorization: `Bearer ${getTokenFromLocalStorage?.access}`,
	},
});

// interceptors
axiosInstance.interceptors.request.use(async (req) => {
	if (!getTokenFromLocalStorage) {
		getTokenFromLocalStorage = localStorage.getItem("userInfo_inventory")
			? JSON.parse(localStorage.getItem("userInfo_inventory"))
			: null;

		req.headers.Authorization = `Bearer ${getTokenFromLocalStorage?.access}`;

		// store.dispatch(tokenUpdate(getTokenFromLocalStorage));
	}

	const user = jwt_decode(getTokenFromLocalStorage.access);
	const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

	if (!isExpired) {
		return req;
	} else {
		const { data } = await axios.post(tokenRefreshUrl, {
			refresh: getTokenFromLocalStorage.refresh,
		});

		localStorage.setItem("userInfo_inventory", JSON.stringify(data));
		// store.dispatch({ type: USER_AUTH_TOKEN_RESET });
		// store.dispatch(tokenUpdate(data));

		req.headers.Authorization = `Bearer ${data.access}`;

		return req;
	}
});

export default axiosInstance;
