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
import Spinner from "components/Spinner";
import debounce from 'lodash/debounce';

class Favorites extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Text style={{color: 'black'}}>Favorites</Text>,
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
  };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchFavoriteProducts());
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
    console.log('fetching more');
    this.props.dispatch(CUSTOMER_ACTIONS.fetchFavoriteProducts());
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
    let {products,favorites} = this.props;

    console.log('favorites.isFetching',favorites.isFetching);
    return (
      <View style={{flex: 1}}>

        <Spinner isVisible={favorites.isFetching} />

        <ProductList
          items={products}
          onItemPress={this.onProductListItemPress}
          onAddToCartPress={this.onAddToCartPress}
          onEndReached={this.fetchMore}
          favorite={this.favoriteProduct}
          isFetching={favorites.isFetching}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: CUSTOMER_SELECTORS.getFavoriteProducts(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    favorites:state.customer.favorites
  };
}

export default connect(mapStateToProps)(Favorites);
