import {connect} from 'react-redux';
import OrderForm from './OrderForm.js';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux.js';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
  setOrderOption: setOrderOption(state),
});

const mapDispatchToProps = dispatch => ({
  getOrderOptions: state => dispatch(getOrderOptions(state)),
  setOrderOption: payload => dispatch(setOrderOption(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
