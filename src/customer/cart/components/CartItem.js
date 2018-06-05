/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import ProductInfo from 'customer/cart/components/ProductInfo';
import ProductQuantity from 'customer/cart/components/ProductQuantity';
import Divider from 'components/Divider';
import CartTotal from 'customer/cart/components/CartTotal';
import Button from "components/Button";
import I18n from 'utils/locale';
import {Colors} from "react-native-paper";
import Dialog from "../../../components/Dialog";

export default class extends Component {
  static propTypes = {
    text: PropTypes.string,
    total: PropTypes.number,
    setQuantity: PropTypes.func.isRequired,
    onDelete:PropTypes.func
  };

  // shouldComponentUpdate(nextProps) {
  //   return false
  // }

  state = {
    dialogVisible:false
  };

  setQuantity = (quantity: number) => {
    this.props.setQuantity(this.props.item, quantity);
  };

  onDeletePress = () => {
    this.setState({
      dialogVisible:true
    });
  };

  onDeleteConfirm = () => {
    this.setState({dialogVisible:false});
    this.props.onDelete(this.props.item);
  };

  render() {
    let {item} = this.props;
    let {dialogVisible} = this.state;

    return (
      <View style={styles.container}>
        <ProductInfo item={item} />

        <ProductQuantity
          selected={item.cart.quantity || 1}
          onPress={this.setQuantity}
        />

        <Divider style={{marginVertical: 5}} />

        <View style={styles.row}>
          <Button title={I18n.t('delete')} onPress={this.onDeletePress} color={Colors.teal300}/>
          <CartTotal total={item.cart.total} hideTitle={true} />
        </View>

        <Dialog
          title={I18n.t('confirm')}
          description={I18n.t('cart_delete_item?')}
          rightPress={this.onDeleteConfirm}
          leftPress={()=>{this.setState({dialogVisible:false})}}
          leftText={I18n.t('cancel')}
          visible={dialogVisible}
        />

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
  row:{
    flexDirection:'row',
    alignItems:'center'
  }
});
