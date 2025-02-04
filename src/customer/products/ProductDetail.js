import React, {Component} from 'react';
import {ScrollView, View, InteractionManager} from 'react-native';
import {connect} from 'react-redux';
import ProductDescription from 'customer/products/components/ProductDescription';
import ProductImages from 'customer/products/components/ProductImages';
import Divider from 'components/Divider';
import ProductInfo from 'customer/products/components/ProductInfo';
import Button from 'components/Button';
import I18n from 'utils/locale';
import NavButton from 'components/NavButton';
import IconFactory from 'components/IconFactory';
import AttributesList from 'customer/products/components/AttributesList';
import AttributeDialog from 'customer/products/components/AttributeDialog';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import colors from 'assets/theme/colors';
import Spinner from '../../components/Spinner';

class ProductDetail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: navigation.getParam('headerTitle').toUpperCase(),
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

  state = {
    attributesListDialogVisible: false,
    activeParentID: null,
    attributeIDs: [],
  };

  static getDerivedStateFromProps(nextProps, prevStates) {
    let productID = nextProps.navigation.getParam('productID');
    if (nextProps.cart.products[productID]) {
      if (
        nextProps.cart.products[productID].attributes !== prevStates.attributes
      ) {
        return {
          attributeIDs: nextProps.cart.products[productID].attributes,
        };
      }
    }

    return null;
  }

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchProductDetails({
        product_id: this.props.navigation.getParam('productID'),
      }),
    );

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

  onAttributesListItemPress = (item: object) => {
    this.setState(
      {
        activeParentID: item.id || null,
      },
      () => {
        this.showAttributesListDialog();
      },
    );
  };

  onAttributeDialogItemPress = (child: object) => {
    let {attributeIDs} = this.state;

    let productAttributes = this.props.product.attributes || [];

    let parentAttribute = productAttributes.find(
      attribute => attribute.id === child.parent_id,
    );

    let childrenIDs =
      (parentAttribute &&
        parentAttribute.children &&
        parentAttribute.children.map(child => child.id)) ||
      [];

    let newState = attributeIDs
      .filter(id => !childrenIDs.includes(id))
      .concat(child.id);

    this.setState({
      attributeIDs: newState,
    });
  };

  onAttributesListDialogSavePress = () => {
    this.hideAttributesListDialog();
  };

  showAttributesListDialog = () => {
    this.setState({
      attributesListDialogVisible: true,
    });
  };

  hideAttributesListDialog = () => {
    this.setState({
      attributesListDialogVisible: false,
    });
  };

  onAddToCartPress = () => {
    this.setCartItem();
    // this.props.navigation.navigate('Cart');
  };

  setCartItem = () => {
    let {product, cart} = this.props;
    let {attributeIDs} = this.state;

    let cartProduct = Object.keys(cart.products)
      .map(productID => cart.products[productID])
      .find(prod => prod.product_id === product.id);

    this.props.dispatch(
      CUSTOMER_ACTIONS.setCartItem({
        product_id: product.id,
        attributes: attributeIDs,
        total: product.price,
        quantity: cartProduct ? cartProduct.quantity + 1 : 1,
      }),
    );

    this.hideAttributesListDialog();
    this.loadCartScene();
  };

  favoriteProduct = product => {
    this.props.dispatch(
      CUSTOMER_ACTIONS.favoriteProduct({
        product_id: product.id,
      }),
    );
  };

  render() {
    let {product, productReducer} = this.props;

    let {
      attributesListDialogVisible,
      attributeIDs,
      activeParentID,
    } = this.state;

    return (
      <View style={{flex: 1}}>
        <Spinner isVisible={productReducer.isFetching} />

        <ScrollView
          style={[{flex: 1}, productReducer.isFetching && {opacity: 0.5}]}
          contentContainerStyle={{paddingBottom: 50}}>
          <ProductImages
            images={product.images.length ? product.images : [product.image]}
          />

          <View style={{paddingHorizontal: 10}}>
            <ProductInfo item={product} favorite={this.favoriteProduct} />

            <Divider />

            {product.show_attributes && (
              <View>
                <AttributesList
                  items={product.attributes || []}
                  onItemPress={this.onAttributesListItemPress}
                  activeIDs={attributeIDs}
                />

                <AttributeDialog
                  visible={attributesListDialogVisible}
                  save={this.onAttributesListDialogSavePress}
                  onItemPress={this.onAttributeDialogItemPress}
                  item={
                    product.attributes
                      ? product.attributes.find(
                          attribute => attribute.id === activeParentID,
                        )
                      : {children: []}
                  }
                  activeIDs={attributeIDs}
                />

                <Divider />
              </View>
            )}

            <Button
              primary
              raised
              dark
              title={I18n.t('buy_now').toUpperCase()}
              onPress={() => this.onAddToCartPress(product)}
              disabled={!product.bid_valid}
            />

            <Divider />

            <ProductDescription text={product.description} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const getCartProduct = CUSTOMER_SELECTORS.getProduct();
  const productID = props.navigation.getParam('productID');
  return {
    cart: state.customer.cart,
    product: getCartProduct(state, productID),
    productReducer: state.customer.products,
  };
}

export default connect(mapStateToProps)(ProductDetail);
