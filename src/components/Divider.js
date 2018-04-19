import React, {Component} from 'react';
import {Divider as PaperDivider} from 'react-native-paper';

class Divider extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {style, inset} = this.props;
    return <PaperDivider style={[{marginVertical:10},style]} inset={inset} />;
  }
}

export default Divider;
