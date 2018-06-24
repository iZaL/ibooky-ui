/**
 * @flow
 */
import React, {Component} from 'react';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import {DrawerSection} from 'react-native-paper';
import DrawerHeader from 'components/DrawerHeader';

export default class Drawer extends Component {
  state = {
    activeRoute: 'HomeStack',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activeRoute !== nextState.activeRoute;
  }

  onItemPress = (routeName: string) => {
    this.setState({
      activeRoute: routeName,
    });
    this.props.navigation.navigate(routeName);
  };

  logout = () => {
    this.props.screenProps.logout();
  };

  render() {
    let {logout, user} = this.props.screenProps;
    let {activeRoute} = this.state;

    return (
      <DrawerSection>
        <DrawerHeader user={user} />

        <DrawerItem
          label={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'home-outline',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'HomeStack'}
        />

        <DrawerItem
          label={I18n.t('qr_code_scan')}
          routeName="QRScan"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'qrcode',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'QRScan'}
        />

        <DrawerItem
          label={I18n.t('orders')}
          routeName="OrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'back-in-time', type: 'Entypo'}}
          active={activeRoute === 'OrdersStack'}
        />

        <DrawerItem
          label={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          iconProps={{name: 'logout', type: 'MaterialCommunityIcons'}}
          active={activeRoute === 'Logout'}
        />
      </DrawerSection>
    );
  }
}
