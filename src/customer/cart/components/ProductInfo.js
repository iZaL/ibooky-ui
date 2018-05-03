/**
 * @flow
 */
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Caption, Paragraph, Subheading, Title} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {ProductProp} from 'customer/common/proptypes';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';

export default class extends Component {

  static propTypes = {
    item: ProductProp.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  render() {
    let {item} = this.props;

    return (
      <View style={styles.container}>
        <Image source={{uri: item.featured_image}} style={styles.image}/>
        <View style={{flex: 1}}>
          <Title> {item.title}</Title>
          <Caption
            style={{paddingHorizontal: 5}}
          >{item.description}</Caption>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 100,
    borderRadius: 10
  },
});
