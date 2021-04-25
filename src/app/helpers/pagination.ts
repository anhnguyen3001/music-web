import { DEFAULT_PAGE_SIZE } from "app/constants/pagination";

export const getTotalPage = (totalItems: number) => {
    return Math.ceil(totalItems / DEFAULT_PAGE_SIZE);
}

export const getPager = (totalPages: number, currentPage?: number) => {
    // default to first page
    currentPage = currentPage || 1;
    
    let startPage: number, endPage: number;
    if (totalPages <= 5 ) {
        startPage = 1;
        endPage = totalPages;
        
    } else {
        if (currentPage < 5) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 3;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    return {
        startPage: startPage,
        endPage: endPage,
    };
}

export const calculateIndex = (currentPage: number, totalItems: number) => {
    let startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    let endIndex = Math.min(startIndex + DEFAULT_PAGE_SIZE - 1, totalItems - 1);

    return {
        startIndex,
        endIndex
    };
}
