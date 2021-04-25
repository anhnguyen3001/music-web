import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from 'jquery';

interface Props {
    children: any
}

const ScrollToTop: React.FC<Props> = (props: Props) => {
    const { children } = props;    
    const { pathname } = useLocation();
    
    useEffect(() => {
        $('body').animate({ scrollTop: 0 }, 'slow');
    }, [pathname]);
    
    return children;
}
 
export default ScrollToTop;
