import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import colors from '../assets/theme/colors';
import {View, StyleSheet, Dimensions} from 'react-native';

export default class extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.isVisible !== this.props.isVisible;
  }

  static propTypes = {
    isVisible: PropTypes.bool,
    size: PropTypes.number,
    type: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    isVisible: false,
    color: colors.primary,
    size: 60,
    type: 'Bounce',
  };

  render() {
    const {isVisible, color, size, type} = this.props;
    return (
      <View style={styles.container}>
        <Spinner isVisible={isVisible} size={size} type={type} color={color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 90,
    right: Dimensions.get('window').width / 2 - 30,
    zIndex: 100000,
  },
});
