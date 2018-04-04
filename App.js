/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HomeScreen from './HomeScreen.js';
import Statistics from './Statistics.js';
import EnterReceipt from './EnterReceipt.js';
import EnterCategories from './EnterCategories.js';
import SeeReceipts from './SeeReceipts.js';
import { StackNavigator } from 'react-navigation';


export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const RootStack = StackNavigator({
  Home: { screen: HomeScreen },
  Receipt: { screen: EnterReceipt },
  Categories: { screen: EnterCategories },
  SeeReceipts: { screen: SeeReceipts },
  Stats: { screen: Statistics },
}, 
{
  initialRouteName: 'Home'
});
