import PropTypes from 'prop-types';

import { ImageGalleryList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images, openModal, }) {
    return <ImageGalleryList >
        {images.map((item, index) => <ImageGalleryItem key={item.id} index={index} alt={item.tags} url={item.webformatURL
} openModal={openModal} >
        </ImageGalleryItem>)}
    </ImageGalleryList>
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    openModal: PropTypes.func.isRequired,
};

