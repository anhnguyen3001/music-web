import { FunctionComponent, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { disableLoading, enableLoading } from "../redux/modules/loading";

interface Props {
	enableLoading: (opacity?: number) => void;
	disableLoading: () => void;
}

const mapDispatchToProps = {
	enableLoading,
	disableLoading,
};

const BaseSplashScreen: FunctionComponent<Props> = ({
	enableLoading,
	disableLoading,
}) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(enableLoading())

		return () => {
			dispatch(disableLoading())
		};
	}, []);
	return null;
};

export const SplashScreen = connect(null, mapDispatchToProps)(BaseSplashScreen);
