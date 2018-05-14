/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, Subheading} from 'react-native-paper';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class extends Component {
  static propTypes = {
    total: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.total !== this.props.total;
  }

  render() {
    let {total} = this.props;

    return (
      <View style={styles.container}>
        <Subheading style={{flex: 1, color: colors.primary, fontSize: 17}}>
          {I18n.t('total')}
        </Subheading>
        <Caption
          style={{color: colors.primary, fontWeight: '500', fontSize: 17}}>
          {total} KD
        </Caption>
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
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.darkGrey,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});
