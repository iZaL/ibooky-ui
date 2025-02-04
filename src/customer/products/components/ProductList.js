/**
 * @flow
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Divider from 'components/Divider';
import {CategoriesProp} from 'customer/common/proptypes';
import ProductImages from 'customer/products/components/ProductImages';
import {TouchableRipple} from 'react-native-paper';
import ProductInfo from 'customer/products/components/ProductInfo';
import Button from 'components/Button';
import I18n from 'utils/locale';
export default class extends Component {
  static propTypes = {
    items: CategoriesProp.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderRow = ({item}) => {
    let {onItemPress, onAddToCartPress, favorite} = this.props;
    return (
      <View style={styles.container}>
        <ProductImages images={item.images} />

        <TouchableRipple
          onPress={() => onItemPress(item)}
          style={styles.itemContainer}>
          <ProductInfo item={item} favorite={favorite} />
        </TouchableRipple>

        <Button
          primary
          raised
          dark
          title={I18n.t('buy_now').toUpperCase()}
          onPress={() => onAddToCartPress(item)}
          disabled={!item.bid_valid}
        />
      </View>
    );
  };

  render() {
    let {items, onEndReached, isFetching} = this.props;

    return (
      <FlatList
        data={items}
        style={[styles.listContainer, isFetching && {opacity: 0}]}
        contentInset={{bottom: 50}}
        renderItem={this.renderRow}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    paddingHorizontal: 10,
  },
});
