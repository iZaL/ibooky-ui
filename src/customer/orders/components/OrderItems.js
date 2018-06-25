import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import SectionTitle from 'components/SectionTitle';
import I18n from 'utils/locale';

export default class OrderItems extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.order !== this.props.order;
  }

  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  render() {
    const {order} = this.props;
    const {products} = order;
    return (
      <View style={styles.container}>
        <SectionTitle title={I18n.t('order_details')} />

        {products.map((product, index) => (
          <View style={styles.itemContainer} key={product.id}>
            <View style={styles.packageItemContainer}>
              <Text style={styles.packageTitle}>{product.name}</Text>
            </View>
            {product.pivot && (
              <View>
                <View style={{flex: 1, paddingTop: 10}}>
                  <View style={styles.serviceListContainer}>
                    <Text style={styles.attributeTitle}>
                      {I18n.t('quantity')}
                    </Text>
                    <Text>{product.pivot.quantity}</Text>
                  </View>
                </View>
                <Divider />
                <View style={{flex: 1}}>
                  <View style={styles.serviceListContainer}>
                    <Text style={styles.attributeTitle}>
                      {I18n.t('amount')}
                    </Text>
                    <Text>{product.pivot.price} KD</Text>
                  </View>
                </View>
              </View>
            )}
            {order.attributes &&
              order.attributes.map(attribute => {
                return (
                  <View style={{flex: 1}} key={attribute.id}>
                    <Divider />
                    <View style={styles.serviceListContainer}>
                      <Text style={styles.attributeTitle}>
                        {attribute.name}{' '}
                      </Text>
                    </View>
                  </View>
                );
              })}
            <Divider />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingTop: 0,
    padding: 10,
  },
  itemContainer: {
    // padding: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 20,
    color: colors.darkGrey,
    // color: '#aa2d29',
    // fontWeight: 'bold',
  },
  packageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  packageTitle: {
    flex: 1,
    fontSize: 17,
    color: colors.black,
    fontWeight: '500',
  },
  attributeTitle: {
    flex: 1,
    fontSize: 17,
    color: colors.mediumGrey,
    paddingLeft: 20,
  },
  packagePrice: {
    color: colors.primary,
    fontSize: 17,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
  },
  total: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  totalPrice: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});
