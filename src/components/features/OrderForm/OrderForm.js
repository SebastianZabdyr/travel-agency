import React from 'react';
import PropTypes from 'prop-types';

import OrderSummary from '../OrderSummary/OrderSummary.js';

import {Col} from 'react-flexbox-grid';

const OrderForm = ({options, tripCost}) => (
  <Col xs={12}>
    <OrderSummary tripCost={tripCost} options={options} />
  </Col>
);

OrderForm.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
};

export default OrderForm;
