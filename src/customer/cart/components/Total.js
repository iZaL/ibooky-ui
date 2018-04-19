/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, Subheading} from "react-native-paper";
import I18n from 'utils/locale';
import colors from "assets/theme/colors";

export default class extends Component {

  static propTypes = {
    amount: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.amount !== this.props.amount;
  }

  render() {
    let {amount} = this.props;

    return (

      <View style={styles.container}>
        <Subheading style={{flex: 1}}>{I18n.t('total')}</Subheading>

        <View style={styles.selectBox}>
          <Caption style={{color:colors.darkGrey}}>{amount}</Caption>
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
    paddingVertical: 10
  },
  selectBox: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth: .5,
    borderColor: colors.darkGrey,
    paddingHorizontal: 5,
    borderRadius: 5
  }
});
