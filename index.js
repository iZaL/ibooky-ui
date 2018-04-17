import React from 'react';
import {AppRegistry, View} from 'react-native';
import Store from './src/utils/store';
import App from './src/app/App';
import {Provider} from 'react-redux';

console.disableYellowBox = true;

const Root = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={Store}>
        <App/>
      </Provider>
    </View>
  );
};


AppRegistry.registerComponent('ibooky', () => Root);
