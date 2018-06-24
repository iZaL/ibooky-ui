import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'customer/common/selectors';
import OrdersList from 'customer/orders/components/OrdersList';
import {SELECTORS as USER_SELECTORS} from "guest/common/selectors";

class PastOrdersScene extends PureComponent {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchPastOrders());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onFetchMore = () => {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchPastOrders());
  };

  onPullToRefresh = () => {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchPastOrdersRefresh());
    this.props.dispatch(CUSTOMER_ACTIONS.fetchPastOrders());
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
    orders: ORDER_SELECTORS.getPastOrders(state),
    isFetching: state.customer.past_orders.isFetching,
    isAuthenticated:USER_SELECTORS.isAuthenticated(state)
  };
}

export default connect(mapStateToProps)(PastOrdersScene);
