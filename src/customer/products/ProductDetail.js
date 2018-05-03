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
import ProductAttributesList from "customer/products/components/ProductAttributesList";
import AttributesListDialog from "customer/products/components/AttributesListDialog";
import {ACTIONS as PRODUCT_ACTIONS} from "customer/common/actions";

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
    attribute_child_ids: {}
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleRightButtonPress: this.loadCartScene,
    });
  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  onProductAttributesListItemPress = (item: object) => {
    this.setState({
      activeParentID: item.id || []
    }, () => {
      this.showAttributesListDialog();
    });
  };

  attributesListDialogItemPress = (child: object) => {
    this.setState({
      attribute_child_ids: {
        ...this.state.attribute_child_ids,
        [child.parent_id]: {
          parent_id: child.parent_id,
          child_id: child.id,
        }
      }
    });
  };

  setCartItem = () => {

    let {product} = this.props;
    let {attribute_child_ids} = this.state;

    Object.keys(attribute_child_ids).map(parentID => attribute_child_ids[parentID]).map(attribute => {
      let parentAttribute = {
        [attribute.parent_id]: {
          parent_id: attribute.parent_id,
          child_id: attribute.child_id
        }
      };
      this.props.dispatch(PRODUCT_ACTIONS.setCartItem({
        product_id: product.id,
        attributes: parentAttribute
      }));
    });
    this.hideAttributesListDialog();
    this.loadCartScene();
  };

  attributesListDialogSavePress = () => {
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


  render() {
    let {product} = this.props;
    let {attributesListDialogVisible, attribute_child_ids, activeParentID} = this.state;

    let attribute_list_items = [];
    if (activeParentID) {
      let attribute = product.attributes.find(attribute => attribute.id === activeParentID);
      if (attribute) {
        attribute_list_items = attribute.children || [];
      }
    }
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 50}}>

        <ProductImages images={product.images}/>

        <View style={{paddingHorizontal: 10}}>

          <ProductInfo item={product}/>

          <Divider/>

          {
            product.show_attributes &&
            <View>
              <ProductAttributesList
                items={product.attributes}
                onItemPress={this.onProductAttributesListItemPress}
                activeChildrenIDs={attribute_child_ids}
              />

              <AttributesListDialog
                visible={attributesListDialogVisible}
                close={this.hideAttributesListDialog}
                save={this.attributesListDialogSavePress}
                onItemPress={this.attributesListDialogItemPress}
                items={attribute_list_items}
                activeIDs={attribute_child_ids}
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

function mapStateToProps(state) {
  return {
    product: {
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
      time_remaining_formatted:'10:00:00 hrs',
      images: [
        'http://ibooky.test/uploads/dental-clinic1.jpg',
        'http://ibooky.test/uploads/dental-clinic2.jpg',
        'http://ibooky.test/uploads/dental-clinic3.jpg',
        'http://ibooky.test/uploads/dental-clinic4.jpg',
      ],
      attributes: [
        {
          id: 1, name: 'color', price: 13, required: false,
          children: [
            {id: 2, name: 'gold', price: 15, parent_id: 1},
            {id: 3, name: 'black', price: 12, parent_id: 1},
            {id: 4, name: 'silver', price: 12, parent_id: 1},
            {id: 5, name: 'red', price: 10, parent_id: 1},
          ]
        },
        {
          id: 6, name: 'type', required: true,
          children: [
            {id: 7, name: '1050 mAh', parent_id: 6},
            {id: 8, name: '2680 mAh', parent_id: 6},
          ],
        }
      ],
    },
    cart: state.customer.cart
  };
}

export default connect(mapStateToProps)(ProductDetail);
