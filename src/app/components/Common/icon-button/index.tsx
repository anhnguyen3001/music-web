import React from 'react';

interface Props {
    children: any,
    onClick: () => void,
}

const IconButton: React.FC<Props> = (props: Props) => {
    const { children, onClick } = props;
    return (
        <>
            <div
                className='w-20 h-20 m-12 pointer'
                onClick={onClick}>
                {children}
            </div>
        </>
    )
};

export default IconButton;
