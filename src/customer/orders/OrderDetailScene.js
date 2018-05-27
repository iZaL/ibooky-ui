/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/common/selectors';
import {ScrollView, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import OrderTotal from 'customer/orders/components/OrderTotal';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'customer/common/actions';
import SectionHeading from 'components/SectionHeading';
import I18n from 'utils/locale';
import QRCode from 'react-native-qrcode-svg';

class OrderDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  componentDidMount() {
    this.props.actions.fetchOrderDetails({
      // order_id: 10,
      order_id: this.props.navigation.getParam('orderID'),
    });
  }

  trackOrder = () => {
    this.props.navigation.navigate('TrackOrder', {
      orderID: this.props.order.id,
    });
  };

  render() {
    let {order} = this.props;
    console.log('orderID', this.props.navigation.getParam('orderID'));
    return (
      <View style={{flex: 1}}>
        {order && (
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 30}}>
            <OrderBasicInfo item={order} />
            <OrderItems order={order} />
            <OrderTotal total={order.total} />

            <View>
              <SectionHeading title={I18n.t('qr_code')} />

              <View style={{alignItems: 'center', padding: 20}}>
                <QRCode value={`${this.props.order.id}`} />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...ACTIONS}, dispatch),
  };
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    // const orderID = 10;
    const orderID = props.navigation.state.params.orderID;
    return {
      order: getOrderByID(state, orderID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps, mapDispatchToProps)(
  OrderDetailScene,
);
