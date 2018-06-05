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
import CartTotal from 'customer/cart/components/CartTotal';

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
    this.createOrder();
  };

  onGuestCheckoutPress = () => {
    this.hideLoginDialog();
    this.createOrder();
  };

  createOrder = () => {
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
      .then(order => {
        if (!this.props.user.id) {
          return this.props.navigation.navigate('Checkout', {
            orderID: order.id,
          });
        } else {
          this.checkout(order);
        }
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

  checkout = (order) => {
    new Promise((resolve, reject) => {
      this.props.dispatch(ACTIONS.checkout({order_id:order.id,attributes:{}, resolve, reject}));
    })
      .then(res => {
        console.log('res',res);
        return this.props.navigation.navigate('Payment', {
          orderID: res.id,
        });
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  hideLoginDialog = () => {
    this.setState({
      loginDialogVisible: false,
    });
  };

  onShoppingContinuePress = () => {
    this.props.navigation.navigate('Home');
  };

  setQuantity = (product: object, quantity: number) => {
    this.props.dispatch(
      ACTIONS.setCartItem({
        product_id: product.id,
        quantity: quantity,
        total: product.price,
      }),
    );
  };

  onLoginPress = () => {
    this.props.navigation.navigate('Login', {
      redirectRoute: 'Cart',
    });
  };


  onDeleteCartItem = (item) => {
    this.props.dispatch(
      ACTIONS.removeCartItem({
        product_id: item.id,
      }),
    );
  };

  render() {
    let {products, cart} = this.props;

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
              onDelete={this.onDeleteCartItem}
            />
          );
        })}

        <CartTotal
          total={cart.total}
          style={{backgroundColor: 'white', padding: 10}}
        />

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
