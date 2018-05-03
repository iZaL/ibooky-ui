import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import HomeMenu from 'customer/components/HomeMenu';
import {CategoriesPropType} from 'customer/common/proptypes';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import ProductList from 'customer/products/components/ProductList';
import Spinner from "components/Spinner";
import {ACTION_TYPES} from "./common/actions";
import {Schema} from "../utils/schema";
import {normalize} from 'normalizr';
import {SELECTORS as CART_SELECTORS} from "./selectors/cart";

class Home extends Component {
  state = {
    activeMenuItemID: 1,
    loading: true
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchCategories());

    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000);

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
        featured_image: 'http://ibooky.test/uploads/dental-clinic1.jpg',
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
        featured_image: 'http://ibooky.test/uploads/dental-clinic1.jpg',
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

    const normalized = normalize(products, [Schema.products]);
    this.props.dispatch({
      type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
      entities: normalized.entities
    });

  }

  onHomeMenuItemPress = (item: object) => {
    this.setState({
      activeMenuItemID: item.id,
    });
  };

  onProductListItemPress = (item: object) => {
    this.props.navigation.navigate('ProductDetail', {
      productID: item.id,
    });
  };

  onAddToCartPress = (item: object) => {
    this.props.navigation.navigate('ProductDetail', {
      productID: item.id,
    });
  };

  render() {
    let {categories, products} = this.props;
    let {loading} = this.state;
    return (
      <View style={{flex: 1}}>

        {/*<View style={{*/}
        {/*justifyContent: 'center',*/}
        {/*alignItems: 'center',*/}
        {/*zIndex: 1000,*/}
        {/*position: 'absolute',*/}
        {/*top: 0,*/}
        {/*bottom: 0,*/}
        {/*left: 0,*/}
        {/*right: 0*/}
        {/*}}>*/}
        {/*<Spinner isVisible={loading} style={{color: '#FFFFFF50'}}/>*/}
        {/*</View>*/}

        <View>
          <HomeMenu
            items={categories}
            onItemPress={this.onHomeMenuItemPress}
            activeID={this.state.activeMenuItemID}
          />
        </View>
        <View style={[{flex: 1,}, loading && {opacity: .3}]}>
          <ProductList
            items={products}
            onItemPress={this.onProductListItemPress}
            onAddToCartPress={this.onAddToCartPress}
          />
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: [
      {id: 1, name: 'Coupons'},
      {id: 2, name: 'Samsung'},
      {id: 3, name: 'Sumo Houseware'},
      {id: 4, name: 'Tools'},
    ],
    products:CART_SELECTORS.getProducts(state),
  };
}

export default connect(mapStateToProps)(Home);
