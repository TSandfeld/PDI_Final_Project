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
import { realm, itemSchema, receiptSchema } from './EnterReceipt.js';

export default class SeeReceipts extends React.Component {
  static navigationOptions = {
    title: "Receipt View"
  };

  constructor(props) {
    super(props);
    let receipts = [];
    this.state = {
        items : this.props.navigation.state.params.receiptItems,
        store : this.props.navigation.state.params.store,
    };
    
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headLine}>{this.state.store}</Text>
        <FlatList data={this.state.items}
          renderItem={({item}) =>
          
          <View style={styles.sameLineContainer}>  
            <View style={styles.alignLeft} >        
                <Text style={styles.item}>{item.name}</Text>
            </View>
            <View style={styles.alignCenter} >        
                <Text style={styles.item}>{item.price} kr. pr. item</Text>
            </View>
            <View style={styles.alignRight} >        
                <Text style={styles.item}>{item.quantity} pcs.</Text>
            </View>
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
  sameLineContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    width: win.width-10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    
  },
  headLine: {
    fontSize: 26,
    marginBottom: 10
  },
  item: {
      height: 20,
      marginLeft: 4,
      marginRight: 4,
      fontSize: 16,
  },
  alignLeft: {
      alignItems: 'flex-start',
      width: win.width/3-10,
      justifyContent: 'center'
    
  },
  alignCenter: {
      alignItems: 'center',
      width: win.width/3-10,
      justifyContent: 'center'
  },
  alignRight: {
      alignItems: 'flex-end',
      width: win.width/3-10,
      justifyContent: 'center'
  },
  imageWelcomeContainer: {
    flex: 1,
  },
});

