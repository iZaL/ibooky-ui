import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'customer/common/selectors';
import OrdersList from 'customer/orders/components/OrdersList';
import {SELECTORS as USER_SELECTORS} from "guest/common/selectors";

class OrdersScene extends PureComponent {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchOrders());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onFetchMore = () => {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchOrders());
  };

  onPullToRefresh = () => {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchOrdersRefresh());
    this.props.dispatch(CUSTOMER_ACTIONS.fetchOrders());
  };

  favoriteProduct = product => {
    if(!this.props.isAuthenticated) {
      return this.props.navigation.push('Login');
    } else {
      this.props.dispatch(
        CUSTOMER_ACTIONS.favoriteProduct({
          product_id: product.id,
        }),
      );
    }
  };

  render() {
    const {orders, isFetching} = this.props;

    return (
      <OrdersList
        items={orders}
        onItemPress={this.onOrdersListItemPress}
        isFetching={isFetching}
        onFetchMore={this.onFetchMore}
        onPullToRefresh={this.onPullToRefresh}
        favorite={this.favoriteProduct}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getOrders(state),
    isFetching: state.customer.orders.isFetching,
    isAuthenticated:USER_SELECTORS.isAuthenticated(state)
  };
}

export default connect(mapStateToProps)(OrdersScene);
