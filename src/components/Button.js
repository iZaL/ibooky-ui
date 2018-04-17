import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Button as PaperButton} from 'react-native-paper';

export default class Button extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.title !== this.props.title
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const {style, title, titleStyle, disabled, ...rest} = this.props;
    return (
      <PaperButton
        {...rest}
        disabled={disabled}
        style={[styles.button, style, disabled && {opacity: 0.4}]}
        raised
        primary>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </PaperButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
  },
  buttonText: {},
});
