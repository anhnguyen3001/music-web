import React from 'react';

interface Props {
    children: any,
    text: string
}

const NotFoundItem: React.FunctionComponent<Props> = (props: Props) => {
    const {children, text} = props;

    return (
        <>
            <div className='not-found h-100 d-flex flex-column align-items-center justify-content-center'>
                {children}
                <div className='mt-12 not-found-text'>{text}</div>
            </div>
        </>
    )
}

export default NotFoundItem;
