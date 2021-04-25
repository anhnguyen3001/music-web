import { RootState } from "app/redux";
import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import './style.scss';

const Loading: React.FC = () => {
	const { isLoading } = useSelector((state: RootState) => state.loading);
	
	return (
		<>
			{isLoading ? (
				<div className="h-100 d-flex flex-column align-items-center justify-content-center">
					<Spinner animation="grow" />
					<div className='mt-12 loading-txt'>Loading</div>
				</div>
			) : null}
		</>
	);
};

export default Loading;
