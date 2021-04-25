import { RoutePaths } from 'app/constants';
import { Song } from 'app/models/Song';
import PauseIcon from 'assets/images/pause-icon.svg';
import PlayIcon from 'assets/images/play-icon.svg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

interface Props extends Song {
    isPlaying?: boolean,
    size?: string,
    onClick: () => void,
    theme?: 'dark',
}

const Card1: React.FC<Props> = (props: Props) => {
    const {
        image,
        title,
        singers,
        isPlaying,
        size = 'small',
        onClick,
        theme,
    } = props;

    const renderSingers = () => {
        let singerArr = singers.split(', ');
        let total = singerArr.length;

        return singerArr.map((singer, index) => {
            let subArr = singer.split('  ');
            
            return (
                <NavLink 
                    key={subArr[0]}
                    className='artist-name'
                    to={`${RoutePaths.Singer.Index}/${subArr[0]}/${subArr[1]}`}
                >
                    {`${subArr[1]}${index !== total - 1 ? ', ' : ''}`}
                </NavLink>
            )
        })
    }

    return (
        <div className='song-card'>
            <div className='song-card-top pointer' onClick={onClick}>
                <div className="song-img-container">
                    <img src={image} alt="" />
                </div>
                
                <div className='layer'>
                    <div className='button-container d-flex justify-content-center align-items-center'>
                        <img className='control-btn' src={isPlaying ? PauseIcon : PlayIcon} />
                        {/* <Row className='justify-content-center align-items-center' noGutters={true}>
                            <Col xs='auto'>
                                <img className='react' src={isLove ? HeartActive : HeartDefault} />
                            </Col>

                            <Col xs='auto'>
                                
                            </Col>

                            <Col xs='auto'>
                                <img className='more-btn' src={MoreIcon} />
                            </Col>
                        </Row> */}
                    </div>
                </div>
            </div>

            <div className='song-info' data-size={size}>
                <div
                    className={`song-name ${theme && 'txt-white'}`}
                    data-size={size}>
                    {title}
                </div>

                <div
                    className='artist'
                    data-size={size}>
                    {renderSingers()}
                </div>
                {/* <Row className='align-items-center'>
                    <Col>
                        

                        
                    </Col>

                    <Col className='song-react' data-size={size}>
                        <img 
                            src={isLove ? HeartActive : HeartDefault} 
                        />
                    </Col>
                </Row> */}
            </div>
        </div>
    )
};

export default Card1;
