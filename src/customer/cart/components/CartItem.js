/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import {DialogContent, Paper, Paragraph} from 'react-native-paper';
import ProductInfo from 'customer/cart/components/ProductInfo';
import ProductQuantity from 'customer/cart/components/ProductQuantity';
import Divider from 'components/Divider';
import CartTotal from 'customer/cart/components/CartTotal';

export default class extends Component {
  static propTypes = {
    text: PropTypes.string,
    total: PropTypes.number,
    setQuantity: PropTypes.func.isRequired,
  };

  // shouldComponentUpdate(nextProps) {
  //   return false
  // }

  setQuantity = (quantity: number) => {
    this.props.setQuantity(this.props.item, quantity);
  };

  render() {
    let {item} = this.props;

    return (
      <View style={styles.container}>
        <ProductInfo item={item} />

        <ProductQuantity
          selected={item.cart.quantity || 1}
          onPress={this.setQuantity}
        />

        <Divider style={{marginVertical: 5}} />

        <CartTotal total={item.cart.total} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    shadowColor: colors.fadedWhite,
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 1},
    marginBottom: 10,
  },
});
