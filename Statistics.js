import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AreaChart, BarChart, XAxis, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class Statistics extends React.Component {
    static navigationOptions = {
        title: "Statistics"
    };

    render() {
        const data    = [ 45, 15, 12, 2,]
        const categories = [ 'Sweets', 'Vegetables', 'Drinks', 'Household Items']
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

