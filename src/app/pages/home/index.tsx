import { fetchExplore } from 'app/api/explore';
import AlbumSlide from 'app/components/Common/album-slide';
import FacebookButton from 'app/components/Common/facebook-button';
import SongSlide from 'app/components/Common/song-slide';
import { Album } from 'app/models/Album';
import { Genre } from 'app/models/Genre';
import { Song } from 'app/models/Song';
import { RootState } from 'app/redux';
import { fetchUser } from 'app/redux/modules/auth';
import { disableLoading, enableLoading } from 'app/redux/modules/loading';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './banner';
import Chart from './chart';
import GenreList from './genre';
import './style.scss';

const randomNumber = (max: number) => {
	return Math.floor(Math.random() * max);
}

const backgoundColors = [
    '#DC3A61',
    '#FFB800',
    '#638DFC',
    '#000'
]

const getRandomBadgeBackground = () => {
    return backgoundColors[Math.floor(Math.random() * backgoundColors.length)]
}

const Home: React.FC = () => {
	const dispatch = useDispatch();
    const { isLoading } = useSelector((state: RootState) => state.loading);
    const { access_token, name, image } = useSelector((state: RootState) => state.auth);
	const [latestSongs, setLatestSongs] = useState<Array<Song>>([]);
	const [latestAlbums, setLatestAlbums] = useState<Array<Album>>([]);
	const [genres, setGenres] = useState<Array<Genre>>([]);
	const [charts, setCharts] = useState<Array<{
		area: string,
		title: string,
		songs: Array<Song>
	}>>([]);

	useEffect(() => {
		dispatch(enableLoading());
		let token = localStorage.getItem('access_token');
		
		if (token) {
			dispatch(fetchUser(token));
		}

		fetchExplore()
		  .then((data) => {
			setLatestSongs(data.latestSongs);
			setLatestAlbums(data.latestAlbums);
			setGenres(data.genres);

			let chart: Array<{
				area: string,
				title: string,
				songs: Array<Song>
			}> = [];

			let vpop = data.vpop.map((song: Song) => ({
				...song,
				color: getRandomBadgeBackground(),

			}));

			let kpop = data.kpop.map((song: Song) => ({
				...song,
				color: getRandomBadgeBackground(),

			}));

			let usuk = data.usuk.map((song: Song) => ({
				...song,
				color: getRandomBadgeBackground(),

			}));

			chart.push({
				area: 'VPOP',
				title: 'V-POP',
				songs: vpop,
			});

			chart.push({
				area: 'USUK',
				title: 'US-UK',
				songs: usuk,
			});

			chart.push({
				area: 'KPOP',
				title: 'K-POP',
				songs: kpop,
			});

			setCharts(chart);
			dispatch(disableLoading());
		})
		.catch((err) => {
			console.log(err);
			dispatch(disableLoading());
		});
	  }, []);

	return (
		<>
			<div className="homepage-container h-100">
				{!isLoading ? (
					<>
						<Banner />
						<div className=' latest-song slide-container bg-slide'>
							<SongSlide 
								title='Latest Song 🔥'
								songList={latestSongs}
								isPlayAll
							/>
						</div>
						
						<div className='slide-container bg-slide'>
							<AlbumSlide 
								title='Latest Album ⚡'
								albumList={latestAlbums}
								colorBg
							/>
						</div>

						<div className='slide-container bg-slide'>
							<GenreList genreList={genres}/>
						</div>
						
						<Chart charts={charts}/>
					</>
				) : null}
			</div>
		</>
	)
}

export default Home;
