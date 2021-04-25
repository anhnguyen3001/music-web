import PlayIcon from 'assets/images/play-icon.svg';
import React from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import { RoutePaths } from 'app/constants';

interface Props {
    name?: string,
    title?: string,
    image: string,
    singers?: string,
    size?: string,
    handlePlay?: () => void,
    handleNavigate: () => void,
    isGenre?: boolean,
}

const Card2: React.FC<Props> = (props: Props) => {
    const {
        name,
        title,
        image,
        singers,
        size = 'small',
        handlePlay,
        handleNavigate,
        isGenre,
    } = props;

    const renderSingers = () => {
        let singerArr = singers?.split(', ');
        let total = singerArr ? singerArr.length - 1 : 0;

        return singerArr && singerArr.map((singer, index) => {
            let subArr = singer.split('  ');
            let text = `${subArr[1]}${index !== total ? ', ' : ''}`;
            return (
                <NavLink 
                    key={subArr[0]}
                    className='artist-name'
                    to={`${RoutePaths.Singer.Index}/${subArr[0]}/${subArr[1]}`}
                >
                    {text}
                </NavLink>
            )
        })
    }

    return (
        <div className='card'>
            <div 
                className={`${isGenre ? 'card__cover--genre' : 'card__cover pointer'}`} 
                data-size={size}
                onClick={() => {if (handlePlay) handlePlay()}}>
                <div className="img-container">
                    <img
                        src={image}
                        alt=''
                    />
                </div>
                

                {!isGenre && (
                    <div className='card__layer'>
                        <div className='button-container d-flex justify-content-center align-items-center'>
                            <img className='control-btn' src={PlayIcon}/>
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
                )}
            </div>

            <div className='card__meta pointer' data-size={size}>
                <div
                    className='name'
                    data-size={size}
                    onClick={handleNavigate}>
                    {title || name}
                </div>

                {!isGenre && (
                    <div
                        className='artist'
                        data-size={size}>
                        {renderSingers()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card2;
