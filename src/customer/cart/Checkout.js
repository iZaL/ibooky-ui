/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import colors from 'assets/theme/colors';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS} from 'customer/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import Dialog from 'components/Dialog';
import FormTextInput from 'components/FormTextInput';
import PropTypes from 'prop-types';

type State = {
  loginDialogVisible: boolean,
};

class Checkout extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state: State = {
    loginDialogVisible: false,
    name: null,
    email: null,
    mobile: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let {order} = nextProps;
    return {
      name: order.name,
      email: order.email,
      mobile: order.mobile,
    };
  }
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

  onCheckoutPress = () => {
    this.props.navigation.navigate('Payment', {
      orderID: this.props.order.id,
    });
  };

  checkout = () => {};

  showLoginDialog = () => {
    this.setState({
      loginDialogVisible: true,
    });
  };

  hideLoginDialog = () => {
    this.setState({
      loginDialogVisible: false,
    });
  };

  onShoppingContinuePress = () => {};

  setQuantity = (product: object, quantity: number) => {
    this.props.dispatch(
      ACTIONS.setCartItem({
        product_id: product.id,
        quantity: quantity,
      }),
    );
  };

  onLoginPress = () => {
    this.props.navigation.navigate('Login', {
      redirectRoute: 'Cart',
    });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    let {name, email, mobile} = this.state;

    return (
      <ScrollView
        style={{padding: 10, backgroundColor: colors.lightGrey}}
        contentInset={{bottom: 50}}>
        <FormTextInput
          onValueChange={this.onFieldChange}
          value={name}
          field="name"
          maxLength={40}
          label={I18n.t('name')}
        />

        <FormTextInput
          onValueChange={this.onFieldChange}
          value={email}
          field="email"
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormTextInput
          onValueChange={this.onFieldChange}
          value={mobile}
          field="mobile"
          maxLength={40}
          label={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <Button
          primary
          raised
          dark
          title={I18n.t('payment_proceed').toUpperCase()}
          onPress={this.onCheckoutPress}
          style={{marginTop: 20}}
        />

        <Dialog
          leftPress={this.checkout}
          rightPress={this.onLoginPress}
          leftText={I18n.t('checkout_as_guest')}
          rightText={I18n.t('login')}
          title={I18n.t('checkout')}
          visible={this.state.loginDialogVisible}
        />
      </ScrollView>
    );
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

export default connect(mapStateToProps)(Checkout);
