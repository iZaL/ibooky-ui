/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CartEmpty from 'customer/cart/components/CartEmpty';
import CartItem from "./components/CartItem";
import colors from "assets/theme/colors";

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

  render() {
    let {
      products,
      cartTotal,
    } = this.props;

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

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
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
    }]
  };
}

export default connect(mapStateToProps)(Cart);
