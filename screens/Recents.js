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
                        <MaterialIcons name="phone-callback" size={16} color="#a6a6a6" />
                        :
                        <View></View>
                    }
                </View>
            </View>


            <View style={{ flex: 9, justifyContent: 'space-between', flexDirection: 'row', height: 50, paddingHorizontal: 5, borderBottomWidth: 0.75, borderColor: "#d1d1d1" }}>

                <View style={{ flex: 5, alignSelf: 'center', alignContent: 'flex-start' }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 18, fontWeight: '600', color: `${(item.missed) ? "#ff3d3d" : "black"}` }}>{item.key}</Text>
                    <Text style={{ alignSelf: 'flex-start', color: "#bfbfbf" }}>{item.area}</Text>
                </View>
                <Text style={{ flex: 2, alignSelf: 'center', fontWeight: '400', textAlign: 'right', color:"#a3a3a3" }}>{item.time}</Text>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <Ionicons style={{ alignSelf: 'flex-end', marginRight: 5 }} color="#0084ff" name="information-circle-outline" size={22} />
                </View>

            </View>
        </View>
    )
}


function Recents() {

    const [allCalls, setAllCalls] = useState({
        data: [
            { key: '055 756 4654', time: "11:12 AM", called: false, missed: false, area: "Ghana" },
            { key: 'Mercedex AMG GTR', time: "12:59pm", called: true, missed: true , area: "Whatsapp Audio"  },
            { key: 'Mum', time: "Yesterday", called: false, missed: false , area: "Ghana"  },
            { key: 'Emmanuel Ashitey', time: "Yesterday", called: true, missed: true , area: "Mobile"  },
            { key: '055 134 2357 (2)', time: "Yesterday", called: false, missed: true , area: "Ghana"  },
            { key: '030 313 3009', time: "Yesterday", called: false, missed: true , area: "Ghana"  },
            { key: '059 221 4017', time: "Yesterday", called: false, missed: false , area: "Ghana"  },
            { key: 'Mrs. Matilda S. Wilson', time: "Yesterday", called: false, missed: false , area: "home"  },
            { key: 'Michael Agbo Soli (2)', time: "Yesterday", called: false, missed: false , area: "mobile"  },
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

                <View style={{ paddingLeft: 20, borderBottomWidth: 0.75, borderColor: "#d1d1d1",paddingBottom: 15 }}>
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