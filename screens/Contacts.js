import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

function Contacts() {
    return (
        <SafeAreaView style={{ ...styles.container, width: device_width, height: device_height, flexDirection: 'column' }}>
            <StatusBar style="auto" />

            <View style={{ backgroundColor: '#ebebeb', paddingBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, width: device_width, marginBottom: 10 }}>
                    <Text style={{ fontSize: 20, alignSelf: 'center', color: "#3385ff", flex: 1 }}>Groups</Text>
                    <Text style={{ fontSize: 25, fontWeight: '500', alignSelf: 'center', flex: 1, textAlign: 'center' }}>Contacts</Text>
                    <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-end' }}>
                        <Ionicons name="add" size="30" color="#3385ff" />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: device_width }}>
                    <View style={{ backgroundColor: '#e0e0e0', height: 35, width: device_width * 0.95, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', marginRight: 7 }}>
                            <Ionicons name='search' color="#9c9c9c" size="20" />
                        </View>
                        <TextInput placeholder="Search" />
                    </View>
                </View>
            </View>


            <SectionList
                sections={[
                    { title: "B", data: ["Belvis", "Belinda", "Brenda"] },
                    { title: "C", data: ["Calvin", "Cerry", "Cindy"] },
                    { title: "D", data: ["Delvis", "Declan", "Dennis"] },
                    { title: "J", data: ["Jermiah", "Jerry", "Jennifer"] },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}

            />




        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: device_height,
        paddingTop: 60,
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
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        backgroundColor: "",
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});


export default Contacts;