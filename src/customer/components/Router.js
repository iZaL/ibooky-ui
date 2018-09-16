import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import {Platform} from 'react-native';
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
import OrdersScene from 'customer/orders/OrdersScene';
import OrderDetailScene from 'customer/orders/OrderDetailScene';
import LanguageSelect from 'app/LanguageSelect';
import Favorites from 'customer/products/Favorites';
import Search from 'customer/products/Search';
import Page from "customer/Page";

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
    // borderBottomWidth: 0,
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
    },
    ProductDetail: {
      screen: ProductDetail,
      path:'products/:productID'
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
    LanguageSelect: {
      screen: LanguageSelect,
    },
    Delivery: {
      screen: Page,
    },
    Privacy: {
      screen: Page,
    },
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
    // initialRouteName: 'Payment',
  },
);

const SearchStack = createStackNavigator(
  {
    Home: {
      screen: Search,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
    // initialRouteName: 'Payment',
  },
);
const FavoritesStack = createStackNavigator(
  {
    Home: {
      screen: Favorites,
    },
    ProductDetail: {
      screen: ProductDetail,
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
  },
  {
    navigationOptions: {
      ...navOptions,
    },
    ...cardStyle,
    // initialRouteName: 'Payment',
  },
);

const OrdersStack = createStackNavigator(
  {
    Orders: {
      screen: OrdersScene,
      navigationOptions: ({navigation}) => {
        return {
          ...getDrawerIcon(navigation),
          title: I18n.t('orders'),
        };
      },
      path:'orders',
    },
    OrderDetail: {
      screen: OrderDetailScene,
      path: 'products/:id',
    },
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      ...navOptions,
    }),
    ...cardStyle,
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
  OrdersStack: {
    screen: OrdersStack,
  },
  SettingStack: {
    screen: SettingStack,
    // path:'settings'
  },
  FavoritesStack: {
    screen: FavoritesStack,
  },
  SearchStack: {
    screen: SearchStack,
  },
  AuthStack: {
    screen: AuthStack,
  },
};

export const Router = createDrawerNavigator(DrawerRoutes, {
  contentComponent: props => <Drawer {...props}  />,
  drawerWidth: 275,
});
