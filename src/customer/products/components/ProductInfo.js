/**
 * @flow
 */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Subheading, Title} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';
import CountdownTimer from 'customer/products/components/CountdownTimer';

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
        <Subheading>
          {I18n.t('save')} {item.sale_percentage_formatted}
        </Subheading>

        <Divider style={{marginVertical: 10}} />

        <View style={styles.itemInfoContainer}>
          <View style={styles.itemContent}>
            {item.on_sale && (
              <Text style={styles.label}>{item.actual_price_formatted}</Text>
            )}
            <Text style={styles.value}>{item.price_formatted}</Text>
          </View>

          {!item.bid_expired && (
            <View style={styles.itemContent}>
              <Text style={styles.label}>{I18n.t('time_remaining')}</Text>
              <CountdownTimer
                targetDate={new Date(item.bid_end_at)}
                startDelay={2000}
                interval={1000}
                timeSeparator={':'}
                leadingZero
              />
              <Text style={styles.value}>{item.time_remaining_formatted}</Text>
            </View>
          )}

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
