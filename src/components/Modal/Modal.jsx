import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ toggleModal, src, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleToggleModalOnEsc);

    return () => {
      window.removeEventListener('keydown', handleToggleModalOnEsc);
    };
  });

  const handleToggleModalOnEsc = evt => {
    if (evt.key === 'Escape' || evt.target === evt.currentTarget) {
      toggleModal({ status: false });
    }
  };

  return (
    <div className={css.Overlay} onClick={handleToggleModalOnEsc}>
      <div className={css.Modal}>
        <img className={css.img} src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
