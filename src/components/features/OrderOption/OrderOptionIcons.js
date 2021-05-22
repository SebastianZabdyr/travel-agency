import React from 'react';
import PropTypes from 'prop-types';

import {formatPrice} from '../../../utils/formatPrice.js';
import Icon from '../../common/Icon/Icon.js';

import styles from './OrderOption.scss';

const OrderOptionIcons =({values, required, currentValue, setOptionValue}) => (
  <div
    className={styles.icon}
  >
    {required ? '' : (
      <div
        key='null'
        onClick={() => setOptionValue('')}
      >
        <Icon
          className={styles.icon}
          name={'times-circle'}
        />
      none
      </div>
    )}
    {values.map(value => (
      <div
        className={currentValue===value.id ? styles.iconActive : styles.icon}
        key={value.id}
        onClick={() => setOptionValue(value.id)}
      >
        <Icon name={value.icon} />
        {value.name}
        ({formatPrice(value.price)})
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes ={
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
};

export default OrderOptionIcons;
