/**
 * @flow
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import {CategoriesProp} from 'customer/common/proptypes';
import ProductImages from "customer/products/components/ProductImages";
import {TouchableRipple} from "react-native-paper";
import ProductInfo from "customer/products/components/ProductInfo";

export default class extends Component {
  static propTypes = {
    items: CategoriesProp.isRequired,
  };

  renderRow = ({item}) => {
    let {onItemPress} = this.props;
    return (
      <View style={styles.container}>
        <ProductImages images={item.images}/>

        <TouchableRipple
          onPress={onItemPress}
          style={styles.itemContainer}
        >
          <ProductInfo item={item}/>
        </TouchableRipple>
      </View>
    );
  };

  render() {
    let {items} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        ItemSeparatorComponent={() => <Divider/>}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer:{
    paddingHorizontal:10
  }
});
