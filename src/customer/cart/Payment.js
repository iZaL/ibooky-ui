/**
 * @flow
 */
import React, {Component} from 'react';
import {WebView} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS} from 'customer/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import PropTypes from 'prop-types';
import {PAYMENT_ENDPOINT} from 'utils/env';

class Payment extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    order: {},
  };

  componentDidMount() {
    this.props.dispatch(
      ACTIONS.fetchOrderDetails({
        order_id: this.props.navigation.getParam('orderID'),
      }),
    );
  }

  onNavigationStateChange = navState => {
    const {dispatch} = this.props;
    const successUrl = `${PAYMENT_ENDPOINT}/success`;
    const failureUrl = `${PAYMENT_ENDPOINT}/failure`;

    if (navState.url === successUrl) {
    } else if (navState.url === failureUrl) {
    }
  };

  render() {
    let {order} = this.props;
    if (order && order.id) {
      let url = `${PAYMENT_ENDPOINT}/page/?token=${order.payment_token}`;
      return (
        <WebView
          source={{uri: url}}
          scalesPageToFit={false}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      );
    }
    return null;
  }
}

function mapStateToProps(state, props) {
  const orderID = props.navigation.getParam('orderID');
  const getOrderByID = CUSTOMER_SELECTORS.getOrderByID();
  return {
    user: USER_SELECTORS.getAuthUser(state),
    order: getOrderByID(state, orderID),
  };
}

export default connect(mapStateToProps)(Payment);
