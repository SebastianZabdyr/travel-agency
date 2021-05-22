import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import '../../../styles/react-datepicker-cssmodules.css';

const OrderOptionDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)} />
  );
};

export default OrderOptionDate;
