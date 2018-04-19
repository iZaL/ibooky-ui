import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {CategoriesPropType} from 'customer/common/proptypes';
import ProductDescription from "customer/products/components/ProductDescription";
import ProductImages from "customer/products/components/ProductImages";
import Divider from "components/Divider";
import ProductInfo from "customer/products/components/ProductInfo";

class ProductDetail extends Component {
  componentDidMount() {
    // this.props.dispatch(CUSTOMER_ACTIONS.fetchCategories());
  }

  onItemPress = () => {
  };

  render() {
    let {product} = this.props;
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 50}}>
        <ProductImages images={product.images} />
        <View style={{paddingHorizontal: 10}}>
          <ProductInfo item={product}/>
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
