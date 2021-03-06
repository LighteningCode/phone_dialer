import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as _Contacts from 'expo-contacts';


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

// this is a disabled color #8E8E8F
// this is a active color #007aff

const ACTIVE_COLOR = "#007aff"
const DISABLED_COLOR = "#8E8E8F"


const styles = StyleSheet.create({
    inputGroup: {
        backgroundColor: "#ffffff",
        paddingLeft: 15,
        marginBottom: 40,
    },
    inputBox: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontSize: 16,
        borderBottomWidth: 0.75,
        borderBottomColor: "#e0e0e0",
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
})

function Button({ textContent, fontSize = 16, style = {}, active = true }) {
    return (
        <TouchableOpacity style={{ fontSize: 20, alignSelf: 'center', flex: 1, ...style }}>
            <Text style={{ fontSize: fontSize, fontWeight: "500", color: `${(!active) ? '#8E8E8F' : '#007aff'}` }}>{textContent}</Text>
        </TouchableOpacity>
    )
}


function Input({ placeholder, name = "input", onChange = () => { console.log("Input changed") } }) {
    const [_name, setName] = useState('input')
    return (
        <TextInput placeholderTextColor="#a6a6a6" onChangeText={onChange} placeholder={placeholder} style={styles.inputBox} />
    )
}



function AddToInput({ placeholder }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Ionicons name="ios-add-circle-sharp" size={24} color="#0bd92e" />
            </TouchableOpacity>
            <TextInput placeholderTextColor="#a6a6a6" placeholder={placeholder} style={styles.inputBox} />
        </View>
    )
}



function AddContacts(props) {

    const initialMount = useRef(true)
    const [formData, setFormData] = useState({})
    const [firstChar, setFirstChar] = useState(null)
    const [lastChar, setLastChar] = useState(null)

    const { navigation } = props


    const handleTextChange = (text, name) => {

        // get the first character of the first name
        if (name === 'firstname') {
            const firstChar = text.substr(0, 1).trim()
            setFirstChar(firstChar)
        }

        if (name === 'lastname') {
            const lastChar = text.substr(0, 1).trim()
            setLastChar(lastChar)
        }

        setFormData(prevState => ({ ...prevState, [name]: text }))
    }

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false
            console.log(Object.entries({}).length)
        } else {
            // handle refreshes

        }

    }, [formData, initialMount, firstChar, lastChar])

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle("light-content")
        });
        return subscribe;
    }, [navigation])

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15, width: device_width, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ fontSize: 20, alignSelf: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 21, fontWeight: "500", color: "#007aff" }}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: '600', alignSelf: 'center', flex: 3, textAlign: 'center' }}>New Contact</Text>
                <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 21, textAlign: 'right', fontWeight: "500", color: `${(Object.entries({}).length > 0) ? '#8E8E8F' : '#007aff'}` }}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>

                <View>

                    <View style={{ justifyContent: 'center', marginVertical: 50 }}>
                        <View style={{ alignSelf: 'center' }}>
                            <LinearGradient
                                style={{ width: 170, height: 170, borderRadius: 82, justifyContent: 'center', flexDirection: 'row' }}
                                colors={["#bdbdbd", "#9c9c9c", "#9c9c9c"]}
                            >
                                {
                                    (firstChar || lastChar) ?
                                        <Text style={{ alignSelf: 'center', fontSize: 60, fontWeight: 'bold', color: 'white' }}>{((firstChar) ? firstChar.toUpperCase() : '') + ((lastChar) ? lastChar.toUpperCase() : '')}</Text>
                                        :
                                        <FontAwesome style={{ alignSelf: 'center', fontSize: 100, fontWeight: 'bold', color: 'white' }} name="user" size={24} color="white" />
                                }
                            </LinearGradient>
                        </View>

                        <Button textContent="Add photo" style={{ marginTop: 10 }} />
                    </View>


                    <View style={{ ...styles.inputGroup }}>
                        <Input onChange={(text) => handleTextChange(text, 'firstname')} placeholder={"First name"} />
                        <Input onChange={(text) => handleTextChange(text, 'lastname')} placeholder={"Last name"} />
                        <Input onChange={(text) => handleTextChange(text, 'company')} placeholder={"Company"} />
                    </View>

                    <View style={{ ...styles.inputGroup }}>
                        <AddToInput placeholder={"add phone"} />
                    </View>

                    <View style={{ ...styles.inputGroup }}>
                        <AddToInput placeholder={"add email"} />
                    </View>

                    <View style={{ ...styles.inputGroup }}>
                        <AddToInput placeholder={"add website"} />
                    </View>

                    <View style={{ ...styles.inputGroup }}>
                        <AddToInput placeholder={"add address"} />
                    </View>

                    <View style={{ ...styles.inputGroup }}>
                        <AddToInput placeholder={"add birthday"} />
                    </View>

                    <View style={{ ...styles.inputGroup }}>
                        <AddToInput placeholder={"add social profile"} />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AddContacts;