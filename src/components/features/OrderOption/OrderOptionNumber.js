import React from 'react';
import PropTypes from 'prop-types';

import {formatPrice} from '../../../utils/formatPrice.js';

import styles from './OrderOption.scss';

const OrderOptionNumber = ({price, limits, currentValue, setOptionValue}) => (
  <div
    className={styles.number}
  >
    <input
      type='number'
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
    {formatPrice(price)}
  </div>
);

OrderOptionNumber.propTypes ={
  currentValue: PropTypes.node,
  limits: PropTypes.object,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
};

export default OrderOptionNumber;
