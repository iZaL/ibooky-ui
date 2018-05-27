import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Drawer from 'company/components/Drawer';
import Home from 'company/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';
import OrderDetailScene from 'company/orders/OrderDetailScene';
import PastOrdersScene from 'company/orders/PastOrdersScene';
import QRScan from 'company/orders/QRScan';
import UpcomingOrdersScene from 'company/orders/UpcomingOrdersScene';
import SettingsScene from 'company/SettingsScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Register from 'guest/Register';

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
    DriverAdd: {
      screen: Register,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('driver_add'),
      }),
    },
    UpcomingOrders: {
      screen: UpcomingOrdersScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('upcoming_orders'),
      }),
    },
  },
  {
    // initialRouteName:'TrackDetail',
    navigationOptions: ({navigation}) => ({
      ...navStyle,
    }),
  },
);

const PastOrdersStack = createStackNavigator(
  {
    PastOrders: {
      screen: PastOrdersScene,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('past_orders'),
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

const UpcomingOrdersStack = createStackNavigator(
  {
    UpcomingOrders: {
      screen: UpcomingOrdersScene,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('upcoming_orders'),
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
  PastOrdersStack: {screen: PastOrdersStack},
  UpcomingOrdersStack: {screen: UpcomingOrdersStack},
  SettingsStack: {screen: SettingsStack},
  QRScanStack: {screen: QRScanStack},
  Login: {screen: Login},
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  // initialRouteName:'QRScanStack'
});
