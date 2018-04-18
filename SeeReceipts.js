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
  Alert,
  Button, 
  ListView,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { realm, itemSchema, receiptSchema, budgetItem, budgetSchema } from './EnterReceipt.js';

export default class SeeReceipts extends React.Component {
  static navigationOptions = {
    title: "See Receipts"
  };

  constructor(props) {
    super(props);
    let receipts = [];
    this.state = {
        receiptData : [],
    };
    realm.open({schema: [itemSchema, receiptSchema, budgetItem, budgetSchema]})
        .then(r => {
            let data = r.objects('Receipt');
            
            this.setState( {
                receiptData: data
            });
            console.log(this.state.receiptData);
            this.forceUpdate();
        });
    
  }

  viewReceipt = (item) => {
    this.props.navigation.navigate('ReceiptView',{receiptItems: item.items, store: item.store});
  }

  aggregatePrices=(items) => {
    var totalPrice = 0;
    items.forEach(element => {
      totalPrice += element.price * element.quantity;
    });
    return totalPrice;
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headLine}>See receipts!</Text>
        <FlatList 
          data={this.state.receiptData}
          keyExtractor={this._keyExtractor}
          renderItem={({item,i}) =>
          <View style={styles.sameLineContainer}>
            <TouchableHighlight onPress={ () => this.viewReceipt(item)}>  
              <View style={styles.sameColumn}>
                <View style={styles.sameRow}>
                  <Text>{item.date}</Text>
                  <Text>{item.store}</Text>
                </View>
                <View style={styles.priceView}>
                  <Text style={styles.price}>{this.aggregatePrices(item.items)} kr.</Text>
                </View>
              </View>
            </TouchableHighlight>
          </View>
          }
        /> 
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
  headLine: {
    fontSize: 26,
    marginBottom: 10
  },
  sameLineContainer: {
    flexDirection: 'column',
    marginBottom: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: win.width-10,
    height: 50,
  },
  priceView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: win.width/2 - 10
  },
  price: {
    fontSize: 18,
  },
  sameColumn: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sameRow: {
    flexDirection: 'column',
    paddingRight: 10,
    justifyContent: 'flex-start',
    width: win.width/2 - 10
  },
  imageWelcomeContainer: {
    flex: 1,
  },
});

