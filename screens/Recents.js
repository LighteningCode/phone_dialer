import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator()


function RecentListItem({ item }) {
    return (
        <View style={{ flexDirection: 'row' }}>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ alignSelf: 'center' }}>
                    {(item.called) ?
                        <Ionicons name="call-sharp" size={15} />
                        :
                        <View></View>
                    }
                </View>
            </View>


            <View style={{ flex: 10, justifyContent: 'space-between', flexDirection: 'row', height: 50, paddingHorizontal: 5, borderBottomWidth: 1, borderColor: "#d1d1d1" }}>

                <View style={{ flex: 5, alignSelf: 'center', alignContent: 'flex-start' }}>
                    <Text style={{ alignSelf: 'start', fontSize: 18, fontWeight: '600', color: `${(item.missed) ? "#ff3d3d" : "black"}` }}>{item.key}</Text>
                    <Text style={{ alignSelf: 'start', color: "#bfbfbf" }}>mobile</Text>
                </View>
                <Text style={{ flex: 2, alignSelf: 'center', fontWeight: '400', textAlign: 'right' }}>{item.time}</Text>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <Ionicons style={{ alignSelf: 'flex-end' }} color="#08a4ff" name="information-circle-outline" size={20} />
                </View>

            </View>
        </View>
    )
}

function AllRecents() {
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
                        <Text style={{ fontSize: 20, alignSelf: 'flex-end', color: "#3385ff", textAlign: 'right', flex: 1 }}>Edit</Text>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, borderBottomWidth: 1, borderColor: "#d1d1d1" }}>
                    <Text style={{ fontSize: 40, fontWeight: '700' }}>Recents</Text>
                </View>
                <FlatList
                    data={[
                        { key: 'Devin', time: "12:59pm", called: false, missed: false },
                        { key: 'Dan', time: "12:59pm", called: true, missed: true },
                        { key: 'Dominic', time: "12:59pm", called: false, missed: false },
                        { key: 'Jackson', time: "12:59pm", called: true, missed: true },
                        { key: 'James', time: "12:59pm", called: false, missed: false },
                    ]}
                    renderItem={({ item }) => <RecentListItem item={item} />}
                />

            </View>
        </SafeAreaView>
    )
}



function Recents() {
    return (
        <View style={{ ...styles.container, paddingTop: 50 }}>
            <AllRecents />
        </View>
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