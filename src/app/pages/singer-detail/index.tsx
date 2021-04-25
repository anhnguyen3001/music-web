import { fetchArtistDetail } from 'app/api/explore';
import AlbumSlide from 'app/components/Common/album-slide';
import CustomButton from 'app/components/Common/button';
import SongSlide from 'app/components/Common/song-slide';
import { playSong } from 'app/helpers/player';
import { Album } from 'app/models/Album';
import { Song } from 'app/models/Song';
import PlayIcon from 'assets/images/play-no-circle.svg';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './style.scss';

interface RouteParams {
    id: string,
    name: string,
}

const SingerDetail: React.FC = () => {
    const params = useParams<RouteParams>();
    let { id, name } = params;
    const [singerImage, setSingerImage] = useState<string>();
    const [songList, setSongList] = useState<Array<Song>>([]);
    const [albumList, setAlbumList] = useState<Array<Album>>([]);

    useEffect(() => {
        fetchArtistDetail(parseInt(id))
            .then((data) => {
                setSingerImage(data.singer.image);
                setSongList(data.artistSongs);
                setAlbumList(data.artistAlbums);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    return (
        <>
            <div className="singer-detail-container">
                <div className="singer-info">
                    <div className="custom-container h-100">
                        <img src={singerImage} className="singer-avatar" alt='singer portrait'/>

                        <div className="d-flex align-items-end singer-control justify-content-between h-100">
                            <div className="singer-name">
                                {name}
                            </div>

                            <div>
                                <CustomButton
                                    onClick={() => playSong(songList)}
                                    size='large'
                                    color='black'
                                    shape='circle'
                                >
                                    <img src={PlayIcon} className='mr-12' alt='play button'/>
                                    <span>Play All Song</span>
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>

                {songList.length ? (
                    <div className='singer-detail-section slide-container'>
                        <SongSlide
                            title='Tracks' 
                            songList={songList}
                        />
                    </div>
                ) : null}
                

                {albumList.length ? (
                    <div className='slide-container'>
                        <AlbumSlide 
                            title='Albums'
                            albumList={albumList}
                        />
                    </div>
                ) : null}
                
            </div>
        </>
    )
}

export default SingerDetail;
