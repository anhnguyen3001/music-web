import './style.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import CustomButton from 'app/components/Common/button';
import 'swiper/components/pagination/pagination.scss';
import { Col, Container, Row } from 'react-bootstrap';
import ArrowRight from 'assets/images/arrow-right-icon.svg';
import $ from 'jquery';
import { bannerImage } from '../../../data/banner-image';

SwiperCore.use([Pagination, Autoplay]);

const Banner: React.FC = () => {
	const imagesSlide = bannerImage.map((image, index) => (
		<SwiperSlide 
			key={ index } 
			className="banner-slide" 
			tag="li">
			<div className="img-slide">
				<img src={image} alt='top song, album'></img>
			</div>
		</SwiperSlide>
	));

	const handleScroll = () => {
		$('.latest-song')[0].scrollIntoView({behavior: 'smooth'});
	}

	return (
		<section className='banner'>
			<Row className='justify-content-between align-items-center'>
				<Col lg={6}>
					<div className='banner-left'>
						<div className="txt-banner">
							Let&nbsp;
							<span className="txt-special">Music Flow In Your Heart</span> And&nbsp;
							<span className="txt-special">Enrich Your Soul</span>&nbsp;✌️
						</div>
						
						<div className='discover-btn'>
							<CustomButton
								size='large'
								color='black'
								shape='round'
								onClick={handleScroll}
							>
								<span className='mr-12'>Discovery</span>
								<img src={ArrowRight} alt='arrow right' />
							</CustomButton>
						</div>
					</div>
				</Col>
				
				<Col lg={6}>
					<div className="slide-block">
						<Swiper
							slidesPerView="auto"
							spaceBetween={5}
							pagination={{
								el: ".swiper-pagination", // little dots under the slides for navigation
								clickable: true
							}}
							autoplay
						>
							{imagesSlide}
						</Swiper>

						<div className="swiper-pagination" />
					</div>
				</Col>
			</Row>
		</section>
	);
};

export default Banner;
