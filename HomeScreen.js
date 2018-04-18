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
  Alert,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ProgressCircle }  from 'react-native-svg-charts';
import { realm, itemSchema, receiptSchema, budgetItem, budgetSchema } from './EnterReceipt.js';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    let receipts = [];
    this.state = {
        receiptData: null,
        budgetData: null,
        totalSpent: 0,
        budget: 0,
        percentageSpent: 0,
        progressColor: 'lightblue',
        textColor: 'green'
    };

    this.openRealm();
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (val) => {
      this.openRealm();
    })
  }

  openRealm() {
    realm.open({schema: [itemSchema, receiptSchema, budgetItem, budgetSchema]})
        .then(r => {
            let data = r.objects('Receipt');
            let budget = r.objects('Budget');
            console.log(data[0]);
            
            this.setState( {
                receiptData: data,
                budgetData: budget
            });

            this.retrieveData();
        });
  }

  retrieveData() {
    let receipts = this.state.receiptData;
    let sum = 0;
    receipts.forEach(element => {
        let list = element.items;
        list.forEach(item => {
            let totalPrice = item.price * item.quantity;
            sum += totalPrice;
        });
    });

    let budgetSum = 0;
    let budgetItems = this.state.budgetData;
    let dict = {};
    budgetItems.forEach(element => {
      element.budgetItems.forEach(elem => {
        dict[elem.category] = elem.budget;
      })
    });
    Object.values(dict).forEach(e => {
      budgetSum += e;
    })
    this.setState({budget: budgetSum});
    
    this.setState({totalSpent: sum});
    if(this.state.totalSpent > this.state.budget) {
      this.setState({progressColor: 'red', textColor: 'red'})
    } else {
      this.setState({progressColor: 'lightblue', textColor: 'green'})

    }
    this.forceUpdate();

  }


  render() {
    
    return (
      
      <View style={styles.container}>
        
        <View style={styles.progressContainer}>
          <ProgressCircle
                style={ { height: 200 } }
                progress={ (this.state.totalSpent/this.state.budget) }
                progressColor={this.state.progressColor}/>
            <View style={styles.totalspent}> 
              <Text style={[styles.moneyText, {color: this.state.textColor}]}> Spent: {this.state.totalSpent} kr. </Text>
              <Text style={styles.budgetText}> Budget: {this.state.budget} kr. </Text> 
            </View>

        </View>
        <View style={styles.buttonContainer}>
        
          <TouchableHighlight onPress={ () => this.props.navigation.navigate('Receipt')} style={styles.buttonEnterReceipt}>
            <Text style={styles.buttonText}>Enter Receipt</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={ () => this.props.navigation.navigate('SeeReceipts')} style={styles.buttonEnterReceipt}>
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
  progressContainer: {
    flex: 0,
    width: win.width,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  imageWelcome: {
    width: win.width,
    height: 200,
  },
  totalspent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: win.width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moneyText: {
    fontSize: 18,
  },
  budgetText: {
    fontSize: 18,
    marginTop: 20,
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

