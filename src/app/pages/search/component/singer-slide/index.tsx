import React from 'react';
import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import PreviousButton from 'assets/images/arrow-left.svg';
import NextButton from 'assets/images/arrow-right.svg';
import { playSong } from 'app/helpers/player';
import { Singer } from 'app/models/Singer';
import CardSinger from 'app/components/Common/card-singer';

SwiperCore.use([Navigation]);

interface Props {
    singerList: Array<Singer>,
}

const SingerSlide: React.FC<Props> = (props: Props) => {
    const { singerList } = props;

    const singerSlide = singerList.map((singer: Singer) => {
        return (
            <SwiperSlide key={singer.singer_id} className="singer-slide__post" >
                <CardSinger
                    {...singer}
                    size='small'
                />
            </SwiperSlide>
        );
    });
    
    return (
        <section className='singer-slide slide'>
            <div className="slide-header">
                <h3 className='section-title'>
                    Singer
                </h3>

                <div>
                    <img
                        className="singer-slide__swiper-prev"
                        src={PreviousButton}
                        alt="Previous slide"
                    />

                    <img className="singer-slide__swiper-next" src={NextButton} alt="Next slide" />
                </div>
            </div>
            <div className="singer-slide__content">
                {singerList.length ? (
                    <Swiper
                        slidesPerView="auto"
                        navigation={{
                            nextEl: ".singer-slide__swiper-next",
                            prevEl: ".singer-slide__swiper-prev",
                            disabledClass: "singer-slide__swiper-button--disabled",
                        }}
                    >
                        {singerSlide}
                    </Swiper>
                ) : null}
                
            </div>
        </section>
    );
};

export default SingerSlide;
