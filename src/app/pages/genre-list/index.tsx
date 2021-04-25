import { fetchGenres } from 'app/api/explore';
import { DEFAULT_PAGE_SIZE } from 'app/constants/pagination';
import { Genre } from 'app/models/Genre';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card2 from 'app/components/Common/card2';
import { RoutePaths } from 'app/constants';
import { useHistory } from 'react-router';
import './style.scss';
import { useDispatch } from 'react-redux';
import { disableLoading, enableLoading } from 'app/redux/modules/loading';

const GenreList: React.FC = () => {
    const [genreList, setGenreList] = useState<Array<Genre>>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loadMore, setLoadMore] = useState<boolean>(true);
    const history = useHistory();
    const listRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(enableLoading());
        fetchData();
        dispatch(disableLoading());
        // setLoadMore(false);
    }, []);

    const fetchData = () => {
        fetchGenres()
            .then((data) => {
                // setCurrentPage(currentPage + 1);
                setGenreList([...genreList, ...data.genres]);
                // console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGenreDetail = (genre: Genre) => {
        history.push(`${RoutePaths.Genre.Index}/${genre.genre_id}/${genre.name}`);
    }

    const renderGenreList = () => {
        return genreList.map((genre: Genre) => {
            return (
                <Col md={3} sm={4} xs={6} key={genre.genre_id}>
                    <Card2 
                        {...genre}
                        size='medium'
                        handleNavigate={() => handleGenreDetail(genre)}
                        isGenre={true}
                    />
                </Col>
            )
        })
    };

    return (
        <div className="genre-container custom-container h-100">
            <h1 className="page-title">
                Genre
            </h1>

            <Row ref={listRef.current}>
                {renderGenreList()}
            </Row>
        </div>
    )
}

export default GenreList;
