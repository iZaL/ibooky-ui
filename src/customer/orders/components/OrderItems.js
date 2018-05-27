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
            {/*<Text style={styles.categoryTitle}>*/}
            {/*{product.category.name}*/}
            {/*</Text>*/}

            <View style={styles.packageItemContainer}>
              <Text style={styles.packageTitle}>{product.name}</Text>
              {product.price && (
                <Text style={styles.packagePrice}>{product.price} KD</Text>
              )}
            </View>

            {order.attributes &&
              order.attributes.length &&
              order.attributes
                // .filter(attribute => service.package.id === packageModel.id)
                .map(attribute => {
                  return (
                    <View style={{flex: 1}} key={attribute.id}>
                      <Divider style={{marginVertical: 10}} />

                      <View style={styles.serviceListContainer}>
                        <Text style={styles.packageTitle}>
                          {attribute.name}{' '}
                        </Text>
                        <Text style={styles.packagePrice}>
                          {attribute.price} KD
                        </Text>
                      </View>
                    </View>
                  );
                })}
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
    color: colors.mediumGrey,
    paddingLeft: 10,
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
