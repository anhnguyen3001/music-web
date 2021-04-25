// import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import { loadingReducer } from "./loading";
import { playerReducer } from './player';
import { authReducer } from './auth';

// export const rootEpic: any = combineEpics(
// 	loginEpic,
// 	logoutEpic,
// 	fetchUserEpic,
// 	onFetchUserSuccessEpic,
// 	fetchPermissionsEpic,
// );

export const rootReducer = combineReducers({
    player: playerReducer,
    loading: loadingReducer,
    auth: authReducer,
});
