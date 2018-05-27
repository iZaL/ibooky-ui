/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS, ACTIONS as ORDER_ACTIONS,} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/common/selectors';
import {ScrollView} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import PropTypes from 'prop-types';
import OrderTotal from 'customer/orders/components/OrderTotal';

class OrderDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  componentDidMount() {
    if (this.props.navigation.state && this.props.navigation.state.params) {
      let {orderID} = this.props.navigation.state.params;
      this.props.dispatch(ORDER_ACTIONS.fetchOrderDetails(orderID));
    }

    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  render() {
    let {order, drivers} = this.props;

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <OrderBasicInfo item={order} />
        <OrderItems order={order} />
        <OrderTotal total={order.total} />
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
