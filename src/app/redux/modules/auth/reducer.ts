import { SIGN_IN, SIGN_OUT } from "./actions";
import { Action } from "app/models/redux/action";

const initialState = {
	access_token: localStorage.getItem('access_token'),
	name: '',
	image: ''
}

export const authReducer = (
	state: any = initialState,
	action: Action
) => {
	console.log(action);
	switch (action.type) {
		
		case "SIGN_IN":
			return {
				...state,
				...action.payload
			};
		case SIGN_OUT:
			return {
				...state,
				access_token: null,
				name: '',
				image: ''
			};

		default:
			return state;
	}
};
