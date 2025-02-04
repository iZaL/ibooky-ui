/**
 * @flow
 */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Subheading, Title, TouchableRipple} from 'react-native-paper';
import colors from 'assets/theme/colors';
import {CategoryProp} from 'customer/common/proptypes';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import Divider from 'components/Divider';
import CountdownTimer from 'customer/products/components/CountdownTimer';
import PropTypes from 'prop-types';
import Share from 'components/Share';
import moment from 'moment';

export default class extends Component {
  static propTypes = {
    item: CategoryProp.isRequired,
    favorite: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  render() {
    let {item, favorite} = this.props;

    return (
      <View style={styles.container}>
        <Title style={{textAlign:'left'}}>{item.name}</Title>
        <Subheading style={{textAlign:'left'}}>
          {I18n.t('save')} {item.sale_percentage_formatted}
        </Subheading>

        <Divider style={{marginVertical: 10}} />

        <View style={styles.itemInfoContainer}>
          <View style={styles.itemContent}>
            {item.on_sale && (
              <Text style={[styles.label,styles.strike]}>{item.actual_price_formatted}</Text>
            )}
            <Text style={styles.value}>{item.price_formatted}</Text>
          </View>

          {item.bid_valid && (
            <View style={[styles.itemContent]}>
              <Text style={styles.label}>{I18n.t('time_remaining')}</Text>
              <CountdownTimer targetDate={moment(item.bid_end_at)} />
              {/*<CountdownTimer targetDate={new Date(item.bid_end_at)} />*/}
            </View>
          )}

          <TouchableRipple onPress={() => favorite(item)}>
            <IconFactory
              type="MaterialCommunityIcons"
              name={item.favorited ? 'heart' : 'heart-outline'}
              color={item.favorited ? colors.error : colors.error}
              size={30}
              style={{marginTop:12}}
            />
          </TouchableRipple>

          <Share
            payload={{
              title: `Checkout the coupon ${item.name} title`,
              message: `Checkout the coupon ${item.name} message`,
              subject: `Checkout the coupon ${item.name} subject`,
              url: `hungryr://coupon/${item.id}`,
            }}>
            <View style={styles.itemContent}>
              <Text style={styles.label}>{I18n.t('share')}</Text>
              <IconFactory
                type="Entypo"
                name="share-alternative"
                color={colors.error}
                size={24}
              />
            </View>
          </Share>
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
    textAlign:'left',
  },
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 20,
    textAlign:'left',
  },
  strike:{
    textDecorationLine: 'line-through'
  }
});
