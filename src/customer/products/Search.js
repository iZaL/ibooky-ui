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
import I18n from 'utils/locale';
import SearchBox from "./components/SearchBox";

class Search extends Component {


  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Text style={{color: 'black'}}>{I18n.t('search')}</Text>,
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

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchProducts());
  }

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

  onSearch = (term) => {
    this.props.dispatch(CUSTOMER_ACTIONS.searchProducts({
      term:term
    }));
  };

  render() {
    let {products,search,any_products} = this.props;
    return (
      <View style={{flex: 1}}>

        <SearchBox term={search.term} onSearch={this.onSearch} />
        <Spinner isVisible={search.isFetching} />

        <ProductList
          items={search.term ? products : any_products}
          onItemPress={this.onProductListItemPress}
          onAddToCartPress={this.onAddToCartPress}
          onEndReached={this.fetchMore}
          favorite={this.favoriteProduct}
          isFetching={search.isFetching}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: CUSTOMER_SELECTORS.getSearchProducts(state),
    any_products:CUSTOMER_SELECTORS.getProducts(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    search:state.customer.search,
  };
}

export default connect(mapStateToProps)(Search);
