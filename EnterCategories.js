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
import { realm, itemSchema, receiptSchema, budgetItem, budgetSchema } from './EnterReceipt.js';
import ModalDropdown from 'react-native-modal-dropdown';

export default class EnterCategories extends React.Component {
  static navigationOptions = {
    title: "Enter Categories"
  };

  constructor(props) {
    super(props);
    this.state = {
        items: this.props.navigation.state.params.receiptData,
        store: this.props.navigation.state.params.store,
        date: this.props.navigation.state.params.date,
        itemDict: {},
        loaded: false,
        refresh: false,
    };

    this.loadFromRealm()
  }

  loadFromRealm() {
    realm.open({schema: [itemSchema, receiptSchema, budgetItem, budgetSchema]})
    .then(r => {
        let data = r.objects('Receipt');
        this.fillItemDict(data);
    });

  }

  fillItemDict(receipts) {
    var itemDict = {};
    receipts.forEach(element => {
        let list = element.items;
        list.forEach(item => {
            itemDict[item.name] = item.category;
        })
    })
    console.log(itemDict);
    this.setState({itemDict: itemDict, loaded: true});
    console.log(this.state.itemDict);
    this.forceUpdate();
  }

  submitReceipt = () =>{
    var items = [];

    this.state.items.forEach(element => {
      const item = {
        name: element.name,
        price: element.price,
        quantity: element.quantity,
        category: this.state.itemDict[element.name]
      };
      items.push(item);
    });
    console.log(items);
         
    realm.open({schema: [itemSchema, receiptSchema, budgetItem, budgetSchema]})
      .then(realm => {
        realm.write(() => {
          const receipt = realm.create('Receipt', {
            date: this.state.date,
            store: this.state.store,
            items: items,
          });
        });
      });
    
    this.props.navigation.goBack(null);
    this.props.navigation.goBack(null);
  }

  addCategoryToItem=(category, item) => {
    item.category = category;
    console.log(category, item)
    this.state.itemDict[item.name] = category;
    this.setState({refresh: !this.state.refresh});
    this._dropdown.select(-1);
  }

  selectDropdownItem=(category, item) => {
    item.category = category;
    this.state.itemDict[item.name] = category;
    console.log(this.state.itemDict);
    this.setState({refresh: !this.state.refresh});
  }

  render() {
      if (this.state.loaded) {
        return (
        <View style={styles.container}>
            {/* <View style={styles.imgContainer}>
              <Image style={styles.imageLogo} source={require('./Images/frontscreen.png')}>
              </Image>
            </View> */}

            <View style={styles.listContainer}>
            <FlatList
                data={this.state.items}
                extraData={this.state.refresh}
                renderItem={({item}) =>
                    <View style={styles.listCell}>
                        <View style={styles.listCellViewLeft}>
                            <Text style={styles.listCellText}> {item.name} </Text>
                        </View>
                        <View style={styles.listCellViewRight}>
                            <TextInput 
                              underlineColorAndroid='transparent' 
                              style={styles.inputText} 
                              placeholder="Enter new category"
                              value={this.state.itemDict[item.name]}
                              onChangeText={ (text) => this.addCategoryToItem(text, item) }/>
                            <Text> Or: </Text>
                            <ModalDropdown 
                              ref={el => this._dropdown = el}
                              style={styles.dropdownMenu}
                              dropdownTextStyle={styles.dropdownTextStyle}
                              defaultValue="Select a category"
                              onSelect={(idx, value) => this.selectDropdownItem(value, item)}
                              options={
                                Array.from(
                                  new Set(
                                    Object.values(this.state.itemDict)
                                  )
                                ).sort(function(a,b) {
                                  if(a < b) return -1;
                                  if(a > b) return 1;
                                  return 0;
                                })
                              }
                            />
                        </View>
                    </View>
                }
            />
            </View>

            <View style={styles.bottomContainer}>
              <TouchableHighlight style={styles.submitButton} onPress={this.submitReceipt} >
                  <Text> Submit </Text>
              </TouchableHighlight>
            </View>

        </View>
        );
    } else {
        return(<View style={styles.container}><Text>Loading...</Text></View>)
    }

  }



}

const win = Dimensions.get('window');
const cellSideMargin = 20;

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
  imgContainer: {
    flex: 1,
    height: 25,
  },
  bottomContainer: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: win.width,
    height: 100,
  },
  sameLineInput: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  submitButton: {
    width: win.width,
    height: 50,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: win.width,
    marginTop: 25,
  },
  listCell: {
    flexDirection: 'row',
    width: win.width - cellSideMargin,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: cellSideMargin/2,
  },
  listCellViewRight: {
    width: win.width * (2/3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listCellViewLeft: {
    width: win.width/3,
    justifyContent: 'center',
  },
  listCellText: {
    margin: 5,
  },
  imageLogo: {
    width: win.width,
    height: 200,
    resizeMode: 'stretch'
  },
  inputText: {
    paddingBottom: 0,
    flex: 0,
    width: (win.width/2) - cellSideMargin*2,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    margin: cellSideMargin/2,
  },
  dropdownMenu: {
    width: 150,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 1,
    margin: cellSideMargin/2,
  }, 
  dropdownTextStyle: {
    color: 'black',
  },
});

