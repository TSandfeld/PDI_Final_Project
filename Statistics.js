import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Alert,
    ScrollView,
    TouchableHighlight,
    Modal,
    FlatList,
    TextInput,
  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { BarChart, StackedBarChart, XAxis, YAxis, ProgressCircle } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { realm, itemSchema, receiptSchema, budgetSchema, budgetItem } from './EnterReceipt.js';

export default class Statistics extends React.Component {
    static navigationOptions = {
        title: "Statistics"
    };

    constructor(props) {
        super(props);
        let receipts = [];
        this.state = {
            chartData: null,
            budgetData: null,
            loaded: false,
            visibleModal: 0,
        };
        realm.open({schema: [itemSchema, receiptSchema, budgetItem, budgetSchema]})
            .then(r => {
                let data = r.objects('Receipt');
                let budgetData = r.objects('Budget');

                this.retrieveData(data, budgetData);
            });
    }

    loading(){
        return(<View style={styles.container}><Text>Loading...</Text></View>)
    }

    retrieveData(data, budgetData) {
        this.retrieveBudgetData(budgetData);
        this.retrieveReceiptData(data);
    }

    retrieveBudgetData(budgetData) {
        var budgetDict = {}

        budgetData.forEach(element => {
            element.budgetItems.forEach(elem => {
                budgetDict[elem.category] = elem.budget;
            })
        });

        this.setState({budgetData: budgetDict});
    }

    retrieveReceiptData(receiptData) {
        var dataDict = {}

        let receipts = receiptData;
        receipts.forEach(element => {
            console.log("date: " + element.date + ", store:" + element.store, ", items: " + element.items);
            let list = element.items;
            list.forEach(item => {
                console.log("Name: " + item.name + ", Category: " + item.category + ", Price: " + item.price + ", Quantitity: " + item.quantity);
                let category = item.category;
                let totalPrice = item.price * item.quantity;
                console.log(totalPrice);
                dataDict[category] = (dataDict[category]) ? dataDict[category] + totalPrice : totalPrice;
                console.log(dataDict);
            });
        });

        this.setState({chartData: dataDict, loaded: true});
    }

    addBudgetToCategory = (budget, category) => {
        this.state.budgetData[category] = +budget;
        this.forceUpdate();
    }

    _keyExtractor = (item, index) => item;
    _renderModalView() {
        let categories = Object.keys(this.state.chartData)
                                .sort(function(a,b) {
                                    if(a < b) return -1;
                                    if(a > b) return 1;
                                    return 0;
                                });

        return (
            <View style={styles.modalContent}>
                <Text style={styles.titleText}>
                    Enter budget for your categories: 
                </Text>
                <View style={styles.listContainer}>
                    <FlatList
                        data={categories}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) =>
                            <View style={styles.listCell}>
                                <View style={styles.listCellViewLeft}>
                                    <Text style={styles.listCellText}> {item} </Text>
                                </View>
                                <View style={styles.listCellViewRight}>
                                    <TextInput 
                                        underlineColorAndroid = 'transparent' 
                                        style={styles.inputText} 
                                        value={ (this.state.budgetData[item] == null) ? "0" : this.state.budgetData[item].toString()}
                                        onChangeText={ (value) => this.addBudgetToCategory(value, item) }
                                    />
                                </View>
                            </View>
                        }
                    />
                </View>

                <TouchableHighlight onPress={ () => this._modalViewOkPressed() }>
                    <View style={styles.button}>
                        <Text>Done</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    _modalViewOkPressed() {
        var budgetItems = [];
        Object.keys(this.state.budgetData).forEach(category => {
            let entry = {
                category: category,
                budget: this.state.budgetData[category]
            }

            budgetItems.push(entry);
        });

        realm.open({schema: [itemSchema, receiptSchema, budgetItem, budgetSchema]})
        .then(realm => {
            realm.write(() => {
                const receipt = realm.create('Budget', {
                    budgetItems: budgetItems
                });
            });

            this.setState({ visibleModal: 0 })
        });
    }

