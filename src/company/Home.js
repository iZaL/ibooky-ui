import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {RefreshControl, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/common/selectors';
import I18n from 'utils/locale';
import SectionHeading from 'components/SectionHeading';
import OrdersList from 'company/orders/components/OrdersList';

class Home extends PureComponent {

  static propTypes = {
    drivers: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
    orders: [],
  };

  state = {
    refreshing: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.dispatch(
      ORDER_ACTIONS.fetchOrders({
        force: true,
      }),
    );
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData();
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 1000);
  };

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  loadOrders = () => {
    this.props.navigation.navigate('Orders');
  };

  render() {
    const {orders} = this.props;

    return (
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <SectionHeading
          title={I18n.t('orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadOrders}
        />

        <OrdersList
          items={orders}
          onItemPress={this.onOrdersListItemPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getOrders(state),
  };
}

export default connect(mapStateToProps)(Home);
