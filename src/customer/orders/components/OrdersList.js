import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import ProductImages from 'customer/products/components/ProductImages';
import {TouchableRipple} from 'react-native-paper';
import OrderProductInfo from 'customer/orders/components/OrderProductInfo';

export default class OrdersList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
    onPullToRefresh: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onFetchMore: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    onPullToRefresh: () => {},
    onFetchMore: () => {},
    activeItemID: undefined,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;

    let {product} = item;
    return (
      <View style={styles.container}>
        <ProductImages images={product.images} />

        <TouchableRipple
          onPress={() => onItemPress(item)}
          style={styles.itemContainer}>
          <OrderProductInfo item={product} total={item.total_formatted} />
        </TouchableRipple>
      </View>
    );
  };

  render() {
    const {items, onPullToRefresh, isFetching, onFetchMore} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <Divider />}
        scrollEventThrottle={120}
        ref="listView"
        onRefresh={() => onPullToRefresh()}
        refreshing={isFetching}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        initialListSize={20}
        onEndReachedThreshold={1}
        onEndReached={() => !isFetching && onFetchMore()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#efefef',
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 20,
    paddingRight: 10,
  },
  categoryName: {
    fontSize: 20,
  },
  itemContentContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  confirmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 20,
    paddingHorizontal: 5,
  },
  packageItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  packageTitle: {
    flex: 4,
    fontSize: 16,
    color: colors.mediumGrey,
  },
  packagePrice: {
    flex: 1,
    color: colors.primary,
    fontSize: 15,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTitle: {
    flex: 3,
    paddingLeft: 20,
    fontSize: 18,
    color: colors.darkGrey,
  },
  servicePrice: {
    flex: 1,
    color: colors.primary,
    fontSize: 16,
    textAlign: 'right',
  },
  orderNo: {
    color: colors.mediumGrey,
  },
});
