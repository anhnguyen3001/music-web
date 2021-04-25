import { RoutePaths } from 'app/constants';
import { Singer } from 'app/models/Singer';
import React from 'react';
import { useHistory } from 'react-router';
import './style.scss';

interface Props extends Singer {
    size: 'small' | 'medium',
}

const CardSinger: React.FC<Props> = (props: Props) => {
    const {
        image,
        singer_id,
        name,
        size,
        totalAlbum,
        totalSong
    } = props;

    const history = useHistory();

    const handleNavigate = () => {
        history.push(`${RoutePaths.Singer.Index}/${singer_id}/${name}`);
    }

    return (
        <>
            <div className="singer-card pointer" onClick={handleNavigate}>
                <div className='singer-card__cover' data-size={size}>
                    <img
                        className='singer-img'
                        src={image}
                        alt=''
                    />
                </div>

                <div className='singer-card__meta' data-size={size}>
                    <div
                        className='singer-name pointer'
                        data-size={size}>
                        {name}
                    </div>

                    {totalSong !== undefined ? (
                        <div className='singer-info'>
                            {totalSong} songs
                        </div>
                    ) : null}

                    {totalAlbum !== undefined ? (
                        <div className='singer-info'>
                            {totalAlbum} albums
                        </div>
                    ) : null}
                    
                </div>
            </div>
        </>
    )
}

export default CardSinger;
