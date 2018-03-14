/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Statistics from './Statistics.js';
import EnterReceipt from './EnterReceipt.js';
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


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageWelcomeContainer}>
          <Image style={styles.imageWelcome}
            source={require('./Images/frontscreen.png')} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight onPress={ () => this.props.navigation.navigate('Receipt')} style={styles.buttonEnterReceipt}>
            <Text style={styles.buttonText}>Enter Receipt</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ () => this.props.navigation.navigate('Receipt')} style={styles.buttonEnterReceipt}>
            <Text style={styles.buttonText}>See Receipts</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ () => this.props.navigation.navigate('Stats')} style={styles.buttonEnterReceipt}>
            <Text style={styles.buttonText}>See Statistics</Text>
          </TouchableHighlight>
        </View>
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
  buttonContainer: {
    flex: 1,
  },
  imageWelcome: {
    width: win.width,
    height: 200,
  },
  buttonEnterReceipt: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: "#abbaba",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
  },
});

