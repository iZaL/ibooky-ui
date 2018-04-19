/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';

export default class extends Component {
  static propTypes = {
    item: CategoryProp.isRequired,
    onPress: PropTypes.func.isRequired,
    activeID: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.activeID !== this.props.activeID;
  }

  render() {
    let {item, onPress, activeID} = this.props;

    return (
      <TouchableRipple
        onPress={() => onPress(item)}
        style={styles.container}
      >
        <Text style={[styles.name, item.id === activeID && styles.nameActive]}>
          {item.name}
        </Text>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
  },
  name: {
    minWidth:100,
    padding:10,
    fontSize: 16,
    color: colors.white,
    textAlign:'center'
  },
  nameActive: {
    fontWeight: '900',
  },
});
