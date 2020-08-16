import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import WelcomeScreen from './WelcomeScreen';
import AuthScreen from './AuthScreen';
import MapScreen from './MapScreen';
import DeckScreen from './DeckScreen';
import ReviewScreen from './ReviewScreen';
import SettingScreen from './SettingScreen';

const MainNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen },
  auth: { screen: AuthScreen },
  main: {
    screen: createBottomTabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingScreen }
        })
      }
    })
  }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: false
    })
  });

export const AppNavigator = createAppContainer(MainNavigator)
