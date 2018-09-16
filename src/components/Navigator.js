import React, {Component} from 'react';
import NavigatorService from 'components/NavigatorService';
import {createStackNavigator} from 'react-navigation';
import {Router as GuestRouter} from 'guest/components/Router';
import {Router as CustomerRouter} from 'customer/components/Router';
import {Router as CompanyRouter} from 'company/components/Router';
import {Platform} from 'react-native';
import Login from "../guest/Login";

export default class Navigator extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.user.id !== nextProps.user.id;
  }

  resolveScreenForUser = userType => {
    switch (userType) {
      case 10:
        return 'Company';
      case 100:
        return 'Admin';
      default:
        return 'Customer';
    }
  };

  render() {
    let {user, logout} = this.props;

    const AppNavigator = createStackNavigator(
      {
        Guest: {screen: GuestRouter},
        Customer: {
          screen: CustomerRouter,
        },
        Company: {screen: CompanyRouter},
      },
      {
        headerMode: 'none',
        initialRouteName: user.id
          ? this.resolveScreenForUser(user.type)
          : 'Customer',
      },
    );

    const prefix = Platform.OS === 'android' ? 'hungryr://hungryr/' : 'hungryr://';

    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{user, logout}}
        uriPrefix={prefix}
      />
    );
  }
}
