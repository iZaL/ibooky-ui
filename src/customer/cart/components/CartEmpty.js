import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import IconFactory from "components/IconFactory";
import {Title} from "react-native-paper";

export default class extends Component {

  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <IconFactory
          type="MaterialCommunityIcons"
          name="cart-outline"
          size={200}
          color={colors.primary}
          style={{opacity: 0.6}}
        />
        <Title>{I18n.t('cart_empty').toUpperCase()}</Title>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
