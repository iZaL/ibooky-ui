import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import CategoryList from 'customer/components/CategoryList';
import ProductList from 'customer/products/components/ProductList';
import NavButton from "components/NavButton";
import IconFactory from "components/IconFactory";
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from "customer/common/selectors";

class Home extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <NavButton
          icon={
            <IconFactory type="MaterialCommunityIcons" name="cart-outline" color="white" size={26}/>
          }
          onPress={() =>
            navigation.state.params &&
            navigation.state.params.handleRightButtonPress()
          }
        />
      ),
    };
  };

  componentDidMount() {
    const {categories} = this.props;
    this.props.dispatch(CUSTOMER_ACTIONS.fetchCategoriesWithProducts());

    setTimeout(() => {
      //@todo: setParams doesn't work outside of setTimeout
      this.props.navigation.setParams({
        handleRightButtonPress: this.loadCartScene,
      });
    }, 1000);

    if (categories.length) {
      if (!this.props.categoryReducer.activeCategoryID) {
        this.props.dispatch(CUSTOMER_ACTIONS.setCategoryItem('activeCategoryID', categories[0].id));
      }
    }

    // let products = [
    //   {
    //     id: 1,
    //     category: {
    //       id: 1,
    //       name: 'samsung',
    //     },
    //     title: 'Offer 1',
    //     description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
    //     offer_percentage: 50,
    //     offer_percentage_formatted: '50%',
    //     price_old: 60,
    //     price_old_formatted: '60 KD',
    //     price: 30,
    //     price_formatted: '30 KD',
    //     show_attributes: true,
    //     time_remaining_formatted: '10:00:00 hrs',
    //     featured_image: 'http://ibooky.test/uploads/dental-clinic1.jpg',
    //     images: [
    //       'http://ibooky.test/uploads/dental-clinic1.jpg',
    //       'http://ibooky.test/uploads/dental-clinic2.jpg',
    //       'http://ibooky.test/uploads/dental-clinic3.jpg',
    //       'http://ibooky.test/uploads/dental-clinic4.jpg',
    //     ],
    //     attributes: [
    //       {
    //         id: 1, name: 'Color', price: 13, required: false,
    //         children: [
    //           {id: 2, name: 'Gold', price: 15, parent_id: 1},
    //           {id: 3, name: 'Black', price: 12, parent_id: 1},
    //           {id: 4, name: 'Silver', price: 12, parent_id: 1},
    //           {id: 5, name: 'Red', price: 10, parent_id: 1},
    //         ]
    //       },
    //       {
    //         id: 6, name: 'Type', required: true,
    //         children: [
    //           {id: 7, name: '1050 mAh', parent_id: 6},
    //           {id: 8, name: '2680 mAh', parent_id: 6},
    //         ],
    //       }
    //     ],
    //   },
    //   {
    //     id: 2,
    //     category: {
    //       id: 1,
    //       name: 'iphone',
    //     },
    //     title: 'Offer 1',
    //     description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
    //     offer_percentage: 50,
    //     offer_percentage_formatted: '50%',
    //     price_old: 60,
    //     price_old_formatted: '60 KD',
    //     price: 30,
    //     price_formatted: '30 KD',
    //     show_attributes: true,
    //     time_remaining_formatted: '10:00:00 hrs',
    //     featured_image: 'http://ibooky.test/uploads/dental-clinic1.jpg',
    //     images: [
    //       'http://ibooky.test/uploads/dental-clinic1.jpg',
    //       'http://ibooky.test/uploads/dental-clinic2.jpg',
    //       'http://ibooky.test/uploads/dental-clinic3.jpg',
    //       'http://ibooky.test/uploads/dental-clinic4.jpg',
    //     ],
    //     attributes: [
    //       {
    //         id: 1, name: 'Color', price: 13, required: false,
    //         children: [
    //           {id: 2, name: 'Gold', price: 15, parent_id: 1},
    //           {id: 3, name: 'Black', price: 12, parent_id: 1},
    //           {id: 4, name: 'Silver', price: 12, parent_id: 1},
    //           {id: 5, name: 'Red', price: 10, parent_id: 1},
    //         ]
    //       },
    //       {
    //         id: 6, name: 'Type', required: true,
    //         children: [
    //           {id: 7, name: '1050 mAh', parent_id: 6},
    //           {id: 8, name: '2680 mAh', parent_id: 6},
    //         ],
    //       }
    //     ],
    //   }
    // ];

    // const normalized = normalize(products, [Schema.products]);
    // this.props.dispatch({
    //   type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
    //   entities: normalized.entities
    // });

  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  onCategoryListItemPress = (item: object) => {
    this.props.dispatch(CUSTOMER_ACTIONS.setCategoryItem('activeCategoryID', item.id));
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

  fetchMore = () => {
    let {activeCategoryID} = this.props.categoryReducer;

    this.props.dispatch(CUSTOMER_ACTIONS.fetchCategoriesWithProducts({
      category_id:activeCategoryID
    }));

  };

  render() {
    let {categories, categoryReducer} = this.props;
    let {activeCategoryID} = categoryReducer;

    let activeCategory = activeCategoryID
      ? categories.find(item => item.id === activeCategoryID)
      : categories.length
        ? categories[0]
        : {
          id: undefined,
          products: [],
        };

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
          <CategoryList
            items={categories}
            onItemPress={this.onCategoryListItemPress}
            activeID={activeCategoryID}
          />
        </View>

        {activeCategory && activeCategory.products &&
        activeCategory.products.length && (
          <View style={[{flex: 1}]}>
            <ProductList
              items={activeCategory.products}
              onItemPress={this.onProductListItemPress}
              onAddToCartPress={this.onAddToCartPress}
              onEndReached={this.fetchMore}
            />
          </View>
        )}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: CUSTOMER_SELECTORS.getCategories(state),
    categoryReducer: state.customer.categories,
  };
}

export default connect(mapStateToProps)(Home);
