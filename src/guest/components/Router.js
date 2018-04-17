import React from 'react';
import {StackNavigator} from 'react-navigation';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import colors from 'assets/theme/colors';

export const Router = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Forgot: {
      screen: Forgot,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
    }),
  },
);
