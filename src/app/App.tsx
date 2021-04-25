import React from "react";
import { Provider } from "react-redux";
import store from "./redux";
import { Routes } from "./routes";
import { SplashScreen } from "./components/SplashScreen";

const { PUBLIC_URL } = process.env;

const App = () => {
	return (
		<Provider store={store}>
			<React.Suspense fallback={<SplashScreen />}>
				<Routes basename={PUBLIC_URL} />
			</React.Suspense>
		</Provider>
	);
};

export default App;
