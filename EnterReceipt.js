import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, TextInput, Dimensions, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class EnterReceipt extends React.Component {
  static navigationOptions = {
    title: "Enter Receipt"
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.imageLogo} source={require('./Images/frontscreen.png')}>
          </Image>
        </View>
        <View style={styles.fieldView}>
          <View style={styles.sameLineInput}>
            <Text> Store </Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput> 
          </View>
          <View style={styles.sameLineInput}>
            <Text> Date</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput> 
          </View>
          <View style={styles.horiLine}>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <View style={styles.sameLineInput}>
            <Text>Item</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>Kr.</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
            <Text>pcs.</Text>
          </View>
          <TouchableHighlight style={styles.buttons}>
            <Text>Done</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 0,
    backgroundColor: '#ababab',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  imgContainer: {
    flex: 1,
  },
  imageLogo: {
    width: win.width,
    height: 200,
    resizeMode: 'stretch'
  },
  inputText: {
    flex: 0,
    width: 90,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 4,
    marginRight: 4,
  },
  inputMoney:{
    width: 40,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 4,
    marginRight: 4
  },
  fieldView: {
    flexDirection: 'column',
  },
  sameLineInput: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  horiLine: {
    borderColor: 'gray',
    borderBottomWidth: 2,
    marginTop: 5,
    marginBottom: 10
  }
});

