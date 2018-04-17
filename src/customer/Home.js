import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class Home extends Component {
  static propTypes = {};

  static defaultProps = {};

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'center', fontSize: 40}}>Home</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Home);
