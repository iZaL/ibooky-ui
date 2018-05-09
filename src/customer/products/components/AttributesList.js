/**
 * @flow
 */
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Divider from 'components/Divider';
import {CategoriesProp} from 'customer/common/proptypes';
import {ListItem, TouchableRipple} from "react-native-paper";
import PropTypes from 'prop-types';
import colors from "assets/theme/colors";

export default class extends Component {

  static propTypes = {
    items: CategoriesProp.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeIDs:PropTypes.array
  };

  renderRow = ({item}) => {
    let {onItemPress, activeIDs} = this.props;

    return (
      <TouchableRipple onPress={() => onItemPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name.toUpperCase()}</Text>
          <Text style={styles.value}>
            {
              item && item.children && item.children.map(child => activeIDs.includes(child.id) ? child.name.toUpperCase() : '')
            }
            </Text>
        </View>
      </TouchableRipple>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  name: {},
  value: {
    paddingHorizontal: 10,
    fontWeight: '900',
    color: colors.primary
  }
});
