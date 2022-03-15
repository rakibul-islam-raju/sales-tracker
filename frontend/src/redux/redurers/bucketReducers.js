import {
	BUCKET_ADD_ITEM,
	BUCKET_REMOVE_ITEM,
	BUCKET_CLEAR,
} from "../constants/bucketConstants";

export const bucketReducer = (state = { bucketItems: [] }, action) => {
	switch (action.type) {
		case BUCKET_ADD_ITEM:
			const item = action.payload;
			const existItem = state.bucketItems.find(
				(x) => x.product === item.product
			);

			if (existItem) {
				return {
					...state,
					bucketItems: state.bucketItems.map((x) =>
						x.product === existItem.product ? item : x
					),
				};
			} else {
				return {
					...state,
					bucketItems: [...state.bucketItems, item],
				};
			}

		case BUCKET_REMOVE_ITEM:
			return {
				...state,
				bucketItems: state.bucketItems.filter(
					(item) => item.product !== action.payload
				),
			};

		case BUCKET_CLEAR:
			return {
				...state,
				bucketItems: [],
			};

		default:
			return state;
	}
};
