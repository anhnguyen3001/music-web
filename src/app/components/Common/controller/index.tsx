import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Slider from 'react-input-slider';
import ModeButton from '../mode-button';
import './style.scss';
import PrevIcon from 'assets/images/prev-icon.svg';
import PlayIcon from 'assets/images/play-icon.svg';
import PauseIcon from 'assets/images/pause-icon.svg';
import NextIcon from 'assets/images/next-icon.svg';
import PlaylistIcon from 'assets/images/playlist.svg';
import IconButton from '../icon-button';
import NowPlaying from '../nowplaying';
import { RootState } from 'app/redux';
import { useDispatch, useSelector } from 'react-redux';
import { counter, restart, shuffle, skipMusic, togglePlayMusic } from 'app/redux/modules/player';
import { NavLink } from 'react-router-dom';
import { RoutePaths } from 'app/constants';

const convertTime = (time: number) => {
    let minute = Math.floor(time/60);
    let second = Math.floor(time%60);
    let fullSecond = '0'.repeat(2 - second.toString().split('').length) + second.toString();
    return `${minute}:${fullSecond}`;
}

const Controller: React.FC = () => {
    const { songs, isPlaying, songIndex } = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();
    // Time for slider
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    // Play mode
    const [isShuffle, setShuffle] = useState<boolean>(false);
    const [isRepeat, setIsRepeat] = useState<boolean>(false);  
    // Show playing list
    const [showPlayingList, setShowPlayingList] = useState<boolean>(false);
    
    const audioRef = useRef(new Audio(songIndex !== -1 ? songs[songIndex].url : ''));

    useEffect(() => {
        audioRef.current.src = songs[songIndex].url;
    }, [songs, songIndex]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlayingList = () => {
        setShowPlayingList(!showPlayingList);
    }

    const handlePlayPause = () => {
        dispatch(togglePlayMusic());
    }

    const handleSkip = (pos: number) => {
        dispatch(skipMusic(pos));
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
        if (!isPlaying) {
            dispatch(restart());

            if (songs.length === 1) {
                audioRef.current.src = songs[songIndex].url;
            }
        }
    }

    const handleShuffle = () => {
        if (isShuffle) {
            dispatch(shuffle(false));
        } else {
            dispatch(shuffle(true));
        }

        setShuffle(!isShuffle);
    }

    const handleSliderChange = ({x}: {x: number}) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);
    }

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);

        if (isPlaying) {
            audioRef.current.play();
        }
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    const handleEnd = () => {
        dispatch(counter(songs[songIndex].track_id));
        if (songs.length === 1 && isRepeat) {
            audioRef.current.src = songs[songIndex].url;
            return;
        }

        if (isRepeat || songIndex < songs.length - 1) {
            dispatch(skipMusic(1));
        } else dispatch(togglePlayMusic());
    }

    const renderSingers = () => {
        let singerArr = songs[songIndex].singers.split(', ');
        let total = singerArr.length;

        return singerArr.map((singer: string, index: number) => {
            let subArr = singer.split('  ');
            return (
                <NavLink 
                    key={subArr[0]}
                    className='artist-name'
                    to={`${RoutePaths}/${subArr[0]}/${subArr[1]}`}
                >
                    {`${subArr[1]}${index !== total - 1 ? ', ' : ''}`}
                </NavLink>
            )
        })
    }

    return (
        <>
            <NowPlaying 
                songs={songs} 
                songIndex={songIndex} 
                isPlaying={isPlaying}
                showPlayingList={showPlayingList}
            />
            <div className='controller'>
                <Row className='d-flex align-items-center justify-content-between h-100'>
                    <Col lg={3} md={4} xs={5} className='d-flex align-items-center controller__info'>
                        <img
                            className={`controller__info-img ${isPlaying && 'playing'}`}
                            src={songs[songIndex].image}
                            alt='song cover'
                        />

                        <div className='ml-3'>
                            <h3 className='controller__info-title one-line'>
                                {songs[songIndex].title}
                            </h3>
                            <p className='controller__info-artist one-line'>
                                {renderSingers()}
                            </p>
                        </div>
                    </Col>

                    <Col lg={2} md={3} xs={7}>
                        <ul className='d-flex align-items-center justify-content-end p-0 mb-0'>
                            <li 
                                className='m-12 pointer'
                                onClick={() => handleSkip(-1)}>
                                <img
                                    className='w-20 h-20'
                                    src={PrevIcon}
                                    alt='previous button'
                                />
                            </li>

                            <li 
                                className='m-12 pointer'
                                onClick={handlePlayPause}>
                                <img
                                    className='h-45 w-45'
                                    src={isPlaying ? PauseIcon : PlayIcon}
                                    alt={isPlaying ? 'play button' : 'pause button'} 
                                />
                            </li>

                            <li 
                                className='m-12 pointer'
                                onClick={() => handleSkip(1)}>
                                <img
                                    className='w-20 h-20'
                                    src={NextIcon}
                                    alt='next button' 
                                />
                            </li>

                            <li>
                                <ModeButton 
                                    mode='repeat'
                                    isActive={isRepeat}
                                    onClick={handleRepeat}
                                />
                            </li>

                            <li>
                                <ModeButton 
                                    mode='shuffle'
                                    isActive={isShuffle}
                                    onClick={handleShuffle}
                                />
                            </li>

                            <li>
                                <IconButton onClick={togglePlayingList}>
                                    <img className='w-20 h-20' src={PlaylistIcon} alt='view playing list'/>
                                </IconButton>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={5} md={5} className='controller__slider d-flex align-items-center'>
                        <span className='controller__timer controller__timer-left'>
                            {convertTime(currentTime)}
                        </span>

                        <Slider 
                            axis='x'
                            xmax={duration}
                            x={currentTime}
                            onChange={handleSliderChange}
                            styles={{
                                track: {
                                    backgroundColor: '#fff',
                                    height: 5,
                                    flex: 1,
                                },
                                active: {
                                    backgroundColor: '#DC3A61'
                                },
                                thumb: {
                                    width: 10,
                                    height: 10,
                                    backgroundColor: '#DC3A61'
                                },
                                disabled: {
                                    opacity: 0.5
                                }
                            }}
                        />

                        <span className='controller__timer controller__timer-right'>
                            {convertTime(duration)}
                        </span>

                        <audio 
                            ref={audioRef}
                            src={songs[songIndex].url}
                            onLoadedData={handleLoadedData}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleEnd}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Controller;
