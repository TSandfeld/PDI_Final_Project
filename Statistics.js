import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Alert
  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AreaChart, BarChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { realm, itemSchema, receiptSchema } from './EnterReceipt.js';

export default class Statistics extends React.Component {
    static navigationOptions = {
        title: "Statistics"
    };

    constructor(props) {
        super(props);
        let receipts = [];
        this.state = {
            receiptData: null,
            chartData: null,
            loaded: false
        };
        realm.open({schema: [itemSchema, receiptSchema]})
            .then(r => {
                let data = r.objects('Receipt');
                console.log(data[0]);
                
                this.setState( {
                    receiptData: data
                });

                this.retrieveData();
            });

        
    }

    loading(){
        return(<View style={styles.container}><Text>Loading...</Text></View>)
    }

    retrieveData() {
        var dataDict = {}

        let receipts = this.state.receiptData;
        receipts.forEach(element => {
            console.log("date: " + element.date + ", store:" + element.store, ", items: " + element.items);
            let list = element.items;
            list.forEach(item => {
                console.log("Name: " + item.name + ", Price: " + item.price + ", Quantitity: " + item.quantity);
                let name = item.name;
                let totalPrice = item.price * item.quantity;
                dataDict[name] = totalPrice;
            });
        });

        console.log(dataDict);
        this.setState({chartData: dataDict, loaded: true});
        this.forceUpdate();
    }

    makeBarChart() {
        const chartData = this.state.chartData;
        console.log("chardata: " + chartData);

        var sortable = [];
        for (var item in chartData) {
            sortable.push([item, chartData[item]])
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        const categories = [];
        const data = [];
        sortable.forEach(elem => {
            if (elem[1] > 0) {
                categories.push(elem[0]);
                data.push(elem[1]);
            }
        })

        const barData = [
            {
                values: data,
                positive: {
                    fill: 'rgba(0, 65, 244, 0.2)',
                    // other react-native-svg supported props
                },
                negative: {
                    fill: 'rgba(134, 65, 244, 0.2)',
                    // other react-native-svg supported props
                },
            },
        ]

        const bottomContentInset = 10

        return (
            <View style={styles.container}>
                <View style={styles.imageWelcomeContainer}>
                    <Image style={styles.imageWelcome}
                        source={require('./Images/frontscreen.png')} />
                </View>

                <Text style={styles.monthTitle}> February </Text>
                <View style={styles.chartContainer}>
                    <View style={styles.barChartContainer}>
                        <YAxis dataPoints={data}
                            style={ { width:50, height: 200 } }
                            contentInset={ {top: 30, bottom: bottomContentInset } }
                            labelStyle={ { 'color': 'grey' } }
                            formatLabel={ value => `${value} DKK`}
                            />
                        <BarChart
                                style={ { width: 300, height: 200 } }
                                data={ barData }
                                contentInset={ { top: 30, bottom: bottomContentInset } }
                            />
                    </View>
                    <View style={styles.xAxisContainer}>
                        <XAxis  values={data}
                                formatLabel={ (value, index) => categories[index] }
                                chartType={ XAxis.Type.BAR }
                                labelStyle={ { color: 'grey' } }
                                contentInset={ { left: 10, right: 5 } }
                            />
                    </View>
                </View>
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
        width: win.width,
    },
    barChartContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    xAxisContainer: {
        marginLeft: 50,
        marginRight: 10,
        marginBottom: 25,
    },
    monthTitle: {
        fontSize: 24,
        color: '#000000',
        textAlign: 'center',
    },
});

