import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, toggleModal }) => {
  const checkEvent = evt => {
    if (evt.target !== evt.currentTarget) {
      toggleModal({
        status: true,
        src: evt.target.dataset.imageurl,
        alt: evt.target.alt,
      });
    }
  };
  return (
    <ul className={css.ImageGallery} onClick={checkEvent}>
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
