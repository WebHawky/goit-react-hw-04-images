import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.scss';

export default function ImageGalleryItem({ cardImage }) {
  return (
    <img
      className={s.ImageGalleryItem_image}
      src={cardImage}
      alt={cardImage}
      loading="lazy"
    />
  );
}

ImageGalleryItem.propTypes = {
  modalImage: PropTypes.string,
  cardImage: PropTypes.string,
};
