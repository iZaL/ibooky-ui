/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS,} from 'company/common/actions';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {RNCamera} from 'react-native-camera';
import Button from "components/Button";
import I18n from 'utils/locale';
import ScanButtons from "./components/ScanButtons";
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import OrderTotal from 'customer/orders/components/OrderTotal';
import {Title} from "react-native-paper";
import colors from "../../assets/theme/colors";

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
    successResultVisible:false,
    loading: false,
    order:{},
    code:null,
  };

  componentDidMount() {
    if (this.props.navigation.state && this.props.navigation.state.params) {
      let {orderID} = this.props.navigation.state.params;
      this.props.dispatch(ORDER_ACTIONS.fetchOrderDetails(orderID));
    }
  }

  onBarCodeRead = payload => {
    const code = payload.data;

    this.setState({
      loading:true,
    });

    new Promise((resolve, reject) => {
      this.props.dispatch(
        ORDER_ACTIONS.scanCode({code:code , resolve, reject}),
      );
    })
      .then(res => {
        this.setState({
          order:res,
          code:code
        },() => {
          this.showScanResult();
        });
      })
      .catch(e => {
        this.setState({
          loading:false,
          code:null
        });
      });
  };

  redeemCode = () => {
    const code = this.state.code;

    this.setState({
      loading:true
    });

    new Promise((resolve, reject) => {
      this.props.dispatch(
        ORDER_ACTIONS.redeemCode({code:code , resolve, reject}),
      );
    })
      .then(res => {
        this.showSuccessResult();
      })
      .catch(e => {
        this.setState({
          loading:false,
          code:null
        });
      });
  };

  showScanResult = () => {
    this.setState({
      scanResultVisible: true,
      loading:false,
    });
  };

  showSuccessResult = () => {
    this.setState({
      scanResultVisible: false,
      loading:false,
      code:null
    });
  };

  showScanner = () => {
    this.setState({
      scanResultVisible: false,
      loading:false,
    });
  };

  render() {
    let {scanResultVisible,loading,order} = this.state;

    if(loading) {
      return (
        <View style={{flex:1,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator animating={true} color={colors.primary} />
        </View>
      )
    }

    return (
      <View style={{flex: 1,}} keyboardShouldPersistTap="always">
        {
          scanResultVisible ?
            <ScrollView contentInset={{bottom:50}}>
              <OrderBasicInfo item={order} />
              <OrderItems order={{
                ...order,
                products:order.products.filter(product => product.is_owner === true)
              }} />
              <OrderTotal total={order.total} />
            </ScrollView>
            :
            <View style={{flex:1,backgroundColor:'black',marginVertical:200,marginHorizontal:100}}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={{
                  flex: 1,
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
        }

        <ScanButtons
          redeem={this.redeemCode}
          rescan={this.showScanner}
          canRedeem={true}
          canRescan={true}
        />

      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = () => {
    return {};
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(QRScan);
