import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';

export default function Modal({ onClose, selectedPhotoUrl }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={onClick}>
      <div className={s.Modal}>
        <img src={selectedPhotoUrl} alt={selectedPhotoUrl} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  selectedPhotoUrl: PropTypes.string,
};
