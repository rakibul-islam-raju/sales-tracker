import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer } from "./redurers/userReduces";

// Combine reducers
const reducer = combineReducers({
	userLogin: userLoginReducer,
});

// get userInfo from local storage
const userInfoFromStorage = localStorage.getItem("userInfo_inventory")
	? JSON.parse(localStorage.getItem("userInfo_inventory"))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

// redux-thund middleware
const middleWare = [thunk];

// store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
