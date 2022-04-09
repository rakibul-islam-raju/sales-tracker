import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import jwt_decode from "jwt-decode";

import {
	userLoginReducer,
	userListReducer,
	userCreateReducer,
	userEditReducer,
	userDeleteReducer,
	userDetailReducer,
	userTokenReducer,
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
import {
	saleListReducer,
	saleCreateReducer,
	saleDetailReducer,
	saleEditReducer,
	saleDeleteReducer,
} from "./redurers/saleReducers";
import { bucketReducer } from "./redurers/bucketReducers";

// Combine reducers
const reducer = combineReducers({
	// users
	userLogin: userLoginReducer,
	userToken: userTokenReducer,
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
	// sales
	saleList: saleListReducer,
	saleCreate: saleCreateReducer,
	saleDetail: saleDetailReducer,
	saleEdit: saleEditReducer,
	saleDelete: saleDeleteReducer,
	// bucket
	bucket: bucketReducer,
});

// get userInfo from local storage
const getTokenFromLocalStorage = localStorage.getItem("userInfo_inventory")
	? JSON.parse(localStorage.getItem("userInfo_inventory"))
	: null;

let userData;
if (getTokenFromLocalStorage) {
	userData = {
		...jwt_decode(getTokenFromLocalStorage.access),
	};
}

const initialState = {
	userLogin: { userInfo: userData },
	userToken: { tokens: getTokenFromLocalStorage },
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
