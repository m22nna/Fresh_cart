import React from 'react';
import PropTypes from 'prop-types';
import styles from './box.module.css';

const box = () => (
  <div className={styles.box}>
    box Component
  </div>
);

box.propTypes = {};

box.defaultProps = {};

export default box;
