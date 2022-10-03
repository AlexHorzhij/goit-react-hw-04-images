import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector("#modal-root");

export function Modal({ img, modalClose }) {

    useEffect(() => {
        document.addEventListener('keydown', modalClose);
        return () => {
            document.removeEventListener('keydown', modalClose);
        }
    }, [modalClose]);

    // useEffect(() => {
    // // const handleKeyDown = e => console.log("keydown event: ", e);
    // document.addEventListener("keydown", modalClose);
    // return () => {
    //   document.removeEventListener("keydown", modalClose);
    // };
//   }, []);

    return createPortal(<Overlay onClick={modalClose}>
        <ModalWindow >
            <img src={img.largeImageURL} alt={img.tags} />
        </ModalWindow>
    </Overlay>, modalRoot);
};

Modal.propTypes = {
    modalClose: PropTypes.func.isRequired,
    img: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    })
};