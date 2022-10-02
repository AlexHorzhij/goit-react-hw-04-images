import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, openModal, }) {
    useEffect(()=>{
 window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",        
    })},[images]
)
    return <ImageGalleryList >
        {images.map((item, index) => <ImageGalleryItem key={item.id} index={index} alt={item.tags} url={item.webformatURL
} openModal={openModal} >
        </ImageGalleryItem>)}
    </ImageGalleryList>
};



ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id:PropTypes.number.isRequired
    })).isRequired,
    openModal: PropTypes.func.isRequired,
};

