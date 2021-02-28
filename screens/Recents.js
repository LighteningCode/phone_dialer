import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;


function RecentListItem({ item }) {
    return (
        <View style={{ justifyContent: 'space-around', flexDirection: 'row', height: 50, paddingHorizontal: 20 }}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
                <Ionicons name="call-sharp" size={15} />
            </View>

            <View style={{ flex: 5, alignSelf: 'center', alignContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'start', fontSize: 18, fontWeight: '700' }}>{item.key}</Text>
                <Text style={{ alignSelf: 'start', color: "#bfbfbf" }}>mobile</Text>
            </View>
            <Text style={{ flex: 2, alignSelf: 'center', fontWeight: '400', textAlign: 'right' }}>{item.time}</Text>
            <View style={{ flex: 1, alignSelf: 'center' }}>
                <Ionicons style={{ alignSelf: 'flex-end' }} color="#08a4ff" name="information-circle-outline" size={20} />
            </View>

        </View>
    )
}

function Recents() {
    return (
        <SafeAreaView style={{ ...styles.container }}>
            <StatusBar style="auto" />
            <View style={{ width: device_width }}>

                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, width: device_width, marginBottom: 10 }}>
                        <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-end' }}>
                        </View>
                        <View style={{ alignSelf: 'center', flex: 1 }}>
                            
                        </View>
                        <Text style={{ fontSize: 20, alignSelf: 'flex-end', color: "#3385ff", textAlign:'right',flex: 1 }}>Edit</Text>
                    </View>
                </View>

                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 40, fontWeight: '700' }}>Recents</Text>
                </View>
                <FlatList
                    data={[
                        { key: 'Devin', time: "12:59pm" },
                        { key: 'Dan', time: "12:59pm" },
                        { key: 'Dominic', time: "12:59pm" },
                        { key: 'Jackson', time: "12:59pm" },
                        { key: 'James', time: "12:59pm" },
                    ]}
                    renderItem={({ item }) => <RecentListItem item={item} />}
                />

            </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: device_height
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        fontWeight: 'bold',
        padding: 5,
        margin: 10,
        width: 75,
        height: 75,
        borderRadius: 1200,
    },
    item: {

    }
});


export default Recents;