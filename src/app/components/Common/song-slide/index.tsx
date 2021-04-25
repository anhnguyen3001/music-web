import React from 'react';
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import PreviousButton from 'assets/images/arrow-left.svg';
import NextButton from 'assets/images/arrow-right.svg';
import { Song } from 'app/models/Song';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux';
import Card1 from '../card1';
import { playSong } from 'app/helpers/player';

SwiperCore.use([Navigation]);

interface Props {
    songList: Array<Song>,
    title: string,
    colorBg?: boolean,
    isPlayAll?: boolean,
}

const SongSlide: React.FC<Props> = (props: Props) => {
    const { isPlaying, songs, songIndex } = useSelector((state: RootState) => state.player);
    const { title, songList, isPlayAll } = props;

    const songSlide = songList.map((song: Song) => {
        let isPlay = isPlaying && (songs[songIndex].track_id === song.track_id);

        return (
            <SwiperSlide key={song.track_id} className="song-slide__post" >
                <Card1 
                    {...song}
                    isPlaying={isPlay} 
                    onClick={() => playSong([song])}
                />
            </SwiperSlide>
        );
    });
    
    return (
        <section className='song-slide slide'>
            <div className="slide-header">
                <div className="d-flex align-items-end">
                    <h3 className='section-title'>
                        {title}
                    </h3>
                    {isPlayAll ? (
                        <span className='txt-link' onClick={() => playSong(songList)}>
                            Play all
                        </span>
                    ) : null}
                    
                </div>

                <div>
                    <img
                        className="song-slide__swiper-prev"
                        src={PreviousButton}
                        alt="Previous slide"
                    />

                    <img className="song-slide__swiper-next" src={NextButton} alt="Next slide" />
                </div>
            </div>
            <div>
                {songList.length ? (
                    <Swiper
                        slidesPerView="auto"
                        navigation={{
                            nextEl: ".song-slide__swiper-next",
                            prevEl: ".song-slide__swiper-prev",
                            disabledClass: "song-slide__swiper-button--disabled",
                        }}
                    >
                        {songSlide}
                    </Swiper>
                ) : null}
                
            </div>
        </section>
    );
};

export default SongSlide;
