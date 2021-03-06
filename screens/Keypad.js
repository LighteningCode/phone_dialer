import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Audio } from "expo-av";
import * as Haptics from 'expo-haptics';
import AddContacts from '../components/AddToContacts';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

const KeypadStack = createStackNavigator()

function PhoneButton({ input, _onPress, number, subtext }) {
    return (
        <TouchableOpacity
            onPress={() => (typeof _onPress === 'function') ? _onPress(input) : ""}
            style={styles.button}>
            <Text style={styles.dialer_text}>{number}</Text>

            <View>
                <Text style={styles.dialer_subtext}>
                    {subtext}
                </Text>
            </View>
        </TouchableOpacity>
    )
}


function CustomPhoneButton({ children, input, _onPress, _longPress, _onPressOut, custom_style = {} }) {

    const initialMount = useRef(true)

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false
        } else {
            // handle refreshes here
        }
    }, [initialMount, input])




    return (
        <TouchableOpacity
            onLongPress={() => (typeof _longPress === 'function') ? _longPress() : ""}
            onPressOut={() => (typeof _onPressOut === 'function') ? _onPressOut() : ""}
            onPress={() => (typeof _onPress === 'function') ? _onPress(input) : ""}
            style={{ ...styles.button, ...custom_style }}>
            {children}
        </TouchableOpacity>
    )
}


function Dialer(props) {
    const [dial, setDial] = useState({ number: '' })
    const initailMount = useRef(true)
    const deleteTimer = useRef(null)
    const [sound, setSound] = useState()

    const { navigation } = props

    useEffect(() => {
        if (initailMount.current) {

            initailMount.current = false
        } else {
            // refresh
        }

    }, [dial, deleteTimer])

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/phone_beep.mp3')
        )
        sound.setVolumeAsync(0.05).then(res => {
            res ? console.log("sound played") : null
        }).catch(e => {
            console.log(e)
            console.log("something went wrong")
        })
        setSound(sound)

        console.log("Play beep");
        await sound.playAsync();

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then(res => {
            // console.log("Vibration made in keypad")
        }).catch(e => {
            console.log("An error occured")
        })

    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync()
            }
            : undefined
    }, [sound])

    const handlePress = (input) => {
        const newDial = dial.number + input
        setDial({ number: newDial })
        playSound()
            .then()
            .catch(e => {
                console.log(e)
                console.log("Something went wrong")
            })
    }

    const handleDelete = () => {
        setDial(prevDial => ({ number: prevDial.number.substr(0, prevDial.number.length - 1) }))
        console.log("wipe wipe")
    }

    const deleteRepeat = () => {
        console.log("Deleting...")
        deleteTimer.current = setInterval(() => {
            // keep deleting here
            handleDelete()
            console.log(dial.number)
        }, 200);
    }

    const stopDeleting = () => {
        // stop the deleting
        console.log("Has stopped deleting")
        clearInterval(deleteTimer.current)
    }


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <View style={{ marginTop: 50, height: device_height }}>

                <View style={{ marginTop: 50, paddingHorizontal: 20, paddingVertical: 30, marginBottom: 10 }}>
                    <View style={{ height: 50 }}>
                        <Text style={{ fontSize: 50, textAlign: "center" }}>{dial.number}</Text>
                    </View>

                    <View style={{ height: 20 }}>

                        {
                            (dial.number === "") ?
                                <Text></Text>
                                :
                                <TouchableOpacity onPress={() => navigation.navigate("AddContactKeypad")}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#0288f5' }}>Add contact</Text>
                                </TouchableOpacity>
                        }

                    </View>
                </View>

                <View style={{ flexDirection: 'column', height: 450, paddingHorizontal: 150 }}>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <PhoneButton input={1} _onPress={handlePress} number={1} />

                        <PhoneButton input={2} _onPress={handlePress} subtext="ABC" number={2} />

                        <PhoneButton input={3} _onPress={handlePress} subtext="DEF" number={3} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <PhoneButton input={4} _onPress={handlePress} subtext="GHI" number={4} />

                        <PhoneButton input={5} _onPress={handlePress} subtext="JKL" number={5} />

                        <PhoneButton input={6} _onPress={handlePress} subtext="MNO" number={6} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <PhoneButton input={7} _onPress={handlePress} subtext="PQRS" number={7} />

                        <PhoneButton input={8} _onPress={handlePress} subtext="TUV" number={8} />

                        <PhoneButton input={9} _onPress={handlePress} subtext="WXYZ" number={9} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <PhoneButton input={"*"} _onPress={handlePress} number={"*"} />

                        <PhoneButton input={0} _onPress={handlePress} subtext="+" number={0} />

                        <PhoneButton input={"#"} _onPress={handlePress} number={"#"} />
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                        <CustomPhoneButton custom_style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} ></CustomPhoneButton>

                        <CustomPhoneButton custom_style={{ backgroundColor: '#02c902' }}>
                            <Ionicons name={"md-call"} color="white" size={35} />
                        </CustomPhoneButton>


                        {
                            (dial.number === "") ?
                                <CustomPhoneButton custom_style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} />
                                :
                                <Animatable.View animation="fadeIn" duration={1000}>
                                    <CustomPhoneButton _onPress={handleDelete} _longPress={deleteRepeat} _onPressOut={stopDeleting} custom_style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}>
                                        <Ionicons name="backspace" size={30} color="gray" />
                                    </CustomPhoneButton >
                                </Animatable.View>

                        }


                    </View>
                </View>

            </View>

        </View>
    );
}

function KeyPad() {
    return (
        <KeypadStack.Navigator
            initialRouteName="Dial"
            headerMode="none"
        >
            <KeypadStack.Screen name="Dial" component={Dialer} />
            <KeypadStack.Screen name="AddContactKeypad" component={AddContacts} />
        </KeypadStack.Navigator>
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
    dialer_text: {
        color: "#2b2b2b",
        fontSize: 30,
        fontWeight: '600'
    },
    dialer_subtext: {
        color: "#2b2b2b",
        fontSize: 15,
    },
    dialer_view: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'column',
        paddingVertical: 150
    }
});



export default KeyPad;