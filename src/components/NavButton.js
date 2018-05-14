import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text} from 'react-native';
import colors from 'theme/colors';
import {isRTL} from 'utils/locale';
import Touchable from 'react-native-platform-touchable';

export default class NavButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const {style, text, icon, onPress} = this.props;

    return (
      <Touchable
        underlayColor="transparent"
        onPress={onPress}
        style={[styles.container, style]}>
        {icon ? icon : <Text style={[styles.title, textStyle]}>{text}</Text>}
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    color: colors.white,
    paddingHorizontal: isRTL ? 15 : 10,
  },
});
