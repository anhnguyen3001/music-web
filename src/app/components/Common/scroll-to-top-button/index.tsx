import React from 'react';
import ArrowUp from 'assets/images/arrow-up-white.svg';
import $ from 'jquery';
import './style.scss';

const ScrollToTopButton: React.FC = () => {
    const handleScrollToTop = () => {
        $('body').animate({ scrollTop: 0 }, 'slow');
    }

    return (
        <div  className='scroll-top-button' onClick={handleScrollToTop}>
            <img src={ArrowUp} alt='scroll to top'/>
        </div>
    )
}

export default ScrollToTopButton;
