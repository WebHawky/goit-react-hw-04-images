import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.scss';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { selectedPhotoUrl } = this.props;

    return (
      <div className={s.Overlay} onClick={this.onClick}>
        <div className={s.Modal}>
          <img src={selectedPhotoUrl} alt={selectedPhotoUrl} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  selectedPhotoUrl: PropTypes.string,
};
