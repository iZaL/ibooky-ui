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
import colors from "assets/theme/colors";

export default class extends Component {

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.shape({
      children:PropTypes.func.isRequired
    }),
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    onItemPress:PropTypes.func.isRequired,
    activeIDs:PropTypes.object.isRequired
  };

  render() {
    const {visible, close, save, onItemPress, item, activeIDs} = this.props;
    console.log('item',item);
    return (
      <Dialog onDismiss={close} visible={visible}>
        <DialogTitle>{`${I18n.t('select')} `}</DialogTitle>
        <DialogScrollArea style={{maxHeight: 170, paddingHorizontal: 0}}>
          <ScrollView>
            <View>
              {
                item.children.map((item,i) => {
                  let activeItem = activeIDs[item.parent_id];
                  return (
                    <TouchableRipple onPress={() => onItemPress(item)} key={i}>
                      <View style={styles.row}>
                        <View pointerEvents="none">
                          <RadioButton value="normal" checked={activeItem ? activeItem.child_id === item.id : false}/>
                        </View>
                        <Subheading style={styles.text}>{item.name}</Subheading>
                      </View>
                    </TouchableRipple>
                  )
                })
              }
            </View>
          </ScrollView>
        </DialogScrollArea>
        <DialogActions>
          <Button primary onPress={close} color={colors.mediumGrey}>
            {I18n.t('cancel')}
          </Button>
          <Button primary onPress={save}>
            {I18n.t('confirm')}
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
