/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ACTIONS as DRIVER_ACTIONS,
  ACTIONS as ORDER_ACTIONS,
} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/common/selectors';
import {ScrollView, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import PropTypes from 'prop-types';
import OrderTotal from 'customer/orders/components/OrderTotal';
import {RNCamera} from 'react-native-camera';
class QRScan extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  state = {
    scanResultVisible: false,
  };

  componentDidMount() {
    if (this.props.navigation.state && this.props.navigation.state.params) {
      let {orderID} = this.props.navigation.state.params;
      this.props.dispatch(ORDER_ACTIONS.fetchOrderDetails(orderID));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  onBarCodeRead = code => {
    const orderID = code.data;
    this.props.navigation.navigate('OrderDetail', {
      orderID: orderID,
    });
  };

  showScanResult = () => {
    this.setState({
      scanResultVisible: true,
    });
  };

  hideScanResult = () => {
    this.setState({
      scanResultVisible: false,
    });
  };

  render() {
    let {scanResultVisible} = this.state;

    return (
      <View style={{flex: 1}} keyboardShouldPersistTap="always">
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            // justifyContent: 'flex-end',
            // alignItems: 'center'
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera to scan QR Code'
          }
          onBarCodeRead={this.onBarCodeRead}
        />
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {};
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(QRScan);
