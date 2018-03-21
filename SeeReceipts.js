/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { RootStack } from './App.js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button, 
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { realm, itemSchema, receiptSchema } from './EnterReceipt.js';

export default class SeeReceipts extends React.Component {
  static navigationOptions = {
    title: "See Receipts"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>See receipts!</Text>
      </View>
    );
  }
}

const win = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageWelcomeContainer: {
    flex: 1,
  },
});

