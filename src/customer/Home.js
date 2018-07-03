import React, {Component} from 'react';
import {Text, View, InteractionManager} from 'react-native';
import {connect} from 'react-redux';
import CategoryList from 'customer/components/CategoryList';
import ProductList from 'customer/products/components/ProductList';
import NavButton from 'components/NavButton';
import IconFactory from 'components/IconFactory';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import DrawerIcon from 'components/DrawerIcon';
import colors from 'assets/theme/colors';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import Spinner from '../components/Spinner';
import debounce from "lodash/debounce";

class Home extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Text style={{color: 'black'}}>iBooky</Text>,
      headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
      headerRight: (
        <NavButton
          icon={
            <IconFactory
              type="MaterialCommunityIcons"
              name="cart-outline"
              color={colors.primary}
              size={26}
            />
          }
          onPress={() =>
            navigation.state.params &&
            navigation.state.params.handleRightButtonPress()
          }
        />
      ),
    };
  };
  constructor() {
    super();
    this.fetchMore = debounce(this.fetchMore,3000);
  }

  componentDidMount() {
    new Promise((resolve, reject) => {
      this.props.dispatch(
        CUSTOMER_ACTIONS.fetchCategoriesWithProducts({resolve, reject}),
      );
    })
      .then(categories => {
        if (categories[0]) {
          this.props.dispatch(
            CUSTOMER_ACTIONS.fetchCategoryDetails({
              category_id: categories[0].id,
            }),
          );

          this.props.dispatch(
            CUSTOMER_ACTIONS.setCategoryItem(
              'activeCategoryID',
              categories[0].id,
            ),
          );
        }
      })
      .catch(e => {
        console.log('rekect', e);
      });

    setTimeout(() => {
      //@todo: setParams doesn't work outside of setTimeout
      InteractionManager.runAfterInteractions(() => {
        this.props.navigation.setParams({
          handleRightButtonPress: this.loadCartScene,
        });
      });
    }, 1000);
  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  onCategoryListItemPress = (item: object) => {
    this.props.dispatch(
      CUSTOMER_ACTIONS.setCategoryItem('activeCategoryID', item.id),
    );
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchCategoryDetails({
        category_id: item.id,
      }),
    );
  };

  onProductListItemPress = (item: object) => {
    this.props.navigation.navigate('ProductDetail', {
      productID: item.id,
      headerTitle: item.name,
    });
  };

  onAddToCartPress = (item: object) => {
    this.props.navigation.navigate('ProductDetail', {
      productID: item.id,
      headerTitle: item.name,
    });
  };

  fetchMore = () => {
    let {activeCategoryID} = this.props.categoryReducer;
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchCategoryDetails({
        category_id: activeCategoryID,
      }),
    );
  };

  favoriteProduct = product => {
    if (!this.props.isAuthenticated) {
      return this.props.navigation.push('Login');
    } else {
      this.props.dispatch(
        CUSTOMER_ACTIONS.favoriteProduct({
          product_id: product.id,
        }),
      );
    }
  };

  render() {
    let {categories, categoryReducer, products} = this.props;
    let {activeCategoryID, isFetching} = categoryReducer;

    return (
      <View style={{flex: 1}}>
        <Spinner isVisible={isFetching} />

        {activeCategoryID && (
          <View>
            <CategoryList
              items={categories}
              onItemPress={this.onCategoryListItemPress}
              activeID={activeCategoryID}
            />
            <ProductList
              items={products}
              onItemPress={this.onProductListItemPress}
              onAddToCartPress={this.onAddToCartPress}
              onEndReached={this.fetchMore}
              favorite={this.favoriteProduct}
              isFetching={isFetching}
            />
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: CUSTOMER_SELECTORS.getCategoriesWithProducts(state),
    products: CUSTOMER_SELECTORS.getCategoryProducts(state),
    categoryReducer: state.customer.categories,
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(Home);
