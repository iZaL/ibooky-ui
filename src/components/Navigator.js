import React, {Component} from 'react';
import NavigatorService from 'components/NavigatorService';
import {createSwitchNavigator} from 'react-navigation';
import {Router as GuestRouter} from 'guest/components/Router';
import {Router as CustomerRouter} from 'customer/components/Router';

export default class Navigator extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isAuthenticated !== nextProps.isAuthenticated ||
      this.props.userType !== nextProps.userType
    );
  }

  resolveScreenForUser = userType => {
    switch (userType) {
      case 10:
        return 'Driver';
      case 100:
        return 'Admin';
      default:
        return 'Customer';
    }
  };

  render() {
    let {isAuthenticated, userType, logout} = this.props;
    const screen = this.resolveScreenForUser(userType);

    const AppNavigator = createSwitchNavigator(
      {
        Guest: {screen: GuestRouter},
        // Admin: {screen: AdminRouter},
        // Driver: {screen: DriverRouter},
        Customer: {screen: CustomerRouter},
      },
      {
        headerMode: 'none',
        initialRouteName: isAuthenticated ? screen : 'Customer',
      },
    );

    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{isAuthenticated, logout}}
      />
    );
  }
}
