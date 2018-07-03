import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {Subheading} from "react-native-paper";

class Page extends Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     headerTitle: <Text style={{color: 'black'}}>{navigation.getParam('page')}</Text>,
  //   };
  // };

  componentDidMount() {
    this.props.dispatch(CUSTOMER_ACTIONS.fetchPage({
      page:this.props.navigation.state.routeName
    }));
  }

  render() {
    let {page} = this.props;
    console.log('page',page);
    if(page) {
      return (
        <ScrollView style={{flex: 1,padding:10}}>
          <Subheading>{page.description}</Subheading>
        </ScrollView>
      );
    }
    return null;
  }
}

function mapStateToProps(state,props) {
  return {
    page:CUSTOMER_SELECTORS.getPage(state,props.navigation.state.routeName)
  };
}

export default connect(mapStateToProps)(Page);
