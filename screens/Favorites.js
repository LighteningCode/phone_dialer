import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

function Favorites() {
    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, width: device_width, marginBottom: 10 }}>
                    <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-start' }}>
                        <Ionicons name="add" size="30" color="#3385ff" />
                    </View>
                    <View style={{ alignSelf: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 25, fontWeight: '500', alignSelf: 'center', flex: 1, textAlign: 'center' }}>Favorites</Text>
                    </View>
                    <Text style={{ fontSize: 20, alignSelf: 'flex-end', color: "#3385ff", textAlign: 'right', flex: 1 }}>Edit</Text>
                </View>
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
    }
});


export default Favorites;