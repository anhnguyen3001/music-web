import CardSinger from 'app/components/Common/card-singer';
import { Singer } from 'app/models/Singer';
import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface Props {
    singerList: Array<Singer>
}

const SingerList: React.FC<Props> = (props: Props) => {
    const { singerList } = props;

    const renderSingerList = () => {
        return singerList.map((singer: Singer) => {
            return (
                <Col md={3} sm={4} xs={6} key={singer.singer_id}>
                    <CardSinger 
                        {...singer}
                        size='medium'
                    />
                </Col>
            )
        })
    }

    return (
        <Row className='search-list'>
            {renderSingerList()}
        </Row>
    )
}

export default SingerList;
