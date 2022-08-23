import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import s from './ImageGallery.module.scss';

export default function ImageGallery({ collections, onClick }) {
  if (collections === null || collections.length === 0) {
    return null;
  } else {
    return (
      <>
        <ul className={s.ImageGallery}>
          {collections.map(({ webformatURL, id, largeImageURL }) => {
            return (
              <li key={id} onClick={() => onClick(largeImageURL)}>
                <ImageGalleryItem cardImage={webformatURL} />
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

ImageGallery.propTypes = {
  collections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
};
