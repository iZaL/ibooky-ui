import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/common/selectors';
import OrdersList from 'company/orders/components/OrdersList';

class UpcomingOrdersScene extends PureComponent {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchOrders());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onFetchMore = () => {
    this.props.dispatch(ORDER_ACTIONS.fetchOrders());
  };

  onPullToRefresh = () => {
    this.props.dispatch(ORDER_ACTIONS.fetchOrdersRefresh());
    this.props.dispatch(ORDER_ACTIONS.fetchOrders());
  };

  render() {
    const {orders, isFetching} = this.props;

    return (
      <OrdersList
        items={orders}
        onItemPress={this.onOrdersListItemPress}
        activeItemID={0}
        isFetching={isFetching}
        onFetchMore={this.onFetchMore}
        onPullToRefresh={this.onPullToRefresh}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getOrders(state),
    isFetching: state.company.orders.isFetching,
  };
}

export default connect(mapStateToProps)(UpcomingOrdersScene);
