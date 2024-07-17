import React from "react";
import { View, Text, SafeAreaView, Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { StackNav } from './src/navigators/StackNav';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';

export default function App() {
  const label = 1;
 
  return  (
    <SafeAreaView style={{flex:1}}>
      <Provider store={store}>
        <NavigationContainer>
            <StackNav/>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}
