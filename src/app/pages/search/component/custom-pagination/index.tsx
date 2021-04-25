import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import './style.scss';

interface Props {
    handleChoosePage: (page: number) => void,
    startPage: number,
    endPage: number,
    currentPage: number,
    totalPage: number,
}

const CustomPagination: React.FC<Props> = (props: Props) => {
    let { 
        handleChoosePage,
        totalPage,
        startPage,
        endPage,
        currentPage,
    } = props;

    const [pageItem, setPageItem] = useState<Array<any>>([]);

    useEffect(() => {
        let pages: Array<any> = [];
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push((
                <Pagination.Item key={i} active={currentPage === i} onClick={() => handleChoosePage(i)}>
                    {i}
                </Pagination.Item>
            ))
        }
        
        setPageItem(pages);
    }, [startPage, endPage, handleChoosePage, currentPage]);

    const renderPages = () => {
        let pages = [];
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push((
                <Pagination.Item key={i} active={currentPage === i} onClick={() => handleChoosePage(i)}>
                    {i}
                </Pagination.Item>
            ))
        }
    }

    return (
        <>
            <Pagination className='search-pagination'>
                <Pagination.Prev 
                    disabled={currentPage === 1} 
                    onClick={() => currentPage !== 1 && handleChoosePage(currentPage - 1)}
                />

                {pageItem}

                <Pagination.Next 
                    disabled={currentPage === totalPage} 
                    onClick={() => currentPage !== totalPage && handleChoosePage(currentPage + 1)}
                />
            </Pagination>
        </>
    )
}

export default CustomPagination;
