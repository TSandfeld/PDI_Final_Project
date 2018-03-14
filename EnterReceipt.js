import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Button,
  TouchableHighlight, 
  TextInput, 
  Dimensions, 
  Image,
  FlatList,
  Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ListItem } from 'react-native-elements';

const realm = require('realm');

const itemSchema = {
  name: 'Item',
  properties: {
    name: 'string',
    price: 'double',
    quantity: 'int',
  }
}

const receiptSchema = {
  name: 'Receipt',
  properties: {
    date: 'string',
    store: 'string',
    items: 'Item[]',
  }
}

var data = [{key: "0", name: "", price: 0.0, quantity: 0}, {key: "1", name: "", price: 0.0, quantity: 0}];

export default class EnterReceipt extends React.Component {
  static navigationOptions = {
    title: "Enter Receipt"
  };

  constructor(props) {
    super(props);
    this.state = { 
      items: [{key: "0"},{key: "1"}]
    };
  
  }

  addEntry=()=>{
    var index = this.state.items.length
    data.push(index.toString());
    console.log(this.state.items)
  }

  submitReceipt=()=>{

  }

  _onChange=(key, value)=>{
    var index = parseInt(key);
    data[index].name = value;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image style={styles.imageLogo} source={require('./Images/frontscreen.png')}>
          </Image>
        </View>

        <View style={styles.storeDateContainer}>
          <View style={styles.sameLineInput}>
            <Text> Store </Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput> 
          </View>
          <View style={styles.sameLineInput}>
            <Text> Date</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText}></TextInput> 
          </View>
          <View style={styles.sameLineInput}>
            <TouchableHighlight onPress={this.addEntry}>
              <Text> Add Item </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.items}
            renderItem={({item}) =>
                <View style={styles.sameLineInput}>
                  <Text>Item</Text>
                  <TextInput underlineColorAndroid='transparent' style={styles.inputText} 
                    onChangeText={ (text) => this._onChange(item.key, text)}></TextInput>
                  <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
                  <Text>Kr.</Text>
                  <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}></TextInput>
                  <Text>pcs.</Text>
                </View>
              }
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableHighlight style={styles.submitButton}>
            <Text> Submit </Text>
          </TouchableHighlight>
        </View>

        {/* <View style={styles.fieldView}>
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
        </View> */}
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
  storeDateContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: win.width,
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: win.width,
  },
  bottomContainer: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: win.width,
    height: 100,
  },
  submitButton: {
    width: win.width,
    height: 40,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    width: win.width,
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

