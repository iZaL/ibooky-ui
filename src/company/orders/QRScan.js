/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS,} from 'company/common/actions';
import {ScrollView, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {RNCamera} from 'react-native-camera';
import Button from "components/Button";
import I18n from 'utils/locale';

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
    showLoading: false,
    showError:false,
    successResultVisible:false,
    scannedOrder:{},
    code:null
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

  onBarCodeRead = payload => {
    const code = payload.data;

    this.setState({
      showLoading:true,
    });
    // fetch appropriate order
    // show order
    new Promise((resolve, reject) => {
      this.props.dispatch(
        ORDER_ACTIONS.scanCode({code:code , resolve, reject}),
      );
    })
      .then(res => {
        this.setState({
          scannedOrder:res,
          code:code
        },()=>{
          this.showScanResult();
          this.setState({
            showLoading:false
          });
        });
      })
      .catch(e => {
        this.setState({
          showLoading:false,
          showError:true,
          code:null
        });
      });
  };

  redeemCode = () => {
    const code = this.state.code;

    this.setState({
      showLoading:true
    });
    // fetch appropriate order
    // show order
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
          showLoading:false,
          showError:true
        });
      });
  };

  showScanResult = () => {
    this.setState({
      scanResultVisible: true,
    });
  };

  showSuccessResult = () => {
    this.setState({
      successResultVisible: true,
    });
  };

  render() {
    let {scanResultVisible,showLoading,showError,successResultVisible} = this.state;

    if(showLoading) {
      return null;
    }

    if(showError) {
      return (
        <ScrollView style={{paddingTop:100}}>
          <Button raised primary onPress={()=>this.showScanResult()}  title='Re Scan there is an error'/>
        </ScrollView>
      );
    }

    if(scanResultVisible) {
      return (
        <ScrollView style={{paddingTop:100}}>
          <Button raised primary onPress={()=>this.redeemCode()}  title='Redeem'/>
          <Button raised primary onPress={()=>this.showScanResult()}  title='Re Scan'/>
        </ScrollView>
      );
    }

    if(successResultVisible) {
      return (
        <ScrollView style={{paddingTop:100}}>
          <Title>{I18n.t('success')}</Title>
          <Button raised primary onPress={()=>this.showScanResult()}  title='Re Scan'/>
        </ScrollView>
      );
    }


    return (
      <View style={{flex: 1}} keyboardShouldPersistTap="always">
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
