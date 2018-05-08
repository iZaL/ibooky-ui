/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import HomeMenuItem from 'customer/components/HomeMenuItem';
import {CategoriesProp} from 'customer/common/proptypes';

export default class extends Component {
  static propTypes = {
    items: CategoriesProp.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeID: PropTypes.number.isRequired,
  };

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.activeID !== this.props.activeID;
  // }

  state = {
    menuOffset: 0,
  };

  renderRow = (item, index) => {
    let {onItemPress, activeID} = this.props;
    return (
      <HomeMenuItem
        key={index}
        item={item}
        onPress={onItemPress}
        activeID={activeID}
      />
    );
  };

  render() {
    let {items} = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ref={ref => (this.scrollView = ref)}
        horizontal={true}
        style={[styles.listContainer, {paddingLeft: this.state.menuOffset}]}>
        {items.map((item, i) => this.renderRow(item, i))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.secondary,
  },
});
