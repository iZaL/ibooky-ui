/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Caption, Subheading} from "react-native-paper";
import I18n from 'utils/locale';
import colors from "../../../assets/theme/colors";
import IconFactory from "../../../components/IconFactory";

export default class extends Component {

  static propTypes = {
    selected: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.selected !== this.props.selected;
  }

  render() {
    let {selected} = this.props;

    return (

      <View style={styles.container}>
        <Subheading style={{flex: 1}}>{I18n.t('quantity')}</Subheading>

        <View style={styles.selectBox}>
          <Caption style={{color:colors.darkGrey}}>{selected}</Caption>
          <IconFactory type="MaterialIcons" name="arrow-drop-down"/>
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
    paddingTop: 10
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
