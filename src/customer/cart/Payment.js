/**
 * @flow
 */
import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS} from 'customer/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import PropTypes from 'prop-types';
import {PAYMENT_ENDPOINT} from 'utils/env';
import Dialog from 'components/Dialog';
import I18n from 'utils/locale';

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

  state = {
    scene: 'payment',
  };

  componentDidMount() {
    this.props.dispatch(
      ACTIONS.fetchOrderDetails({
        // order_id: 10,
        order_id: this.props.navigation.getParam('orderID'),
      }),
    );

    let navUrl =
      'http://ibooky.test/payment/s?ref=205152018014300730&result=SUCCESS&payid=216304&crdtype=KNET&trackid=5afab8b356fa1&amt=24&crd=&hash=34ce6a9a71410d0f18ce59605425d459086608b07fd9bbab4330037c4231862a';

    if (navUrl.includes('result=SUCCESS')) {
      console.log('result=SUCCESS');
    }
  }

  onNavigationStateChange = navState => {
    const successUrl = `${PAYMENT_ENDPOINT}/success`;
    const failureUrl = `${PAYMENT_ENDPOINT}/failure`;

    console.log('navState', navState);

    if (navState.url.includes('result=SUCCESS')) {
      this.setState({
        scene: 'success',
      });
    } else if (navState.url === failureUrl) {
      this.setState({
        scene: 'failed',
      });
    } else {
      // console.log('wa');
    }
  };

  paymentSuccessDialogPress = () => {
    this.props.navigation.replace('OrderDetail', {
      orderID: this.props.order.id,
    });
  };

  paymentFailedDialogPress = () => {};

  render() {
    let {order} = this.props;
    let {scene} = this.state;

    if (order && order.id) {
      let url = `${PAYMENT_ENDPOINT}/page/?payment_token=${
        order.payment_token
      }`;

      switch (scene) {
        case 'payment':
          return (
            <WebView
              source={{uri: url}}
              scalesPageToFit={false}
              onNavigationStateChange={this.onNavigationStateChange}
            />
          );
        case 'success':
          return (
            <Dialog
              title={I18n.t('payment_success')}
              description={I18n.t('order_success')}
              rightPress={this.paymentSuccessDialogPress}
              visible={true}
            />
          );
        case 'failed':
          return (
            <Dialog
              title={I18n.t('payment_failed')}
              description={I18n.t('order_failed')}
              rightPress={this.paymentFailedDialogPress}
              visible={true}
            />
          );
        default:
          return null;
      }
    }

    return null;
  }
}

function mapStateToProps(state, props) {
  const orderID = props.navigation.getParam('orderID');
  // const orderID = 10;
  const getOrderByID = CUSTOMER_SELECTORS.getOrderByID();
  return {
    user: USER_SELECTORS.getAuthUser(state),
    order: getOrderByID(state, orderID),
  };
}

export default connect(mapStateToProps)(Payment);
