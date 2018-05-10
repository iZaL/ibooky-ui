/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CartEmpty from 'customer/cart/components/CartEmpty';
import CartItem from "customer/cart/components/CartItem";
import colors from "assets/theme/colors";
import Button from "components/Button";
import I18n from 'utils/locale';
import {SELECTORS as CUSTOMER_SELECTORS} from "customer/common/selectors";
import {ACTIONS} from "customer/common/actions";
import {ACTION_TYPES} from "customer/common/actions";
import {Schema} from "../../utils/schema";
import {normalize} from 'normalizr';

type State = {
  dates: Array,
  paymentMode: 'knet' | 'cash',
  showPaymentModal: boolean,
  showOrderSuccessModal: boolean,
  timePickerModalVisible: boolean,
};

class Cart extends PureComponent {

  state: State = {};

  static defaultProps = {
    products: []
  };

  onCheckoutPress = () => {
  };

  onShoppingContinuePress = () => {
  };

  setQuantity = (product:object,quantity:number) => {
    this.props.dispatch(ACTIONS.setCartItem({
      product_id:product.id,
      quantity:quantity
    }))
  };

  render() {
    let {
      products,
    } = this.props;

    if (!products.length) {
      return <CartEmpty/>;
    }

    return (
      <ScrollView
        style={{padding:10,backgroundColor:colors.lightGrey}}
        contentInset={{bottom: 50}}
      >
        {
          products.map((product, index) => {
            return (
              <CartItem
                key={index}
                item={product}
                setQuantity={this.setQuantity}
              />
            )
          })
        }

        <Button primary raised dark title={I18n.t('checkout_proceed').toUpperCase()} onPress={this.onCheckoutPress} style={{marginTop:20}}/>
        <Button raised title={I18n.t('shopping_continue').toUpperCase()} onPress={this.onShoppingContinuePress} style={{marginTop:20}}/>

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    products:CUSTOMER_SELECTORS.getCartProducts(state),
    cartTotal:100,
  };
}

export default connect(mapStateToProps)(Cart);
