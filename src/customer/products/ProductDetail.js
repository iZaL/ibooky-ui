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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../assets/theme/colors";
import IconFactory from "../../components/IconFactory";

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

  componentDidMount() {
    this.props.navigation.setParams({
      handleRightButtonPress: this.loadCartScene,
    });
  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  onAddToCartPress = () => {

  };

  render() {
    let {product} = this.props;
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 50}}>
        <ProductImages images={product.images} />
        <View style={{paddingHorizontal: 10}}>
          <ProductInfo item={product}/>
          <Divider/>

          <Button title={I18n.t('add_to_cart').toUpperCase()} onPress={this.onAddToCartPress}/>

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
      title: 'Offer 1',
      description: 'Offer Description Offer Description  Offer Description Offer Description Offer Description Offer Description Offer Description',
      offerPercentage: '50%',
      oldPrice: '50KD',
      price: '30KD',
      images: [
        'http://ibooky.test/uploads/dental-clinic1.jpg',
        'http://ibooky.test/uploads/dental-clinic2.jpg',
        'http://ibooky.test/uploads/dental-clinic3.jpg',
        'http://ibooky.test/uploads/dental-clinic4.jpg',
      ],
    },
  };
}

export default connect(mapStateToProps)(ProductDetail);
