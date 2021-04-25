import IconButton from 'app/components/Common/icon-button';
import { RoutePaths } from 'app/constants';
import { addNewSong, playSong } from 'app/helpers/player';
import { Song } from 'app/models/Song';
import { RootState } from 'app/redux';
import AddNowPlaying from 'assets/images/add-now-playing.svg';
import { Badge, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './style.scss';

interface Props {
    title?: string,
    songList: Array<Song>,
    isChart?: boolean,
    isViewAll?: boolean,
    theme?: 'light',
    handlePlay?: (index: number) => void,
}

const SongList: React.FC<Props> = (props: Props) => {
    const { title, songList, isChart, theme, handlePlay } = props
    const { songs, isPlaying, songIndex } = useSelector((state: RootState) => state.player);

    const togglePlayPause = (song: Song, index: number) => {
        if (handlePlay) {
            handlePlay(index);
        } else {
            playSong([song]);
        }
    }

    const renderSongItem = () => {
        const renderSingers = (singers: string) => {
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
        
        return songList.map((song, index) => {
            let isAddPlaying = songs.findIndex((oldSong: Song) => oldSong.track_id === song.track_id) !== -1;
            let isPlay = isPlaying && songs[songIndex].track_id === song.track_id;

            return (
                <ListGroup.Item 
                    as="li" key={index} 
                    className={`d-flex justify-content-between align-items-center pointer ${theme}`}
                    onClick={() => togglePlayPause(song, index)}
                >
                    <div className="d-flex align-items-center flex-1 mr-12">
                        <div className={`song-image ${isChart && 'song-chart-image'}`}>
                            <img 
                                className={`${isPlay && 'playing'}`}
                                src={song.image} 
                                alt='song'
                            />
                            {isChart ? (
                                <Badge 
                                    as='div'
                                    className='d-flex justify-content-center align-items-center'
                                    style={{backgroundColor: song.color}}>
                                    {index + 1}
                                </Badge>
                            ) : null}
                        </div>

                        <div>
                            <h3 className={`song-name one-line ${theme}`}>
                                {song.title}
                            </h3>

                            <div className='song-artist one-line'>
                                {renderSingers(song.singers)}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        {isAddPlaying ? null : (
                            <IconButton onClick={() => addNewSong([song])}>
                                <img src={AddNowPlaying} alt='add to playlist'/>
                            </IconButton>
                        )}
                    </div>
                </ListGroup.Item>
            )
        })
    };

    return (
        <div className="song-block">
            {title ? <div className='song-list-title'>{title}</div> : null}

            <ListGroup as="ul" className='song-list'>
                {renderSongItem()}
            </ListGroup>
            
        </div>
    )
}

export default SongList;
