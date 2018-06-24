import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Drawer from 'company/components/Drawer';
import Home from 'company/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';
import OrderDetailScene from 'company/orders/OrderDetailScene';
import QRScan from 'company/orders/QRScan';
import OrdersScene from 'company/orders/OrdersScene';
import SettingsScene from 'company/SettingsScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

const getDrawerIcon = navigation => {
  return {
    headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
  };
};

const navStyle = {
  headerTintColor: colors.primary,
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
  },
};

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('admin_home'),
        ...getDrawerIcon(navigation),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'TrackDetail',
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const OrdersStack = createStackNavigator(
  {
    Orders: {
      screen: OrdersScene,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('orders'),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScene,
      navigationOptions: ({navigation}) => getDrawerIcon(navigation),
    },
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);
const QRScanStack = createStackNavigator(
  {
    QRScan: {
      screen: QRScan,
      navigationOptions: ({navigation}) => getDrawerIcon(navigation),
    },
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const DrawerRoutes = {
  HomeStack: {screen: HomeStack},
  OrdersStack: {screen: OrdersStack},
  SettingsStack: {screen: SettingsStack},
  QRScanStack: {screen: QRScanStack},
  Login: {screen: Login},
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  // initialRouteName:'QRScanStack'
});
