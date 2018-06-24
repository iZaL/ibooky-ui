/**
 * @flow
 */
import React, {Component} from 'react';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import {DrawerSection} from 'react-native-paper';

export default class Drawer extends Component {

  onItemPress = (routeName: string) => {
    this.setState({
      activeRoute: routeName,
    });
    this.props.navigation.navigate(routeName);
  };

  state = {
    activeRoute: 'HomeStack',
  };

  render() {
    let {logout, isAuthenticated} = this.props.screenProps;
    let {activeRoute} = this.state;

    return (
      <DrawerSection style={{paddingTop: 30}}>
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
          label={I18n.t('favorites')}
          routeName="FavoritesStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'heart', type: 'MaterialCommunityIcons'}}
          active={activeRoute === 'FavoritesStack'}
        />


        <DrawerItem
          label={I18n.t('past_orders')}
          routeName="PastOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'timelapse', type: 'MaterialIcons'}}
          active={activeRoute === 'PastOrdersStack'}
        />

        <DrawerItem
          label={I18n.t('change_language')}
          routeName="LanguageSelect"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'md-globe',
            type: 'Ionicons',
          }}
          active={this.state.activeRoute === 'LanguageSelect'}
        />

        {isAuthenticated ? (
          <DrawerItem
            label={I18n.t('logout')}
            routeName="Logout"
            onItemPress={logout}
            iconProps={{
              name: 'logout',
              type: 'MaterialCommunityIcons',
            }}
            active={activeRoute === 'Logout'}
          />
        ) : (
          <DrawerItem
            label={I18n.t('login')}
            routeName="Login"
            onItemPress={this.onItemPress}
            iconProps={{
              name: 'login',
              type: 'MaterialCommunityIcons',
            }}
            active={activeRoute === 'Login'}
          />
        )}
      </DrawerSection>
    );
  }
}
