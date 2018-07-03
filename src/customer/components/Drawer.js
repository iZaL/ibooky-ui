/**
 * @flow
 */
import React, {Component} from 'react';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import {DrawerSection} from 'react-native-paper';
import DrawerHeader from 'components/DrawerHeader';
import {View} from "react-native";

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

  render() {
    let {logout, user} = this.props.screenProps;
    let {activeRoute} = this.state;

    return (
      <View>
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
          label={I18n.t('search')}
          routeName="SearchStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'search', type: 'MaterialIcons'}}
          active={activeRoute === 'SearchStack'}
        />

        <DrawerItem
          label={I18n.t('favorites')}
          routeName="FavoritesStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'heart', type: 'MaterialCommunityIcons'}}
          active={activeRoute === 'FavoritesStack'}
        />

        <DrawerItem
          label={I18n.t('orders')}
          routeName="OrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'timelapse', type: 'MaterialIcons'}}
          active={activeRoute === 'OrdersStack'}
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

        {user.id ? (
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

        <DrawerSection>
          <DrawerItem
            label={I18n.t('privacy_policy')}
            routeName="Privacy"
            onItemPress={this.onItemPress}
            iconProps={{
              name: 'screen-lock-portrait',
              type: 'MaterialIcons',
            }}
            active={activeRoute === 'Privacy'}
          />
          <DrawerItem
            label={I18n.t('delivery_policy')}
            routeName="Delivery"
            onItemPress={this.onItemPress}
            iconProps={{
              name: 'ios-jet',
              type: 'Ionicons',
            }}
            active={activeRoute === 'Delivery'}
          />
        </DrawerSection>

      </View>
    );
  }
}
