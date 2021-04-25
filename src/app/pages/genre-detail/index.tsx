import { fetchAblumByGenre, fetchGenreDetail, fetchSongByGenre, fetchSongsByAlbumId } from 'app/api/explore';
import Card1 from 'app/components/Common/card1';
import Card2 from 'app/components/Common/card2';
import ScrollToTopButton from 'app/components/Common/scroll-to-top-button';
import { RoutePaths } from 'app/constants';
import { DEFAULT_PAGE_SIZE } from 'app/constants/pagination';
import { playSong } from 'app/helpers/player';
import { Album } from 'app/models/Album';
import { Song } from 'app/models/Song';
import { RootState } from 'app/redux';
import { disableLoading, enableLoading } from 'app/redux/modules/loading';
import $ from 'jquery';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import './style.scss';

const SEE_MORE = {
    SONG: 0,
    ALBUM: 1,
}

interface RouteParams {
    id: string,
    title: string,
}

const GenreDetail: React.FC = () => {
    const { isPlaying, songs, songIndex } = useSelector((state: RootState) => state.player);
    const params = useParams<RouteParams>();
    let { id, title } = params;
    const [songList, setSongList] = useState<Array<Song>>([]);
    const [albumList, setAlbumList] = useState<Array<Album>>([]);
    const [seeMore, setSeeMore] = useState<number>(-1);
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [loadMore, setLoadMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const observer = useRef<IntersectionObserver>();
    const lastSongElementRef = useCallback(node => {
        if (loadMore || seeMore !== SEE_MORE.SONG) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLoadMore(true);
                let first = DEFAULT_PAGE_SIZE - 1;
                let offset = songList.length;
                fetchSongByGenre(parseInt(id), first, offset)
                    .then((data) => {
                        if (!data.songs.length) {
                            setHasMore(false);
                        }

                        setSongList([...songList, ...data.songs]);
                        setLoadMore(false);
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoadMore(false);
                    });
                
            }
        })

        if (node) observer.current.observe(node);
    }, [loadMore, seeMore, id, songList]);

    const albumObserver = useRef<IntersectionObserver>();
    const lastAlbumElementRef = useCallback(node => {
        if (loadMore || seeMore !== SEE_MORE.ALBUM) return;
        if (albumObserver.current) albumObserver.current.disconnect();
        albumObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setLoadMore(true);
                let first = DEFAULT_PAGE_SIZE - 1;
                let offset = albumList.length;
                fetchAblumByGenre(parseInt(id), first, offset)
                    .then((data) => {
                        
                        if (!data.albums.length) {
                            setHasMore(false);
                        }

                        setAlbumList([...albumList, ...data.albums])
                        // setCurrentPage(currentPage + 1);
                        setLoadMore(false);
                        
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoadMore(false);
                    });
                
            }
        })

        if (node) albumObserver.current.observe(node);
    }, [loadMore, seeMore, id, albumList]);

    useEffect(() => {
        dispatch(enableLoading());
        fetchGenreDetail(parseInt(id))
            .then((data) => {
                setSongList(data.songs);
                setAlbumList(data.albums);
                dispatch(disableLoading());
            })
            .catch(err => {
                console.log(err);
                dispatch(disableLoading());
            }) 
    }, []);

    useEffect(() => {
        if (seeMore === -1) {
            if (songList.length > DEFAULT_PAGE_SIZE) {
                let revertSongList = songList.slice(0, DEFAULT_PAGE_SIZE - 1);
                setSongList(revertSongList);
            } else {
                let revertAlbumList = albumList.slice(0, DEFAULT_PAGE_SIZE - 1);
                setAlbumList(revertAlbumList);
            }

            setHasMore(true);
            setLoadMore(false);
        } 
    }, [seeMore]);
    
    const handlePlay = (album_id: number) => {
        fetchSongsByAlbumId(album_id)
            .then((data) => {
                playSong(data.songs);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleNavigate = (album_id: number) => {
        history.push(`${RoutePaths.Album.Index}/${album_id}`);
    }

    const renderSongElements = () => {
        return (
            songList.map((song: Song, index) => {
                if (index === songList.length - 1) {
                    return (
                        <Col lg={2} sm={4} xs={6} key={index} ref={lastSongElementRef}>
                            <Card1 
                                {...song}
                                size='medium'
                                isPlaying={isPlaying && songs[songIndex].track_id === song.track_id}
                                onClick={() => playSong([song])}
                            />
                        </Col>
                    )
                }

                return (
                    <Col lg={2} sm={4} xs={6} key={index}>
                        <Card1 
                            {...song}
                            size='medium'
                            isPlaying={isPlaying && songs[songIndex].track_id === song.track_id}
                            onClick={() => playSong([song])}
                        />
                    </Col>
                )
            })
        )
    };

    const renderAlbumElements = () => {
        return albumList.map((album: Album, index) => {
            if (index === albumList.length - 1) {
                return (
                    <Col lg={2} sm={4} xs={6} key={index} ref={lastAlbumElementRef}>
                        <Card2  
                            {...album}
                            size='medium'
                            handleNavigate={() => handleNavigate(album.album_id)}
                            handlePlay={() => handlePlay(album.album_id)}
                        />
                    </Col>
                )
            }

            return (
                <Col lg={2} sm={4} xs={6} key={index}>
                    <Card2  
                        {...album}
                        size='medium'
                        handleNavigate={() => handleNavigate(album.album_id)}
                        handlePlay={() => handlePlay(album.album_id)}
                    />
                </Col>
            )
        })
    };

    const toggleSeeMore = (mode: number) => {
        if (mode !== seeMore) {
            setSeeMore(mode);
        } else {
            setSeeMore(-1);
            handleScrollToTop()
        }
    }

    const handleScrollToTop = () => {
        $('body').animate({ scrollTop: 0 }, 'slow');
    }

    return (
        <>
            <div className="genre-detail-container custom-container">
                <h1 className="page-title">
                    {title}
                </h1>

                {seeMore !== SEE_MORE.ALBUM ? (
                    <section className='genre-song'>
                        <div className="d-flex align-items-end justify-content-between">
                            <h2 className='section-title mb-20'>
                                Song 🤘
                            </h2>

                            <span 
                                className='txt-link text-center mt-12 mb-20'
                                onClick={() => toggleSeeMore(SEE_MORE.SONG)}
                            >
                                {seeMore === SEE_MORE.SONG ? 'See Less' : 'See More'}
                            </span>
                        </div>
                        

                        {songList.length ? (
                            <Row>
                                {renderSongElements()}
                            </Row>
                        ) : null}
                    </section>
                ) : null}

                {seeMore !== SEE_MORE.SONG ? (
                    <section className='genre-album'>
                        <div className="d-flex align-items-end justify-content-between">
                            <h2 className='section-title mb-20'>
                                Album 😎
                            </h2>

                            <span 
                                className='txt-link text-center mt-12 mb-20'
                                onClick={() => toggleSeeMore(SEE_MORE.ALBUM)}
                            >
                                {seeMore === SEE_MORE.ALBUM ? 'See Less' : 'See More'}
                            </span>
                        </div>
                        

                        {albumList.length ? (
                            <Row>
                                {renderAlbumElements()}
                            </Row>
                        ) : null}
                    </section>
                ) : null}

                <ScrollToTopButton />
            </div>
        </>
    )
}

export default GenreDetail;
