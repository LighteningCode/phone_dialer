import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SegmentedControl from '@react-native-segmented-control/segmented-control';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

const Tab = createMaterialTopTabNavigator()


function RecentListItem({ item }) {
    return (
        <View style={{ flexDirection: 'row' }}>

            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ alignSelf: 'center' }}>
                    {(item.called) ?
                        <MaterialIcons name="phone-callback" size={20} color="#949494" />
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


function Recents() {

    const [allCalls, setAllCalls] = useState({
        data: [
            { key: '055 756 4654', time: "12:59pm", called: false, missed: false },
            { key: 'Dan', time: "12:59pm", called: true, missed: true },
            { key: 'Dominic', time: "12:59pm", called: false, missed: false },
            { key: 'Jackson', time: "12:59pm", called: true, missed: true },
            { key: 'James', time: "12:59pm", called: false, missed: false },
        ]
    })

    const [visibleCalls, setVisibleCalls] = useState({
        data: []
    })

    const initialMount = useRef(true);

    useEffect(() => {
        if (initialMount.current) {
            setVisibleCalls({data: allCalls.data})
            initialMount.current = false
            console.log(allCalls.data)
        } else {
            // handle refresh
        }
    }, [visibleCalls,initialMount])



    const handleSegmentChange = (event) => {
        // create copy of current all calls
        const _allCalls = allCalls.data

        // if segment is not the first one 
        if (event.nativeEvent.selectedSegmentIndex !== 0) {
            let newCalls = _allCalls.filter(x => x.missed !== false)
            setVisibleCalls({data: newCalls})
        }else{
            setVisibleCalls({data: allCalls.data})
        }
    }

    return (

        <SafeAreaView style={{ ...styles.container }}>
            <StatusBar style="auto" />
            <View style={{ width: device_width }}>

                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, width: device_width, marginBottom: 10 }}>
                        <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-end' }}>
                        </View>
                        <View style={{ alignSelf: 'center', flex: 2 }}>
                            <SegmentedControl
                                values={["All", "Missed"]}
                                selectedIndex={0}
                                onChange={handleSegmentChange}

                            />
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 20, alignSelf: 'center', color: "#3385ff" }}>Edit</Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, borderBottomWidth: 1, borderColor: "#d1d1d1",marginBottom: 15 }}>
                    <Text style={{ fontSize: 40, fontWeight: '700' }}>Recents</Text>
                </View>
                <FlatList
                    data={visibleCalls.data}
                    renderItem={({ item }) => <RecentListItem item={item} />}
                />

            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
        height: device_height,
        backgroundColor: "#ffffff"
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