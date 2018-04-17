import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Divider as PaperDivider} from 'react-native-paper';

class Divider extends Component {
  shouldComponentUpdate() {
    return false;
  }

  static propTyes = {
    style: PropTypes.style,
  };

  render() {
    let {style, inset} = this.props;
    return <PaperDivider style={[style]} inset={inset} />;
  }
}

export default Divider;
