import React from 'react';
import './style.scss';

interface Props {
    children: any,
    title: string,
}

const SearchTabContent: React.FC<Props> = (props: Props) => {
    const { children, title } = props;

    return (
        <>
            <div className="search-tab-content">
                <div className="slide-header">
                    <h3 className='section-title'>
                        {title}
                    </h3>
                </div>
                {children}
            </div>
        </>
    )
}

export default SearchTabContent;
