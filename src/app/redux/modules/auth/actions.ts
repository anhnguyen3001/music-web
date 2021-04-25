import { me, signin } from "app/api/auth";
import { Action } from "app/models/redux/action";
import { Dispatch } from "react";

export const SIGN_IN = "SIGN_IN";
export const FETCH_USER = "FETCH_USER";
export const SIGN_OUT = "SIGN_OUT";

export const signIn = (access_token: string) => {
	return (dispatch: Dispatch<Action>) => signin(access_token)
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);

			dispatch({
				type: SIGN_IN,
				payload: res.data
			})
		})
		
};

export const fetchUser = (access_token: string) => {
	return (dispatch: Dispatch<Action>) => me(access_token)
		.then((res) => {
			console.log(res)
			dispatch({
				type: SIGN_IN,
				payload: res.data
			})
		})
};

export const signOut = () => ({
	type: SIGN_OUT,
});
