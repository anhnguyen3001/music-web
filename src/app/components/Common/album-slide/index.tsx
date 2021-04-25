import './style.scss';
import PlaylistCard from 'app/components/Common/card2';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import PreviousButton from 'assets/images/arrow-left.svg';
import NextButton from 'assets/images/arrow-right.svg';
import { Album } from 'app/models/Album';
import { fetchSongsByAlbumId } from 'app/api/explore';
import { playSong } from 'app/helpers/player';
import { useHistory } from 'react-router';
import { RoutePaths } from 'app/constants';

SwiperCore.use([Navigation]);

interface Props {
    albumList: Array<Album>,
    title: string,
    colorBg?: boolean,
}

const AlbumSlide: React.FC<Props> = (props: Props) => {
    const { title, albumList, colorBg } = props;
    const history = useHistory();
     
    const handlePlay = (album_id: number) => {
        fetchSongsByAlbumId(album_id)
            .then((data) => {
                console.log(data);
                playSong(data.songs);
            })
    }

    const handleNavigate = (album: Album) => {
        history.push(`${RoutePaths.Album.Index}/${album.album_id}/${album.title}`);
    }

    const albumSlide = albumList.map((album) => {
        return (
            <SwiperSlide key={album.album_id} className="album-slide__playlist">
                <PlaylistCard 
                    {...album}
                    handlePlay={() => handlePlay(album.album_id)}
                    handleNavigate={() => handleNavigate(album)} 
                />
            </SwiperSlide>
        );
    });

    return (
        <section className='album-slide slide'>
            <div className="slide-header">
                <div className="d-flex align-items-end">
                    <h3 className='section-title'>
                        {title}
                    </h3>
                </div>

                <div>
                    <img
                        className="album-slide__swiper-prev"
                        src={PreviousButton}
                        alt="Previous slide"
                    />
                    <img className="album-slide__swiper-next" src={NextButton} alt="Next slide" />
                </div>
            </div>

            <div className="album-slide__content">
                {albumList.length ? (
                    <Swiper
                        slidesPerView="auto"
                        navigation={{
                            nextEl: ".album-slide__swiper-next",
                            prevEl: ".album-slide__swiper-prev",
                            disabledClass: "album-slide__swiper-button--disabled",
                        }}
                    >
                        {albumSlide}
                    </Swiper>
                ) : null}
            </div>
        </section>
    );
};

export default AlbumSlide;
