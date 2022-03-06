import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
	userLoginReducer,
	userListReducer,
	userCreateReducer,
	userEditReducer,
	userDeleteReducer,
	userDetailReducer,
} from "./redurers/userReduces";
import {
	productListReducer,
	productCreateReducer,
	productEditReducer,
	productDeleteReducer,
} from "./redurers/productReducers";
import {
	categoryListReducer,
	categoryCreateReducer,
	categoryEditReducer,
	categoryDeleteReducer,
} from "./redurers/categoryReducers";
import {
	customerListReducer,
	customerCreateReducer,
	customerEditReducer,
	customerDeleteReducer,
} from "./redurers/customerReducer";

// Combine reducers
const reducer = combineReducers({
	// users
	userLogin: userLoginReducer,
	userList: userListReducer,
	userCreate: userCreateReducer,
	userEdit: userEditReducer,
	userDelete: userDeleteReducer,
	userDetail: userDetailReducer,
	// products
	productList: productListReducer,
	productCreate: productCreateReducer,
	productEdit: productEditReducer,
	productDelete: productDeleteReducer,
	// categories
	categoryList: categoryListReducer,
	categoryCreate: categoryCreateReducer,
	categoryEdit: categoryEditReducer,
	categoryDelete: categoryDeleteReducer,
	// customers
	customerList: customerListReducer,
	customerCreate: customerCreateReducer,
	customerEdit: customerEditReducer,
	customerDelete: customerDeleteReducer,
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
