import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import TotalsScreen from '../pages/Totals'
import WorldScreen from '../pages/World'
import PlotsScreen from '../pages/Plots'
import MapScreen from '../pages/Map'
import USScreen from '../pages/US'

const Navigator = createBottomTabNavigator();

const TotalsStack = createStackNavigator();
const WorldStack = createStackNavigator();
const PlotsStack = createStackNavigator();
const MapStack = createStackNavigator();
const USStack = createStackNavigator();

const TotalsStackScreen = () => (
  <TotalsStack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#222327',
      },
      headerStatusBarHeigh: 1000,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
    {StatusBar.setBarStyle('light-content', true)}
    <TotalsStack.Screen name="Totals" component={TotalsScreen}/>
  </TotalsStack.Navigator>
)

const WorldStackScreen = () => (
  <WorldStack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#222327',
      },
      headerStatusBarHeigh: 1000,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
    {StatusBar.setBarStyle('light-content', true)}
    <WorldStack.Screen name="World" component={WorldScreen}/>
  </WorldStack.Navigator>
)

const PlotsStackScreen = () => (
  <PlotsStack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#222327',
      },
      headerStatusBarHeigh: 1000,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
    {StatusBar.setBarStyle('light-content', true)}
    <PlotsStack.Screen name="Plots" component={PlotsScreen}/>
  </PlotsStack.Navigator>
)

const MapStackScreen = () => (
  <MapStack.Navigator screenOptions={{
      headerShown: false
    }}>
    {StatusBar.setBarStyle('light-content', true)}
    <MapStack.Screen name="Map" component={MapScreen}/>
  </MapStack.Navigator>
)

const USStackScreen = () => (
  <USStack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: '#222327',
      },
      headerStatusBarHeigh: 1000,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
    {StatusBar.setBarStyle('light-content', true)}
    <USStack.Screen name="US" component={USScreen}/>
  </USStack.Navigator>
)

export default function HomeStackNavigator() {
  return (
    <Navigator.Navigator
      tabBarOptions={{
        // activeBackgroundColor: '#FFFAFA',
        activeBackgroundColor: '#222327',
        inactiveBackgroundColor: '#222327',
        // inactiveBackgroundColor: '#FFFAFA',
        activeTintColor: "white",
      }}>
      <Navigator.Screen name="Totals" options={{tabBarIcon: props => (<AntDesign name="home" size={props.size} color={props.color}/>)}} component={TotalsStackScreen}/>
      <Navigator.Screen name="World" options={{tabBarIcon: props => (<Fontisto name="world" size={props.size} color={props.color}/>)}} component={WorldStackScreen}/>
      <Navigator.Screen name="Plots" options={{tabBarIcon: props => (<Foundation name="results-demographics" size={props.size} color={props.color}/>)}} component={PlotsStackScreen}/>
      <Navigator.Screen name="Map" options={{tabBarIcon: props => (<FontAwesome5 name="map" size={props.size} color={props.color}/>)}} component={MapStackScreen}/>
      <Navigator.Screen name="US" options={{tabBarIcon: props => (<FontAwesome5 name="flag-usa" size={props.size} color={props.color}/>)}} component={USStackScreen}/>
    </Navigator.Navigator>
  )
}
