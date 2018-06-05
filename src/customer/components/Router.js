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
import Checkout from 'customer/cart/Checkout';
import Payment from 'customer/cart/Payment';
import PastOrdersScene from 'customer/orders/PastOrdersScene';
import OrderDetailScene from 'customer/orders/OrderDetailScene';

const getDrawerIcon = navigation => {
  return {
    headerLeft: <DrawerIcon onPress={() => navigation.openDrawer()} />,
  };
};

const navOptions = {
  gesturesEnabled: false,
  headerTintColor: colors.primary,
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
  },
};

const cardStyle = {
  cardStyle: {
    backgroundColor: colors.lightGrey,
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
      // navigationOptions: ({navigation}) => ({
        // ...getDrawerIcon(navigation),
        //   headerRight: (
        //     <NavButton
        //       icon={
        //         <IconFactory type="MaterialCommunityIcons" name="cart-outline" color="white" size={26}/>
        //       }
        //       onPress={() => navigation.navigate('Cart')}
        //     />
        //   ),
      // }),
    },
    ProductDetail: {
      screen: ProductDetail,
      // navigationOptions:({navigation})=>({
      //   headerTitle:'Product'
      // })
    },
    Cart: {
      screen: Cart,
    },
    Checkout: {
      screen: Checkout,
    },
    Payment: {
      screen: Payment,
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
    // initialRouteName: 'Payment',
  },
);

const PastOrdersStack = createStackNavigator(
  {
    PastOrders: {
      screen: PastOrdersScene,
      navigationOptions: ({navigation}) => {
        return {
          ...getDrawerIcon(navigation),
          title: I18n.t('past_orders'),
        };
      },
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navOptions,
    }),
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
  PastOrdersStack: {
    screen: PastOrdersStack,
  },
  SettingStack: {
    screen: SettingStack,
  },
  AuthStack: {
    screen: AuthStack,
  },
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  // initialRouteName: 'PastOrdersStack',
});
