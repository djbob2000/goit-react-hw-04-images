import React from 'react';
import PropTypes from 'prop-types';
import css from './Notify.module.css';

const Notify = ({ message }) => {
  return <p className={css.Notify}>{message}</p>;
};

Notify.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notify;
