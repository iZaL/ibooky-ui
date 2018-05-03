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

  setCartItem = () => {

    let {product} = this.props;
    let {attributeIDs} = this.state;

    // Object.keys(attributeIDs).map(parentID => attributeIDs[parentID]).map(attribute => {
    //   let parentAttribute = {
    //     [attribute.parent_id]: {
    //       parent_id: attribute.parent_id,
    //       child_id: attribute.child_id
    //     }
    //   };
    //   this.props.dispatch(PRODUCT_ACTIONS.setCartItem({
    //     product_id: product.id,
    //     attributes: parentAttribute
    //   }));
    // });

    this.props.dispatch(PRODUCT_ACTIONS.setCartItem({
      product_id: product.id,
      attributes: attributeIDs
    }));

    this.hideAttributesListDialog();
    this.loadCartScene();
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


  render() {
    let {product} = this.props;
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

        <ProductImages images={product.images}/>

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
                close={this.hideAttributesListDialog}
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
      time_remaining_formatted: '10:00:00 hrs',
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
  };
}

export default connect(mapStateToProps)(ProductDetail);
