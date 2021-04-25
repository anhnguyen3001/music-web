import React, { useEffect, useRef, useState } from "react";
import Header from "app/components/Common/header";
import Controller from "app/components/Common/controller";
import { useSelector } from "react-redux";
import { RootState } from "app/redux";
import SideBar from "app/components/Common/sidebar";
import Loading from "app/components/Common/loading";
import ScrollToTop from "app/components/ScrollToTop";
import useClickOutside from "app/hooks/useClickOutside";
import { useLocation } from "react-router";

export const MainLayout: React.FC = ({ children }) => {
	const { songs } = useSelector((state: RootState) => state.player);
	const [visibleSidebar, setVisibleSideBar] = useState<boolean>(false);
	let sidebarRef = useRef<any>();
	const { pathname } = useLocation();

	useEffect(() => {
		if (visibleSidebar) {
			setVisibleSideBar(false);
		}
	}, [pathname]);

	return (
		<>
			<ScrollToTop>
				<SideBar isVisible={visibleSidebar} myRef={el => sidebarRef.current = el}/>
				<Header 
					showSidebar={visibleSidebar}
					toggleSidebar={() => setVisibleSideBar(!visibleSidebar)}/>
				<div className={`body ${songs.length && 'expand'} ${visibleSidebar && 'show-sidebar'}`}>
					<Loading />
					{children}
				</div>
				{songs.length ? <Controller /> : null}
			</ScrollToTop>
			
		</>
	);
};
