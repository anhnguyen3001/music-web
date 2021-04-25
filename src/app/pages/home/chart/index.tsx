import CustomButton from 'app/components/Common/button';
import SongList from 'app/components/Common/song-list';
import { Song } from 'app/models/Song';
import ArrowDown from 'assets/images/arrow-down-white.svg';
import ArrowUp from 'assets/images/arrow-up.svg';
import { useEffect, useState } from 'react';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './style.scss';
import $ from 'jquery';

SwiperCore.use([Pagination]);

interface Props {
    charts: Array<{
		area: string,
		title: string,
		songs: Array<Song>,
	}>
}

const Chart: React.FC<Props> = (props: Props) => {
    const { charts } = props;
    const [fullChart, setFullChart] = useState<boolean>(false);
    const [chart, setChart] = useState<Array<{
		area: string,
		title: string,
		songs: Array<Song>,
    }>>([]);

    useEffect(() => {
        if (fullChart) {
            setChart(charts);
        } else {
            let shortCharts = charts.map((chart) => {
                return {
                    ...chart,
                    songs: chart.songs.slice(0, 5),
                }
            })
            setChart(shortCharts);
        }
    }, [charts, fullChart]);

    const renderChartSlides = () => {
        return chart.map(({area, title, songs}) => {
            return (
                <SwiperSlide key={area} className='chart-slide'>
                    <div className='chart-block'>
                        <h2 className='chart-title mb-20'>
                            {title}
                        </h2>

                        <SongList
                            songList={songs}
                            isChart
                            theme='light'
                        />
                    </div>
                </SwiperSlide>
            )
        })
    };

    const handleViewChart = () => {
        if (fullChart) {
            $('.chart-container')[0].scrollIntoView({behavior: 'smooth'});
            setTimeout(() => {
                setFullChart(!fullChart);
            }, 400)
        } else setFullChart(!fullChart);

        
    }

    return (
        <div className="chart-container">
            <h4 className="brand">Ranking</h4>
            <h3 className="title">Watch the music chart</h3>

            {chart.length ? (
                <>
                    <Swiper
                        className='mb-20 chart-swiper'
                        breakpoints={{
                            // when window width is >= 640px
                            375: {
                                slidesPerView: 1,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                            // when window width is >= 768px
                            992: {
                                slidesPerView: 3,
                            },
                        }}
                        slideActiveClass='chart-slide--active'
                        pagination={{
                            el: ".chart-swiper-pagination", // little dots under the slides for navigation
                            clickable: true
                        }}
                    >   
                        {renderChartSlides()}
                    </Swiper>
                </>
            ) : null}
            
            <div className='chart-swiper-pagination' />

            <div className='chart-button-container mbc-60px'>
                <CustomButton
                    size='large'
                    color='red'
                    shape='round'
                    onClick={handleViewChart}
                >
                    <span className='mr-1'>
                        {fullChart ? 'See Less' : 'See All'}
                    </span>
                    <img src={fullChart ? ArrowUp : ArrowDown} alt='arrow down'/>
                </CustomButton>
            </div>
        </div>
    )
}

export default Chart;
