/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import ProductItem from 'customer/components/ProductItem';
import {CategoriesProp} from 'customer/common/proptypes';

export default class extends Component {

  static propTypes = {
    items: CategoriesProp.isRequired,
  };


  shouldComponentUpdate(nextProps) {
    return nextProps.activeID !== this.props.activeID;
  }

  renderRow = ({item}) => {
    let {onItemPress, activeID} = this.props;
    return (
      <ProductItem item={item} onPress={onItemPress} activeID={activeID} />
    );
  };

  render() {
    let {items} = this.props;
    return (
      <FlatList
        data={items}
        style={styles.listContainer}
        renderItem={this.renderRow}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.blue,
  },
  itemContainer: {
    // padding: 10,
  },
  name: {
    fontSize: 16,
    color: colors.white,
  },
  nameActive: {
    fontWeight: '700',
  },
});
