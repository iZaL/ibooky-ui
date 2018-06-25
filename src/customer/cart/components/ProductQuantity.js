/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, Subheading} from 'react-native-paper';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import IconFactory from 'components/IconFactory';
import Touchable from 'react-native-platform-touchable';
import QuantityDialog from 'customer/cart/components/QuantityDialog';

export default class extends Component {
  static propTypes = {
    selected: PropTypes.number,
    onPress: PropTypes.func.isRequired,
  };

  state = {
    quantityDialogVisible: false,
  };

  shouldComponentUpdate(nextProps, prevState) {
    return (
      nextProps.selected !== this.props.selected ||
      prevState.quantityDialogVisible !== this.state.quantityDialogVisible
    );
  }

  showQuantityDialog = () => {
    this.setState({
      quantityDialogVisible: true,
    });
  };

  hideQuantityDialog = () => {
    this.setState({
      quantityDialogVisible: false,
    });
  };

  onQuantityDialogSavePress = () => {
    this.hideQuantityDialog();
  };

  onQuantityDialogItemPress = (quantity: number) => {
    this.props.onPress(quantity);
  };

  render() {
    let {selected} = this.props;
    let {quantityDialogVisible} = this.state;

    return (
      <View style={styles.container}>
        <Subheading style={{flex: 1}}>{I18n.t('quantity')}</Subheading>

        <Touchable onPress={this.showQuantityDialog}>
          <View style={styles.selectBox}>
            <Caption style={{color: colors.darkGrey}}>{selected}</Caption>
            <IconFactory type="MaterialIcons" name="arrow-drop-down" />
          </View>
        </Touchable>

        <QuantityDialog
          visible={quantityDialogVisible}
          save={this.onQuantityDialogSavePress}
          onItemPress={this.onQuantityDialogItemPress}
          selected={selected}
          items={[1, 2, 3, 4, 5]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
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
