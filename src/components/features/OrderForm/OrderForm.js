import React from 'react';
import PropTypes from 'prop-types';

import OrderSummary from '../OrderSummary/OrderSummary.js';
import OrderOption from '../OrderOption/OrderOption.js';
import Button from '../../common/Button/Button';
import pricing from '../../../data/pricing.json';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

import {Col} from 'react-flexbox-grid';


const sendOrder = (options, tripCost, tripName, tripId, tripCountry) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripName,
    tripId,
    tripCountry,
  };

  if(options.name === '' || options.contact === ''){
    alert('Wrong name/contact');
  }

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

class OrderForm extends React.Component {

  static propTypes = {
    options: PropTypes.object,
    tripCost: PropTypes.string,
    setOrderOption: PropTypes.func,
    tripName: PropTypes.string,
    tripId: PropTypes.string,
    tripCountry: PropTypes.string,
  }

  render(){
    const {options, tripCost, setOrderOption, tripName, tripId, tripCountry} = this.props;
    return (
      <div>
        {pricing.map(option => (
          <Col md={4} key={option.id}>
            <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
          </Col>
        ))}

        <Col xs={12}>
          <OrderSummary tripCost={tripCost} options={options} />
          <Button onClick={() => sendOrder(options, tripCost, tripName, tripId, tripCountry)}>Order now!</Button>
        </Col>
      </div>
    );
  }
}


export default OrderForm;
