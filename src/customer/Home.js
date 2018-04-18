import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import HomeMenu from 'customer/components/HomeMenu';
import {CategoriesPropType} from 'customer/common/proptypes';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import ProductList from "customer/components/ProductList";

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

  render() {
    let {categories,products} = this.props;
    return (
      <View>

        <HomeMenu
          items={categories}
          onItemPress={this.onHomeMenuItemPress}
          activeID={this.state.activeMenuItemID}
        />

        <ProductList
          items={products}
          onItemPress={this.onHomeMenuItemPress}
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
      {id: 1, name: 'Offer 1', 'image': 'http://ibooky.test/uploads/dental-clinic1.jpg'},
      {id: 2, name: 'Offer 2', 'image': 'http://ibooky.test/uploads/dental-clinic2.jpg'},
      {id: 3, name: 'Offer 3', 'image': 'http://ibooky.test/uploads/dental-clinic3.jpg'},
      {id: 4, name: 'Offer 4', 'image': 'http://ibooky.test/uploads/dental-clinic4.jpg'},
    ]
  };
}

export default connect(mapStateToProps)(Home);
