import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

function VoiceMail() {
    return (
        <SafeAreaView style={{ ...styles.container, paddingTop: 80 }}>
            <StatusBar style="auto" />
        

            <View style={{padding: 10}}>
                <Text style={{ fontSize: 35, fontWeight: 'bold' }}>Voicemail</Text>
            </View>

            <View style={{ ...styles.voicemail_content }}>

                <TouchableOpacity style={styles.voicemail_btn}>
                    <Text style={{textAlign: 'center', color:'#878787' }}>Call voicemail</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: device_height
    },
    voicemail_content: {
        height: device_height * 0.70,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    voicemail_btn: {
        padding: 10,
        borderColor: "#b0b0b0",
        borderWidth: 1.5,
        borderRadius: 5,
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center'
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


export default VoiceMail;