    makeBarChart() {
        const chartData = this.state.chartData;

        var sortable = [];
        for (var item in chartData) {
            sortable.push([item, chartData[item]])
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        const categories = [];
        const data = [];
        const yAxisData = [];

        yAxisData.push(0);
        sortable.forEach(elem => {
            let category = elem[0];
            let spent = elem[1];
            let budget = (this.state.budgetData[category] == null) ? 0 : this.state.budgetData[category];

            if (spent >= 0) {
                categories.push(spent);
                
                let entry = {
                    category: category,
                    spent: spent,
                    budget: budget - spent,
                }
                
                if (entry.budget < 0) {
                    entry.budget = 0
                }
                
                yAxisData.push(budget);
                data.push(entry);
            }
        })

        const xAxisData = [];
        data.forEach(elem => {
            xAxisData.push(elem.category);
        });

        console.log(data);
        console.log(categories);

        // const barData = [
        //     {
        //         values: data,
        //         positive: {
        //             fill: 'rgba(0, 65, 244, 0.2)',
        //             // other react-native-svg supported props
        //         },
        //         negative: {
        //             fill: 'rgba(134, 65, 244, 0.2)',
        //             // other react-native-svg supported props
        //         },
        //     },
        // ]

        const bottomContentInset = 10;
        const topContentInset = 30;
        const chartHeight = 200;
        const colors = [ 'pink', 'green'];
        const keys   = [ 'spent', 'budget' ];

        return (
            <View style={styles.container}>
                <View style={styles.imageWelcomeContainer}>
                    <Image style={styles.imageWelcome}
                        source={require('./Images/frontscreen.png')} />
                </View>

                <Text style={styles.monthTitle}> April </Text>

                <View style={styles.chartContainer}>
                
                    <View style={styles.barChartContainer}>
                        <YAxis 
                            dataPoints={yAxisData}
                            style={ { width:50, height: chartHeight } }
                            contentInset={ {top: topContentInset, bottom: bottomContentInset } }
                            labelStyle={ { 'color': 'grey' } }
                            formatLabel={ value => `${value} kr.`}
                            />
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={styles.xAxisContainer}>
                            {/* <BarChart
                                style={ { width: data.length*80, height: 200 } }
                                data={ barData }
                                contentInset={ { top: 30, bottom: bottomContentInset } }
                            /> */}
                            <StackedBarChart
                                style={ {  width: data.length*80, height: chartHeight } }
                                keys={ keys }
                                colors={ colors }
                                data={ data }
                                contentInset={ { top: topContentInset, bottom: bottomContentInset } }
                            />
                            <XAxis  
                                values={xAxisData}
                                formatLabel={ (value, index) => value }
                                chartType={ XAxis.Type.BAR }
                                labelStyle={ { color: 'grey'} }
                            />
                        </View>
                    </ScrollView>

                    </View>
                </View>

                <TouchableHighlight onPress={() => this.setState({ visibleModal: 1 })}>
                    <View style={styles.button}>
                        <Text> Edit budget </Text>
                    </View>
                </TouchableHighlight>

                <Modal 
                    visible={this.state.visibleModal === 1}
                    animationType="slide"
                    >
                    {this._renderModalView()}
                </Modal>
            </View>
        );
    }

    render() {
        if (this.state.loaded) {
            return this.makeBarChart();
        }
        return this.loading();
    }
}



const win = Dimensions.get('window')
const cellSideMargin = 20;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    imageWelcomeContainer: {
      flex: 1,
    },
    imageWelcome: {
        width: win.width,
        height: 200,
    },
    chartContainer: {
        flex: 0,
        flexDirection: 'column',
        width: win.width,
    },
    barChartContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    xAxisContainer: {
        marginLeft: 0,
        marginRight: 10,
        marginBottom: 25,
    },
    monthTitle: {
        fontSize: 24,
        color: '#000000',
        textAlign: 'center',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    inputText: {
        flex: 0,
        width: (win.width/2) - cellSideMargin*2,
        height: 25,
        borderColor: 'gray',
        borderWidth: 1,
        margin: cellSideMargin/2,
    },
    listContainer: {
        flex: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: win.width,
        height: win.height * (3/5),
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
});

