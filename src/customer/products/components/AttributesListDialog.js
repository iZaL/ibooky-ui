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

type Props = {
  visible: boolean,
  close: Function,
};

type State = {
  checked: number,
};

export default class extends Component {

  state = {
    checked: 0,
  };

  static propTypes = {
    visible: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    onItemPress:PropTypes.func.isRequired,
    activeIDs:PropTypes.array.isRequired
  };

  render() {
    const {visible, close, save, onItemPress, items, activeIDs} = this.props;
    return (
      <Dialog onDismiss={close} visible={visible}>
        <DialogTitle>Choose an option</DialogTitle>
        <DialogScrollArea style={{maxHeight: 170, paddingHorizontal: 0}}>
          <ScrollView>
            <View>
              {
                items.map((item,i) => {
                  let activeItem = activeIDs[item.parent_id];
                  return (
                    <TouchableRipple onPress={() => onItemPress(item)} key={i}>
                      <View style={styles.row}>
                        <View pointerEvents="none">
                          <RadioButton value="normal" checked={activeItem ? activeItem.includes(item.id) : false}/>
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
          <Button primary onPress={close}>
            Cancel
          </Button>
          <Button primary onPress={save}>
            Ok
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
