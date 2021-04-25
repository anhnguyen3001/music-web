import configureStore from "./configureStore";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from './modules/root';
import thunk from 'redux-thunk';

// const { store, persistor } = configureStore();

// export { persistor };
const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
