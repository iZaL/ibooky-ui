/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';
import Image from 'react-native-image-progress';
export default class extends Component {

  static propTypes = {
    item: CategoryProp.isRequired,
    onPress: PropTypes.func.isRequired,
    activeID: PropTypes.number,
  };

  static defaultProps = {
    activeID: null
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.activeID !== this.props.activeID;
  }

  render() {
    let {item, onPress, activeID} = this.props;

    console.log('item',item);

    return (
      <TouchableRipple
        onPress={() => onPress(item)}
        style={styles.itemContainer}>
        <View style={{flex:1}}>
          <Text style={[styles.name, item.id === activeID && styles.nameActive]}>
            {item.name}
          </Text>
          <Image source={{url:item.image}} style={styles.image} resizeMode="contain"/>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    // padding: 10,
  },
  name: {
    fontSize: 16,
    color: colors.white,
  },
  nameActive: {
    fontWeight: '900',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 500,
  }
});
