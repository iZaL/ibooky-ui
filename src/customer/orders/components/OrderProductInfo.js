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
import CountdownTimer from '../../products/components/CountdownTimer';

export default class extends Component {
  static propTypes = {
    item: CategoryProp.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  render() {
    let {item, total} = this.props;
    return (
      <View style={styles.container}>
        <Title>{item.name}</Title>

        <Divider style={{marginVertical: 10}} />

        <View style={styles.itemInfoContainer}>
          <View style={styles.itemContent}>
            <Text style={styles.value}>{total}</Text>
          </View>

          <View style={styles.itemContent}>
            <Text style={styles.label}>{I18n.t('time_remaining')}</Text>

            <CountdownTimer
              targetDate={new Date(item.bid_end_at)}
              startDelay={2000}
              interval={1000}
              timeSeparator={':'}
              leadingZero
            />
          </View>

          <IconFactory
            type="MaterialCommunityIcons"
            name="heart"
            color={colors.error}
            size={24}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>{I18n.t('share')}</Text>
            <IconFactory
              type="Entypo"
              name="share-alternative"
              color={colors.error}
              size={24}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  swiper: {
    backgroundColor: colors.error,
    height: 424,
  },
  itemContainer: {
    padding: 10,
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
    height: '100%',
  },
  itemInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.error,
    fontSize: 12,
    fontWeight: '400',
  },
  itemContent: {
    alignItems: 'center',
  },
  value: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 20,
  },
});
