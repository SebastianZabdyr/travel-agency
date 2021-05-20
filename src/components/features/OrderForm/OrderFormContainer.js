import {connect} from 'react-redux';
import OrderForm from './OrderForm.js';
import {getOrderOptions} from '../../../redux/orderRedux.js';

const mapStateToProps = state => ({
  options: getOrderOptions(state),
});

const mapDispatchToProps = dispatch => ({
  getOrderOptions: state => dispatch(getOrderOptions(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
