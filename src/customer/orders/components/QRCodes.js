/**
 * @flow
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import SectionHeading from 'components/SectionHeading';
import I18n from 'utils/locale';
import QRCode from 'react-native-qrcode-svg';

const QRCodes = ({order}) => {
  return (
    <View styles={styles.container}>
      <SectionHeading title={I18n.t('qr_code')} />
      <View style={styles.rowContainer}>
        {order.products &&
        order.products.map(product => {
          if(product.pivot) {
            return (
              <View style={{marginBottom: 80, alignItems: 'center'}} key={`${product.id}`}>
                <QRCode value={`${product.pivot.code}`}  />
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Text style={{paddingVertical:10,fontSize:17}}>{product.name}</Text>
                  {
                    product.company &&
                    <Text style={{paddingVertical:10,fontSize:17}}> - {product.company.name}</Text>
                  }
                </View>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:10,
  },
  total: {
    color: colors.primary,
    fontSize: 22,
    textAlign: 'right',
  },
  rowContainer:{flex: 1, padding: 20}
});

export default QRCodes;
