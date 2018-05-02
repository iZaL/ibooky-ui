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
    attributesListDialogVisible:false,
    attributes_list:[]
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleRightButtonPress: this.loadCartScene,
    });
  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  onAddToCartPress = () => {
    this.props.navigation.navigate('Cart');
  };

  onProductAttributesListItemPress = (item:object) => {
    console.log('item',item);

    this.setState({
      attributes_list:item.children || []
    },()=>{
      this.showAttributesListDialog();
    });
  };

  attributesListDialogItemPress = (child:object) => {
    console.log('child',child);
    let {product} = this.props;
    console.log('product',product);

    // let {cartProducts} = this.props.cart;
    // let parentAttributeID = child.parent_id;
    // let cartProduct = cartProducts[product.id] || {};
    //
    // this.props.dispatch(PRODUCT_ACTIONS.setCartItem({
    //   product_id:cartProduct,
    //   attributes: {
    //     [parentAttributeID] : {
    //       parent_id:parentAttributeID,
    //       child_id:child.id
    //     }
    //   }
    // }));
  };

  attributesListDialogSavePress = () => {
    this.hideAttributesListDialog();
  };

  showAttributesListDialog = () => {
    this.setState({
      attributesListDialogVisible:true
    });
  };

  hideAttributesListDialog = () => {
    this.setState({
      attributesListDialogVisible:false
    });
  };

  render() {
    let {product,cart} = this.props;
    let {attributesListDialogVisible,attributes_list} = this.state;

    console.log('cart',cart);

    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 50}}>
        <ProductImages images={product.images} />
        <View style={{paddingHorizontal: 10}}>
          <ProductInfo item={product}/>
          <Divider/>
          <ProductAttributesList items={product.attributes} onItemPress={this.onProductAttributesListItemPress} />
          <Divider/>
          <Button primary raised dark title={I18n.t('buy_now').toUpperCase()} onPress={()=>this.onAddToCartPress(product)}/>
          <Divider/>
          <ProductDescription text={product.description}/>

          <AttributesListDialog
            visible={attributesListDialogVisible}
            close={this.hideAttributesListDialog}
            save={this.attributesListDialogSavePress}
            onItemPress={this.attributesListDialogItemPress}
            items={attributes_list}
            activeIDs={[]}
          />

        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: {
      id: 1,
      category:{
        id:1,
        name:'samsung',
      },
      title: 'Offer 1',
      description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
      offerPercentage: 50,
      oldPrice: 60,
      price: 30,
      images: [
        'http://ibooky.test/uploads/dental-clinic1.jpg',
        'http://ibooky.test/uploads/dental-clinic2.jpg',
        'http://ibooky.test/uploads/dental-clinic3.jpg',
        'http://ibooky.test/uploads/dental-clinic4.jpg',
      ],
      attributes:[
        {
          id:1,name:'color',price:13,required:false,
          children:[
            {id:2,name:'gold',price:15, parent_id: 1},
            {id:3,name:'black',price:12, parent_id: 1},
            {id:4,name:'silver',price:12, parent_id: 1},
            {id:5,name:'red',price:10, parent_id: 1},
          ]
        },
        {
          id: 6, name: 'type',required:true,
          children: [
            {id: 7, name: '1050 mAh', parent_id: 6},
            {id: 8, name: '2680 mAh', parent_id: 6},
          ],
        }
      ],
    },
    cart:state.customer.cart
  };
}

export default connect(mapStateToProps)(ProductDetail);
