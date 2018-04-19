/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet,Dimensions,Animated,ScrollView} from 'react-native';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import HomeMenuItem from 'customer/components/HomeMenuItem';
import {CategoriesProp} from 'customer/common/proptypes';

const width = Dimensions.get('window').width;
export default class extends Component {
  static propTypes = {
    items: CategoriesProp.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeID: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.activeID !== this.props.activeID;
  }

  state = {
    // menuOffset:width / 2 - 40
    menuOffset:0
  };

  // onItemPress = (item,index) => {
  //   this.props.onItemPress(item);
  //   if(index === 0) return;
  //   let padding = width / 2 - (index * 100) ;
  //   // this.setState({
  //   //   menuOffset:padding
  //   // });
  // };

  renderRow = (item,index) => {
    let {onItemPress, activeID} = this.props;
    return (
      <HomeMenuItem key={index} item={item} onPress={onItemPress} activeID={activeID} />
    );
  };

  render() {
    let {items} = this.props;
    // return (
    //   <FlatList
    //     ref={ ref => this.scrollView = ref }
    //     horizontal={true}
    //     data={items}
    //     style={styles.listContainer}
    //     renderItem={this.renderRow}
    //     ItemSeparatorComponent={() => <Divider />}
    //     keyExtractor={(item, index) => `${index}`}
    //     showsVerticalScrollIndicator={false}
    //     showsHorizontalScrollIndicator={false}
    //     onScrollEndDrag={this.handleScroll}
    //   />
    // );

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // onScrollEndDrag={this.handleScroll}
        ref={ ref => this.scrollView = ref }
        horizontal={true}
        style={[styles.listContainer,{paddingLeft:this.state.menuOffset}]}
      >
        {items.map((item,i) => this.renderRow(item,i))}
      </ScrollView>
    )

  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.secondary,
  },
});
