import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Button as PaperButton} from 'react-native-paper';
import colors from 'assets/theme/colors';

export default class extends Component {
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
    const {style, title, titleStyle, ...rest} = this.props;
    return (
      <PaperButton style={[styles.button, style]} {...rest}>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </PaperButton>
    );
  }
}

const styles = StyleSheet.create({
  button: {},
});
