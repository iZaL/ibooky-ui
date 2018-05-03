import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';

import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import DrawerIcon from 'components/DrawerIcon';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Settings from 'customer/Settings';
import ProductDetail from 'customer/products/ProductDetail';
import Cart from 'customer/cart/Cart';

const getDrawerIcon = navigation => {
  return {
    headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
  };
};

const navOptions = {
  gesturesEnabled: false,
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },
};

const cardStyle = {
  cardStyle: {
    backgroundColor: colors.white,
  },
};

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
      }),
    },
    Register: {
      screen: Register,
    },
    Forgot: {
      screen: Forgot,
    },
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('app_name'),
      }),
    },
    ProductDetail: {
      screen: ProductDetail,
    },
    Cart:{
      screen:Cart
    }
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
    initialRouteName:'Cart'
  },
);

const SettingStack = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('settings'),
        ...getDrawerIcon(navigation),
      }),
    },
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
  },
);

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  SettingStack: {
    screen: SettingStack,
  },
  AuthStack: {
    screen: AuthStack,
  },
};

export const Router = createDrawerNavigator(
  DrawerRoutes,
  {
    gesturesEnabled: false,
    contentComponent: props => <Drawer {...props} />,
    drawerWidth: 275,
  },
  {
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
    }),
  },
);
