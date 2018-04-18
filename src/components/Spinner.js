import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import colors from '../assets/theme/colors';

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
    size: 30,
    type: 'Bounce',
  };

  render() {
    const {isVisible, color, size, type} = this.props;
    return (
      <Spinner isVisible={isVisible} size={size} type={type} color={color} />
    );
  }
}
