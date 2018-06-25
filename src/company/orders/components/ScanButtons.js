import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'components/Button';
import I18n from 'utils/locale';
import Dialog from 'components/Dialog';

export default class ScanButtons extends Component {
  static propTypes = {
    rescan: PropTypes.func.isRequired,
    redeem: PropTypes.func.isRequired,
  };

  render() {
    let {redeem, rescan, canRedeem, canRescan} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title={I18n.t('redeem')}
            onPress={redeem}
            raised
            primary
            dark
            disabled={!canRedeem}
          />
          <Button
            title={I18n.t('rescan')}
            onPress={rescan}
            raised
            primary
            dark
            disabled={!canRescan}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  map: {
    flex: 1,
  },
  mapMarker: {},
  image: {
    width: 20,
    height: 40,
  },
  navContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  address: {
    flex: 1,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});
