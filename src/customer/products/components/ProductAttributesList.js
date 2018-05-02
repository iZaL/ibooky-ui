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
  };

  renderRow = ({item}) => {
    let {onItemPress, activeChildrenIDs} = this.props;
    let activeChildIDs = activeChildrenIDs[item.id];

    return (
      <TouchableRipple onPress={() => onItemPress(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name.toUpperCase()}</Text>
          <Text style={styles.value}>
            {
              activeChildIDs && activeChildIDs.map(childID => {
                let child = item.children.find(child => child.id === childID);
                if(child) {
                  return child.name.toUpperCase();
                }
              })
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
