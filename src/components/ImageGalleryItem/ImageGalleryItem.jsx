import React from 'react';
import PropTypes from 'prop-types';
import { Item } from './ImageGalleryItem.styled';
import { Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  openModal,
}) => (
    <Item id={id} onClick={() => openModal(largeImageURL, tags)}>
      <Image src={webformatURL} alt={tags} />
    </Item>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
