import Card1 from 'app/components/Common/card1';
import { calculateIndex, getPager, getTotalPage } from 'app/helpers/pagination';
import { playSong } from 'app/helpers/player';
import { Song } from 'app/models/Song';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CustomPagination from '../custom-pagination';
import './style.scss';
import $ from 'jquery';

interface Props {
    songList: Array<Song>,
}

const SongList: React.FC<Props> = (props: Props) => {
    const { songList } = props;
    // const [ totalPage, setTotalPage ] = useState<number>(0);
    // const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ songs, setSongs ] = useState<Array<Song>>([]);

    useEffect(() => {
        // const { startIndex, endIndex } = calculateIndex(1, songList.length);
        // setSongs(songList.slice(startIndex, endIndex));
        // let totalItems = songList.length;

        // setTotalPage(getTotalPage(totalItems));

        
    }, []);

    const [ totalPage, setTotalPage ] = useState<number>(0);
    const [ currentPage, setCurrentPage ] = useState<number>(0);
    const [ startPage, setStartPage ] = useState<number>(0);
    const [ endPage, setEndPage ] = useState<number>(0);
    let songListRef = useRef<HTMLDivElement>();

    useEffect(() => {
        let totalPage = getTotalPage(songList.length);
        setTotalPage(totalPage);
        let { startPage, endPage } = getPager(totalPage);
        setStartPage(startPage);
        setEndPage(endPage);
        setCurrentPage(1);
    }, [songList.length]);
    
    useEffect(() => {
        if (currentPage) {
            $('body').animate({ scrollTop: 0 }, 'slow');
            let { startPage, endPage } = getPager(totalPage, currentPage);
            setStartPage(startPage);
            setEndPage(endPage);
            let { startIndex, endIndex } = calculateIndex(currentPage, songList.length);
            setSongs(songList.slice(startIndex, endIndex + 1));
            
            // 
        }
    }, [currentPage]);

    const handleChoosePage = (page: number) => {
        setCurrentPage(page);
    }

    const renderSongList = () => {
        return songs.map((song: Song, index: number) => {
            return (
                <Col md={3} sm={4} xs={6} key={song.track_id}>
                    <Card1 
                        {...song}
                        size='medium'
                        onClick={() => playSong([song])} 
                    />
                </Col>
            )
        })
    }

    return (
        <>
            <Row ref={(ref: any) => songListRef.current = ref} className='search-list'>
                {renderSongList()}
            </Row>

            {currentPage > 0 ? (
                <CustomPagination
                    handleChoosePage={handleChoosePage}
                    startPage={startPage}
                    endPage={endPage}
                    currentPage={currentPage}
                    totalPage={totalPage}
                />
            ) : null}
            
        </>
    )
}

export default SongList;
