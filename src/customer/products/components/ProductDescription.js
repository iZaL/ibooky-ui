/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import {DialogContent, Paper, Paragraph} from 'react-native-paper';

export default class extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    activeID: null,
  };

  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    let {text} = this.props;

    return <Text style={styles.text}>{text}</Text>;
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign:'left'
  },
});
