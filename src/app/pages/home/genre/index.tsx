import React from 'react';
import './style.scss';
import GenreCard from 'app/components/Common/card2';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import PreviousButton from 'assets/images/arrow-left.svg';
import NextButton from 'assets/images/arrow-right.svg';
import { Genre } from 'app/models/Genre';
import { useHistory } from 'react-router';
import { RoutePaths } from 'app/constants';

SwiperCore.use([Navigation]);

interface Props {
    genreList: Array<Genre>,
}

const GenreList: React.FC<Props> = (props: Props) => {
    const { genreList } = props;
    const history = useHistory();

    const handleNavigate = (genre: Genre) => {
        history.push(`${RoutePaths.Genre.Index}/${genre.genre_id}/${genre.name}`);
    }

    const handleGenres = () => {
        history.push(RoutePaths.Genre.Index);
    }

    const genreSlide = genreList.map((genre) => {
        return (
            <SwiperSlide key={genre.genre_id} className="genre__post" >
                <GenreCard
                    {...genre}
                    handleNavigate={() => handleNavigate(genre)}
                    isGenre={true}
                />
            </SwiperSlide>
        );
    });

    return (
        <section className="genre slide">
            <div className="slide-header">
                <div className="d-flex align-items-end">
                    <h3 className='section-title'>
                        Genre 🧐
                    </h3>
                    <span className='txt-link' onClick={handleGenres}>
                        View all
                    </span>
                </div>
                <div>
                    <img
                        className="genre__swiper-prev"
                        src={ PreviousButton }
                        alt="Previous slide"
                    />
                    <img className="genre__swiper-next" src={ NextButton } alt="Next slide" />
                </div>
            </div>
            
            <div className="genre__content">
                {genreList.length ? (
                    <Swiper
                        slidesPerView="auto"
                        wrapperTag="ul"
                        navigation={{
                            nextEl: ".genre__swiper-next",
                            prevEl: ".genre__swiper-prev",
                            disabledClass: "genre__swiper-button--disabled",
                        }}
                    >
                        { genreSlide }
                    </Swiper>
                ) : null}
            </div>
        </section>
    );
};

export default GenreList;
