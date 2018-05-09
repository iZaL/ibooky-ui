import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import ProductDescription from "customer/products/components/ProductDescription";
import ProductImages from "customer/products/components/ProductImages";
import Divider from "components/Divider";
import ProductInfo from "customer/products/components/ProductInfo";
import Button from "components/Button";
import I18n from 'utils/locale';
import NavButton from "components/NavButton";
import IconFactory from "components/IconFactory";
import AttributesList from "customer/products/components/AttributesList";
import AttributeDialog from "customer/products/components/AttributeDialog";
import {ACTIONS as PRODUCT_ACTIONS} from "customer/common/actions";
import {SELECTORS as CUSTOMER_SELECTORS} from "customer/common/selectors";

class ProductDetail extends Component {

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

  state = {
    attributesListDialogVisible: false,
    activeParentID: null,
    attributeIDs: []
  };

  static getDerivedStateFromProps(nextProps,prevStates) {
    let productID = nextProps.navigation.getParam('productID');
    if(nextProps.cart.products[productID]) {
      if(nextProps.cart.products[productID].attributes !== prevStates.attributes) {
        return {
          attributeIDs:nextProps.cart.products[productID].attributes
        }
      }
    }

    return null;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleRightButtonPress: this.loadCartScene,
    });

  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  onAttributesListItemPress = (item: object) => {
    this.setState({
      activeParentID: item.id || []
    }, () => {
      this.showAttributesListDialog();
    });
  };

  onAttributeDialogItemPress = (child: object) => {
    let {attributeIDs} = this.state;

    let productAttributes = this.props.product.attributes || [];

    let parentAttribute = productAttributes.find(attribute => attribute.id === child.parent_id);

    let childrenIDs = parentAttribute.children.map(child => child.id);

    let newState = attributeIDs.filter(id => !childrenIDs.includes(id)).concat(child.id);

    this.setState({
      attributeIDs: newState
    });
  };


  onAttributesListDialogSavePress = () => {
    this.hideAttributesListDialog();
  };

  showAttributesListDialog = () => {
    this.setState({
      attributesListDialogVisible: true
    });
  };

  hideAttributesListDialog = () => {
    this.setState({
      attributesListDialogVisible: false
    });
  };


  onAddToCartPress = () => {
    this.setCartItem();
    // this.props.navigation.navigate('Cart');
  };

  setCartItem = () => {

    let {product} = this.props;
    let {attributeIDs} = this.state;

    this.props.dispatch(PRODUCT_ACTIONS.setCartItem({
      product_id: product.id,
      attributes: attributeIDs
    }));

    this.hideAttributesListDialog();
    this.loadCartScene();
  };

  render() {
    let {product} = this.props;
    console.log('product',product);
    let {attributesListDialogVisible, attributeIDs, activeParentID} = this.state;

    // let attribute_list_items = [];
    // if (activeParentID) {
    //   let attribute = product.attributes.find(attribute => attribute.id === activeParentID);
    //   if (attribute) {
    //     attribute_list_items = attribute.children || [];
    //   }
    // }

    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 50}}>


        <ProductImages images={product.images.length ? product.images : [product.image]}/>

        <View style={{paddingHorizontal: 10}}>

          <ProductInfo item={product}/>

          <Divider/>

          {
            product.show_attributes &&
            <View>

              <AttributesList
                items={product.attributes}
                onItemPress={this.onAttributesListItemPress}
                activeIDs={attributeIDs}
              />

              <AttributeDialog
                visible={attributesListDialogVisible}
                save={this.onAttributesListDialogSavePress}
                onItemPress={this.onAttributeDialogItemPress}
                item={product.attributes.find(attribute => attribute.id === activeParentID) || {children:[]}}
                activeIDs={attributeIDs}
              />

              <Divider/>

            </View>
          }

          <Button primary raised dark title={I18n.t('buy_now').toUpperCase()}
                  onPress={() => this.onAddToCartPress(product)}/>

          <Divider/>

          <ProductDescription text={product.description}/>

        </View>

      </ScrollView>
    );
  }
}

function mapStateToProps(state,props) {
  const getCartProduct = CUSTOMER_SELECTORS.getProduct();
  const productID = props.navigation.getParam('productID');
  return {
    cart:state.customer.cart,
    product: getCartProduct(state,productID),
  };
}

export default connect(mapStateToProps)(ProductDetail);
