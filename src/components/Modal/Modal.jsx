import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector("#modal-root");

export function Modal({img, modalClose}) {

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