import React from 'react';
import { StyleSheet, 
  AppRegistry,
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


export const realm = require('realm');

export const itemSchema = {
  name: 'Item',
  properties: {
    name: 'string',
    price: 'double',
    quantity: 'int',
    category: 'string'
  }
}

export const receiptSchema = {
  name: 'Receipt',
  properties: {
    date: 'string',
    store: 'string',
    items: 'Item[]',
  }
}

export const budgetItem = {
  name: 'BudgetItem',
  properties: {
    category: 'string',
    budget: {type: 'double', default: 0.0}
  }
}

export const budgetSchema = {
  name: 'Budget',
  properties: {
    budgetItems: 'BudgetItem[]',
  }
}

var data = [{key: "0", name: "", price: 0.0, quantity: 0, category: ""}, {key: "1", name: "", price: 0.0, quantity: 0, category: ""}];

export default class EnterReceipt extends React.Component {
  static navigationOptions = {
    title: "Enter Receipt"
  };

  constructor(props) {
    super(props);
    let date = this.getToday();

    this.state = { 
      items: [{key: "0"},{key: "1"}],
      store: "",
      date: date
    };

  }

  getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+yyyy;

    return today;
  }

  addEntry=()=>{
    var index = this.state.items.length
    this.state.items.push( {key: index.toString()} );
    data.push({key: index.toString(), name: "", price: 0.0, quantity: 0,category: ""});
    console.log(this.state.items);
  }

  changeItemName=(key, value)=>{
    var index = parseInt(key);
    data[index].name = value;
  }

  changeItemPrice=(key, value)=>{
    var index = parseInt(key);
    var cost = parseFloat(value);
    data[index].price = cost;
  }

  changeItemQuantity=(key, value)=>{
    var index = parseInt(key);
    var quant = parseInt(value);
    data[index].quantity = quant;
  }

  nextButtonPressed=() => {
    var sortedData = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      if (!(item.name == "") ) {
        sortedData.push(item);
      }
    }

    if (sortedData.length < 1 || this.state.store == "") {
      Alert.alert("Please enter items and store location into the form before proceeding.")
    } else {
      this.props.navigation.navigate('Categories',
                                     {
                                       receiptData: sortedData,
                                       store: this.state.store,
                                       date: this.state.date
                                      })
    }

  }

  render() {
    return (
      <View style={styles.container}>


        <View style={styles.storeDateContainer}>
          <View style={styles.sameLineInput}>
            <Text>Store</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText} 
            onChangeText={ (text) => this.setState({store: text}) }></TextInput> 
          </View>
            
          <View style={styles.sameLineInput}>
            <Text>Date</Text>
            <TextInput underlineColorAndroid='transparent' style={styles.inputText} 
            value={this.state.date} 
            onChangeText={ (text) => this.setState({date: text})}></TextInput> 
          </View>
          <View style={styles.sameLineInput}>
            <TouchableHighlight onPress={this.addEntry}>
              <Text style={ { color: 'blue' } }> Add Item </Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.items}
            renderItem={({item}) =>
                <View style={styles.sameLineInput}>
                  <Text>Item</Text>
                  <TextInput underlineColorAndroid='transparent' style={styles.inputTextItem} 
                    onChangeText={ (text) => this.changeItemName(item.key, text)}></TextInput>
                  <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}
                    onChangeText={ (price) => this.changeItemPrice(item.key, price)}></TextInput>
                  <Text>Kr.</Text>
                  <TextInput underlineColorAndroid='transparent' style={styles.inputMoney}
                    onChangeText={ (quantity) => this.changeItemQuantity(item.key, quantity)}></TextInput>
                  <Text>pcs.</Text>
                </View>
              }
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableHighlight style={styles.nextButton} onPress={this.nextButtonPressed} >
            <Text> Next </Text>
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
  containerScroll: {
    backgroundColor: '#4c69a5',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeDateContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: win.width,
    marginBottom: 20,
    marginTop: 25,
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
  nextButton: {
    width: win.width,
    height: 50,
    backgroundColor: 'lightblue',
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
    paddingBottom: 0,
    flex: 0,
    width: 90,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 4,
    marginRight: 10,
  },
  inputTextItem: {
    flex: 0,
    width: 130,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 4,
    marginRight: 10,
  },
  inputMoney:{
    paddingBottom: 0,
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

