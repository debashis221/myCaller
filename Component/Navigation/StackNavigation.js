// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Chat from '../Users';
import ChatUI from '../ChatUi';
import ViewDp from '../ViewDp';





const Stack = createStackNavigator();
function MainStack() {
  return (

      <Stack.Navigator   screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="ViewUser" component={Chat} />
        <Stack.Screen name="UserChat" component={ChatUI} />
        <Stack.Screen name="ViewDp" component={ViewDp} />
      

      </Stack.Navigator>

  );
}

export default MainStack;