import React from 'react';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import StackNavigator from './js/navigation/StackNavigator'

const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Render/>
    );
  }
}

const Render = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator>
        <RootStack.Screen name={'DefaultStack'} component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
