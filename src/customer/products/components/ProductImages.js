/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Title, TouchableRipple, Subheading} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';
import Image from 'react-native-image-progress';
import Swiper from 'react-native-swiper';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';

export default class extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    let {images} = this.props;

    return (
      <Swiper
        style={styles.swiper}
        autoPlay={false}
        showsButtons={false}
        removeClippedSubviews={false}
        loop={false}>
        {images.map((image, i) => {
          return (
            <Image
              key={i}
              source={{uri: image}}
              style={styles.image}
              resizeMode="stretch"
            />
          );
        })}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: colors.error,
    height: 424,
  },
  image: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
});
