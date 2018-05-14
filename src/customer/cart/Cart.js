/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CartEmpty from 'customer/cart/components/CartEmpty';
import CartItem from 'customer/cart/components/CartItem';
import colors from 'assets/theme/colors';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS} from 'customer/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import Dialog from 'components/Dialog';

type State = {
  loginDialogVisible: boolean,
};

class Cart extends PureComponent {
  state: State = {
    loginDialogVisible: false,
  };

  static defaultProps = {
    products: [],
  };

  onCheckoutPress = () => {
    if (!this.props.user.id) {
      return this.showLoginDialog();
    }
    this.checkout();
  };

  onGuestCheckoutPress = () => {
    this.hideLoginDialog();
    this.checkout();
  };

  checkout = () => {
    const {user, cart} = this.props;
    const {products, total} = cart;

    const item = {
      user_id: user.id,
      products: products,
      total: total,
    };

    new Promise((resolve, reject) => {
      this.props.dispatch(ACTIONS.createOrder({item, resolve, reject}));
    })
      .then(res => {
        console.log('res', res);
        this.props.navigation.navigate('Checkout', {
          orderID: res.id,
        });
      })
      .catch(e => {
        console.log('e', e);
      });
  };

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

  render() {
    let {products} = this.props;

    if (!products.length) {
      return <CartEmpty />;
    }

    return (
      <ScrollView
        style={{padding: 10, backgroundColor: colors.lightGrey}}
        contentInset={{bottom: 50}}>
        {products.map((product, index) => {
          return (
            <CartItem
              key={index}
              item={product}
              setQuantity={this.setQuantity}
            />
          );
        })}

        <Button
          primary
          raised
          dark
          title={I18n.t('checkout_proceed').toUpperCase()}
          onPress={this.onCheckoutPress}
          style={{marginTop: 20}}
        />
        <Button
          raised
          title={I18n.t('shopping_continue').toUpperCase()}
          onPress={this.onShoppingContinuePress}
          style={{marginTop: 20}}
        />

        <Dialog
          leftPress={this.onGuestCheckoutPress}
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

function mapStateToProps(state) {
  return {
    products: CUSTOMER_SELECTORS.getCartProducts(state),
    cart: state.customer.cart,
    user: USER_SELECTORS.getAuthUser(state),
  };
}

export default connect(mapStateToProps)(Cart);
