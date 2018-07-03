/* @flow */
import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Subheading,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogScrollArea,
  RadioButton,
  TouchableRipple,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import I18n from 'utils/locale';

export default class extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.array,
    save: PropTypes.func.isRequired,
    onItemPress: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
  };

  render() {
    const {visible, save, onItemPress, items, selected} = this.props;

    return (
      <Dialog visible={visible}>
        <DialogTitle style={{textAlign:'left'}}>{`${I18n.t('select')} ${I18n.t(
          'quantity',
        )} `}</DialogTitle>
        <DialogScrollArea style={{maxHeight: 170, paddingHorizontal: 0}}>
          <ScrollView>
            <View>
              {items.map((item, i) => (
                <TouchableRipple onPress={() => onItemPress(item)} key={i}>
                  <View style={styles.row}>
                    <View pointerEvents="none">
                      <RadioButton value="normal" checked={selected === item} />
                    </View>
                    <Subheading style={styles.text}>{item}</Subheading>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </ScrollView>
        </DialogScrollArea>
        <DialogActions>
          <Button primary onPress={save}>
            {I18n.t('ok')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
});
