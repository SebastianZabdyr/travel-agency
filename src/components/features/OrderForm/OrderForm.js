import React from 'react';
import PropTypes from 'prop-types';

import OrderSummary from '../OrderSummary/OrderSummary.js';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption.js';

import {Col} from 'react-flexbox-grid';

class OrderForm extends React.Component {

  static propTypes = {
    options: PropTypes.object,
    tripCost: PropTypes.string,
    setOrderOption: PropTypes.func,
  }

  render(){
    const {tripCost, options, setOrderOption} = this.props;
    return (
      <div>
        {pricing.map(option => (
          <Col md={4} key={option.id}>
            <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
          </Col>
        ))}

        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options} />
        </Col>
      </div>
    );
  }
}


export default OrderForm;
