/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CartEmpty from 'customer/cart/components/CartEmpty';
import CartItem from "./components/CartItem";
import colors from "assets/theme/colors";
import Button from "components/Button";
import I18n from 'utils/locale';
import {SELECTORS as CART_SELECTORS} from "customer/selectors/cart";

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

  render() {
    let {
      products,
      cartProducts,
    } = this.props;

    console.log('cartProducts',cartProducts);

    let {} = this.state;

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
    cartProducts:CART_SELECTORS.getCartProducts(state),
    cartTotal:100,
    products: [{
      id: 1,
      title: 'Offer 1',
      description: 'Offer Description',
      offerPercentage: '50%',
      oldPrice: '50KD',
      price: '30KD',
      images: [
        'http://ibooky.test/uploads/dental-clinic1.jpg',
        'http://ibooky.test/uploads/dental-clinic2.jpg',
        'http://ibooky.test/uploads/dental-clinic3.jpg',
        'http://ibooky.test/uploads/dental-clinic4.jpg',
      ],
      cart: {
        quantity: 1,
        total:1000
      }
    },
      {
        id: 2,
        title: 'Offer 2',
        description: 'Offer Description',
        offerPercentage: '50%',
        oldPrice: '50KD',
        price: '30KD',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
        cart: {
          quantity: 2,
          total:2000
        }
      }
    ],
  };
}

export default connect(mapStateToProps)(Cart);
