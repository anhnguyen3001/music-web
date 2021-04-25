import { Song } from 'app/models/Song';
import { playChosenSong, togglePlayMusic } from 'app/redux/modules/player';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import SongList from '../song-list';
import './styles.scss';
import LyricNotFound from 'assets/images/not-found-lyric.svg';
import NotFoundItem from '../not-found-item';

interface Props {
	songs: Array<Song>,
	songIndex: number,
	isPlaying: boolean,
	showPlayingList: boolean
}

const NowPlaying: React.FC<Props> = (props: Props) => {
	const { songs, songIndex, isPlaying, showPlayingList } = props;
	const dispatch = useDispatch();
	
	const renderLyric = () => {
		let { lyric } = songs[songIndex];
		
		if (lyric) {
			let lyricRows = lyric.split(/{"\\n"}/);
			
			return lyricRows.map((ele, index) => {
				return (
					<p className='lyric-row w-100 text-center' key={index}>
						{ele}
					</p>
				)
			})
		}
		
		return (
			<div className='lyric-not-found'>
				<img src={LyricNotFound} />
				<p className='lyric-not-found-txt'>
					This song doesn't have lyric
				</p>
			</div>
		)
	}

	const handlePlay = (index: number) => {
		if (isPlaying && index === songIndex) {
			dispatch(togglePlayMusic());
		} else {
			dispatch(playChosenSong(index));
		}
	}

	return (
		<>
			<div className={`now-playing ${showPlayingList && 'show'}`}>
				<div className='custom-container h-100'>
					<Row className='h-100'>
						<Col md={8} sm={6} className='lyric'>
							{renderLyric()}
						</Col>
						<Col md={4} sm={6}>
							<SongList songList={songs} handlePlay={handlePlay} theme='light'/>
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
};

export default NowPlaying;
