import { fetchAlbumDetail } from 'app/api/explore';
import CustomButton from 'app/components/Common/button';
import SongList from 'app/components/Common/song-list';
import Loading from 'app/components/Common/loading';
import { RoutePaths } from 'app/constants';
import { playSong } from 'app/helpers/player';
import { Song } from 'app/models/Song';
import { RootState } from 'app/redux';
import { disableLoading, enableLoading } from 'app/redux/modules/loading';
import PlayIcon from 'assets/images/play-no-circle.svg';
import PauseIcon from 'assets/images/pause-no-circle.svg';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { togglePlayMusic } from 'app/redux/modules/player';

interface RouteParams {
    id: string,
    title: string,
}

const AlbumDetail: React.FC = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const { isPlaying } = useSelector((state: RootState) => state.player);
    const params = useParams<RouteParams>();
    let { id, title } = params;
    let [image, setImage] = useState<string>();
    let [singers, setSingers] = useState<string>();
    let [songList, setSongList] = useState<Array<Song>>([]);
    const [isPlayAlbum, setPlayAlbum] = useState<boolean>(false);
    
    useEffect(() => {
        dispatch(enableLoading());

        fetchAlbumDetail(parseInt(id))
            .then((data) => {
                setImage(data.album.image);
                setSingers(data.album.singers);
                setSongList(data.songs);
                dispatch(disableLoading());
                console.log(data)
            })
            .catch((err) => {
                console.log(err);
                dispatch(disableLoading());
            })
            
    }, []);

    useEffect(() => {
        if (isPlayAlbum && !isPlaying) {
            setPlayAlbum(false)
        }
    }, [isPlaying])

    const renderSingers = () => {
        let singerArr = singers?.split(', ');
        
        return singerArr?.map((singer, index) => {
            let subArr = singer.split('  ');
            return (
                <NavLink 
                    key={subArr[0]}
                    className='artist-name'
                    to={`${RoutePaths.Singer.Index}/${subArr[0]}/${subArr[1]}`}
                >
                    {subArr[1]}
                </NavLink>
            )
        })
    }

    const handlePlayAlbum = () => {
        if (isPlayAlbum) {
            dispatch(togglePlayMusic());
        } else {
            playSong(songList);
        }

        setPlayAlbum(!isPlayAlbum);
    }
    
    return (
        <>
            <div className="album-container custom-container h-100">
                <Loading />

                {!isLoading ? (
                    <>
                        <h1 className="page-title">
                            {title}
                        </h1>

                        <Row>
                            <Col lg={4} md={4} className='d-flex flex-column align-items-center'>
                                <div className='album-img-container'>
                                    <img className={`album-image ${isPlayAlbum && 'playing playing-slow'}`} src={image} alt='album cover'/>
                                </div>
                                
                                <div className='w-fit'>
                                    <CustomButton
                                        onClick={handlePlayAlbum}
                                        size='large'
                                        color='red'
                                        shape='circle'
                                        classNames={['mt-32']}
                                    >
                                        <img src={isPlayAlbum ? PauseIcon : PlayIcon} className='mr-12' alt='play, pause'/>
                                        <span>
                                            {isPlayAlbum ? 'Pause' : 'Play All Song'}
                                        </span>
                                    </CustomButton>
                                </div>
                                
                            </Col>

                            <Col>
                                <div className='album-songs'>
                                    <SongList songList={songList}/>
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : null}
            </div>
        </>
    )
}

export default AlbumDetail;
