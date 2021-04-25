import { fetchSearchResult } from 'app/api/explore';
import { Album } from 'app/models/Album';
import { Singer } from 'app/models/Singer';
import { Song } from 'app/models/Song';
import React, { useCallback, useEffect, useState } from 'react';
import { Nav, Row, Tab, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router';
import './style.scss';
import NotFoundSong from 'assets/images/not-found-song.svg';
import NotFoundItem from 'app/components/Common/not-found-item';
import SingerSlide from './component/singer-slide';
import SongSlide from 'app/components/Common/song-slide';
import AlbumSlide from 'app/components/Common/album-slide';
import SearchTabContent from './component/search-tab-content';
import SingerList from './component/singer-list';
import SongList from './component/song-list';
import AlbumList from './component/album-list';
import { useDispatch, useSelector } from 'react-redux';
import { disableLoading, enableLoading } from 'app/redux/modules/loading';
import { RootState } from 'app/redux';
import Loading from 'app/components/Common/loading';
import { DEFAULT_PAGE_SIZE } from 'app/constants/pagination';

const eventKey = {
    All: 0,
    Singer: 1,
    Song: 2,
    Album: 3,
};

interface RouteParams {
    keyword: string,
}

const SearchPage: React.FC = () => {
    const params = useParams<RouteParams>();
    let { keyword } = params;

    const dispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.loading);

    const [resultSong, setResultSong] = useState<Array<Song>>([]);
    const [topSong, setTopSong] = useState<Array<Song>>([]);

    const [resultAlbum, setResultAlbum] = useState<Array<Album>>([]);
    const [topAlbum, setTopAlbum] = useState<Array<Album>>([]);

    const [resultArtist, setResultArtist] = useState<Array<Singer>>([]);
    const [topArtist, setTopArtist] = useState<Array<Singer>>([]);
    const [tab, setTab] = useState<Array<{
        title: string,
        eventKey: number,
        total: number,
    }>>([]);

    useEffect(() => {
        dispatch(enableLoading());

        fetchSearchResult(keyword)
            .then((data) => {
                console.log(data)
                let menu: Array<{
                    title: string,
                    eventKey: number,
                    total: number,
                }> = [];
                
                const {artists, songs, albums} = data;
                setResultArtist(artists);
                setResultSong(songs);
                setResultAlbum(albums);

                let artistLength = artists.length;
                let songLength = songs.length;
                let albumLength = albums.length;

                if (artistLength || songLength || albumLength) {
                    menu.push({
                        title: 'All',
                        eventKey: eventKey.All,
                        total: artistLength + songLength + albumLength,
                    });

                    if (artistLength) {
                        setTopArtist(artists.slice(0, 4));

                        menu.push({
                            title: 'Singer',
                            eventKey: eventKey.Singer,
                            total: artistLength,
                        });
                    }

                    if (songLength) {
                        setTopSong(songs.slice(0, 6));

                        menu.push({
                            title: 'Song',
                            eventKey: eventKey.Song,
                            total: songLength,
                        });
                    }

                    if (albumLength) {
                        setTopAlbum(albums.slice(0, 6));

                        menu.push({
                            title: 'Album',
                            eventKey: eventKey.Album,
                            total: albumLength,
                        });
                    }
                }

                setTab(menu);

                if (!artistLength) {
                    setTopArtist([]);
                }
                
                if (!songLength) {
                    setTopSong([]);
                }

                if (!albumLength) {
                    setTopAlbum([]);
                }
                
                dispatch(disableLoading());
            })
            .catch(err => {
                console.log(err);
                dispatch(disableLoading());
            });
    }, [keyword]);

    const renderTab = () => {
        return tab?.map(({title, eventKey, total}, index) => {
            return (
                <Nav.Item className="search-nav-item" key={index}>
                    <Nav.Link 
                        eventKey={eventKey} 
                        className='d-flex justify-content-between search-nav-link'>
                        <span>
                            {title}
                        </span>
                        <Badge 
                            as='div'
                            className='d-flex justify-content-center align-items-center search-nav-badge'>
                            {total}
                        </Badge>
                    </Nav.Link>
                </Nav.Item>
            )
        })
    }

    return (
        <>
            <div className="search-container custom-container h-100 d-flex flex-column">
                <h1 className="page-title">
                    Search result
                </h1>

                {isLoading ? <Loading /> : (
                    <>
                        {tab.length ? (
                            <Tab.Container defaultActiveKey={eventKey.All}>
                                <Row className='flex-fill'>
                                    <Col md={3} sm={4}>
                                        <Nav className="flex-column search-left-tab">
                                            {renderTab()}
                                        </Nav>
                                    </Col>

                                    <Col md={9} sm={8}>
                                        <Tab.Content className='h-100'>
                                            <Tab.Pane eventKey={eventKey.All}>
                                                <div className='tab-all'>
                                                    {resultArtist.length ? <SingerSlide singerList={topArtist}/> : null}
                                                    
                                                    {resultSong.length ? (
                                                        <SongSlide
                                                            title='Song'
                                                            songList={topSong}/>
                                                    ) : null}
                                                    
                                                    {resultAlbum.length ? (
                                                        <AlbumSlide 
                                                            title='Album'
                                                            albumList={topAlbum}/>
                                                    ) : null}
                                                    
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey={eventKey.Singer}>
                                                <SearchTabContent title='Singer'>
                                                    <SingerList singerList={resultArtist}/>
                                                </SearchTabContent>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey={eventKey.Song}>
                                                <SearchTabContent title='Song'>
                                                    <SongList songList={resultSong} />
                                                </SearchTabContent>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey={eventKey.Album}>
                                                <SearchTabContent title='Album'>
                                                    <AlbumList albumList={resultAlbum}/>
                                                </SearchTabContent>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                            ) : (
                                <NotFoundItem text="Can't found any song, albums, singerss">
                                    <img src={NotFoundSong} alt='not found sond' />
                                </NotFoundItem>
                            )
                        }
                    </>
                )}
            </div>
        </>
    )
} 

export default SearchPage;