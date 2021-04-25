import { fetchSingers } from 'app/api/explore';
import CardSinger from 'app/components/Common/card-singer';
import Loading from 'app/components/Common/loading';
import ScrollToTopButton from 'app/components/Common/scroll-to-top-button';
import { DEFAULT_PAGE_SIZE } from 'app/constants/pagination';
import { Singer } from 'app/models/Singer';
import { disableLoading, enableLoading } from 'app/redux/modules/loading';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import './style.scss';

const SingerList: React.FC = () => {
    const [singerList, setSingerList] = useState<Array<Singer>>([]);
    const [loadMore, setLoadMore] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchData = useCallback(() => {
        fetchSingers(DEFAULT_PAGE_SIZE - 1, singerList.length)
            .then((data) => {
                console.log(data)
                if (data.singers.length) {
                    setSingerList([...singerList, ...data.singers]);
                    return;
                }
                setHasMore(false);
            })
            .catch((err) => {
                console.log(err);
                setHasMore(false);
            })
    }, [singerList]);

    const observer = useRef<IntersectionObserver>();
    const lastElementRef = useCallback(node => {
        if (loadMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLoadMore(true);
                fetchData();
                setLoadMore(false)
            }
        })

        if (node) observer.current.observe(node);
    }, [singerList, hasMore]);

    useEffect(() => {
        dispatch(enableLoading());
        fetchData();
        dispatch(disableLoading());
    }, []);

    const renderSingerList = () => {
        let total = singerList.length;

        return singerList.map((singer: Singer, index: number) => {
            if (index === total - 1) {
                return (
                    <Col lg={2} md={3} sm={4} xs={6} key={index} ref={lastElementRef}>
                        <CardSinger 
                            {...singer}
                            size='medium'
                        />
                    </Col>
                )
            }

            return (
                <Col lg={2} md={3} sm={4} xs={6} key={index}>
                    <CardSinger 
                        {...singer}
                        size='medium'
                    />
                </Col>
            )
        })
    }

    return (
        <div className="singer-container custom-container h-100">
            <h1 className="page-title">
                Singer
            </h1>

            <Loading />
            <Row>
                {renderSingerList()}
            </Row>

            <ScrollToTopButton />
        </div>
    )
}

export default SingerList;
