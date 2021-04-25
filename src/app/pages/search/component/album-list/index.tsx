import { fetchSongsByAlbumId } from 'app/api/explore';
import Card2 from 'app/components/Common/card2';
import { RoutePaths } from 'app/constants';
import { playSong } from 'app/helpers/player';
import { Album } from 'app/models/Album';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

interface Props {
    albumList: Array<Album>,
}

const AlbumList: React.FC<Props> = (props: Props) => {
    const { albumList } = props;

    const history = useHistory();
     
    const handlePlayAlbum = (album_id: number) => {
        fetchSongsByAlbumId(album_id)
            .then((data) => {
                console.log(data);
                playSong(data.songs);
            })
    }

    const handleNavigate = (album_id: number) => {
        history.push(`${RoutePaths.Album.Index}/${album_id}`);
    }

    const renderAlbumList = () => {
        return albumList.map((album: Album, index: number) => {
            return (
                <Col md={3} sm={4} xs={6} key={album.album_id}>
                    <Card2 
                        {...album}
                        size='medium'
                        handlePlay={() => handlePlayAlbum(album.album_id)}
                        handleNavigate={() => handleNavigate(album.album_id)}
                    />
                </Col>
            )
        })
    }

    return (
        <Row>
            {renderAlbumList()}
        </Row>
    )
}

export default AlbumList;
