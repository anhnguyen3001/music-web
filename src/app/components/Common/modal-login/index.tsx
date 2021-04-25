import React from 'react';
import { Modal } from 'react-bootstrap';
import FacebookButton from '../facebook-button';

interface Props {
    show: boolean,
    handleClose: () => void
}

const ModalLogin: React.FC<Props> = (props: Props) => {
    const { show, handleClose } = props;

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mt-3 mb-3 text-center'>
                    <FacebookButton callbacks={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalLogin;
