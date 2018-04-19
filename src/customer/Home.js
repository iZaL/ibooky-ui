import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import HomeMenu from 'customer/components/HomeMenu';
import {CategoriesPropType} from 'customer/common/proptypes';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import ProductList from 'customer/products/components/ProductList';

class Home extends Component {
  state = {
    activeMenuItemID: 1,
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchCategories());
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

  render() {
    let {categories, products} = this.props;
    return (
      <View>
        <HomeMenu
          items={categories}
          onItemPress={this.onHomeMenuItemPress}
          activeID={this.state.activeMenuItemID}
        />

        <ProductList
          items={products}
          onItemPress={this.onProductListItemPress}
        />
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
    products: [
      {
        id: 1,
        title: 'Offer 1',
        offerPercentage: '50%',
        oldPrice: '50KD',
        price: '30KD',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
      },
      {
        id: 2,
        title: 'Offer 2',
        offerPercentage: '50%',
        oldPrice: '50KD',
        price: '30KD',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
      },
      {
        id: 3,
        title: 'Offer 3',
        offerPercentage: '50%',
        oldPrice: '50KD',
        price: '30KD',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
      },
      {
        id: 4,
        title: 'Offer 4',
        offerPercentage: '50%',
        oldPrice: '50KD',
        price: '30KD',
        images: [
          'http://ibooky.test/uploads/dental-clinic1.jpg',
          'http://ibooky.test/uploads/dental-clinic2.jpg',
          'http://ibooky.test/uploads/dental-clinic3.jpg',
          'http://ibooky.test/uploads/dental-clinic4.jpg',
        ],
      },
    ],
  };
}

export default connect(mapStateToProps)(Home);
