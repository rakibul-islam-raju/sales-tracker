import {
	BUCKET_ADD_ITEM,
	BUCKET_REMOVE_ITEM,
} from "../constants/bucketConstants";

export const addToBucket = (data, qty, price) => async (dispatch) => {
	dispatch({
		type: BUCKET_ADD_ITEM,
		payload: {
			product: data.id,
			name: data.name,
			code: data.code,
			category: data.category.id,
			quantity: qty,
			price,
		},
	});
};

export const removeFromBucket = (id) => (dispatch) => {
	dispatch({
		type: BUCKET_REMOVE_ITEM,
		payload: id,
	});
};
