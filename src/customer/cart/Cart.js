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
import {SELECTORS as CART_SELECTORS} from "customer/selectors/cart";
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

  componentDidMount() {

    let products = [
      {
        id: 1,
        category: {
          id: 1,
          name: 'samsung',
        },
        title: 'Offer 1',
        description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
        offer_percentage: 50,
        offer_percentage_formatted: '50%',
        price_old: 60,
        price_old_formatted: '60 KD',
        price: 30,
        price_formatted: '30 KD',
        show_attributes: true,
        time_remaining_formatted: '10:00:00 hrs',
        featured_image:'http://ibooky.test/uploads/dental-clinic1.jpg',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
        attributes: [
          {
            id: 1, name: 'Color', price: 13, required: false,
            children: [
              {id: 2, name: 'Gold', price: 15, parent_id: 1},
              {id: 3, name: 'Black', price: 12, parent_id: 1},
              {id: 4, name: 'Silver', price: 12, parent_id: 1},
              {id: 5, name: 'Red', price: 10, parent_id: 1},
            ]
          },
          {
            id: 6, name: 'Type', required: true,
            children: [
              {id: 7, name: '1050 mAh', parent_id: 6},
              {id: 8, name: '2680 mAh', parent_id: 6},
            ],
          }
        ],
      },
      {
        id: 2,
        category: {
          id: 1,
          name: 'iphone',
        },
        title: 'Offer 1',
        description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
        offer_percentage: 50,
        offer_percentage_formatted: '50%',
        price_old: 60,
        price_old_formatted: '60 KD',
        price: 30,
        price_formatted: '30 KD',
        show_attributes: true,
        time_remaining_formatted: '10:00:00 hrs',
        featured_image:'http://ibooky.test/uploads/dental-clinic1.jpg',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
        attributes: [
          {
            id: 1, name: 'Color', price: 13, required: false,
            children: [
              {id: 2, name: 'Gold', price: 15, parent_id: 1},
              {id: 3, name: 'Black', price: 12, parent_id: 1},
              {id: 4, name: 'Silver', price: 12, parent_id: 1},
              {id: 5, name: 'Red', price: 10, parent_id: 1},
            ]
          },
          {
            id: 6, name: 'Type', required: true,
            children: [
              {id: 7, name: '1050 mAh', parent_id: 6},
              {id: 8, name: '2680 mAh', parent_id: 6},
            ],
          }
        ],
      }
    ];

    const normalized = normalize(products,[Schema.products]);
    this.props.dispatch({
      type:ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
      entities:normalized.entities
    });

  }

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

    console.log('products',products);

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
    products:CART_SELECTORS.getCartProducts(state),
    cartTotal:100,
  };
}

export default connect(mapStateToProps)(Cart);
