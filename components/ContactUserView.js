// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as _Contacts from 'expo-contacts';

const ACTIVE_COLOR = "#007aff"
const DISABLED_COLOR = "#8E8E8F"

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;


function ListItem({ textContent, fontSize = 16, style = {}, active = true, danger = false }) {
    return (
        <TouchableOpacity style={{ fontSize: 20, borderBottomColor: '#dedede', ...style }}>
            {
                (!danger)
                    ?
                    <Text style={{ fontSize: fontSize, fontWeight: "normal", color: `${(!active) ? '#8E8E8F' : '#007aff'}` }}>{textContent}</Text>
                    :
                    <Text style={{ fontSize: fontSize, fontWeight: "normal", color: `#ff6969` }}>{textContent}</Text>
            }
        </TouchableOpacity>
    )
}


function UserView({ route, navigation }) {

    const [firstChar, setFirstChar] = useState()
    const [lastChar, setLastChar] = useState()

    const { name, area, number } = route.params

    const processChars = (name) => {
        const nameparts = name.split(" ")

        let firstChar = ''
        let lastChar = ''

        if (nameparts.length > 1) {
            firstChar = nameparts[0].substr(0, 1)
            lastChar = nameparts[1].substr(0, 1)
        } else {
            firstChar = nameparts[0].substr(0, 1)
            lastChar = ''
        }

        return ((firstChar) ? firstChar.toUpperCase() : '') + ((lastChar) ? lastChar.toUpperCase() : '')
    }

    useEffect(() => {

    }, [firstChar, lastChar])

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            if (route.name.includes("recent")) {
                StatusBar.setBarStyle("dark-content")
            }else{
                StatusBar.setBarStyle("light-content")
            }
        });
        return subscribe;
    }, [navigation])


    const CallOption = ({ icon, text, active = true }) => (
        <TouchableOpacity style={{ flexDirection: 'column', paddingHorizontal: 15, paddingVertical: 5, width: 84, height: 60, backgroundColor: 'white', borderRadius: 10, justifyContent: 'space-around' }}>
            <Ionicons name={icon} style={{ alignSelf: 'center' }} color={`${(active) ? "#007aff" : "#8E8E8F"}`} size={25} />
            <Text style={{ textAlign: 'center', fontSize: 12, color: `${(active) ? "#007aff" : "#8E8E8F"}` }}>{text}</Text>
        </TouchableOpacity>
    )

    const ContactNumber = ({ area, number }) => (
        <View style={{ backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, paddingHorizontal: 15 }}>
            <Text style={{ marginBottom: 5 }}>{area}</Text>
            <Text style={{ color: ACTIVE_COLOR, fontSize: 16 }}>{number}</Text>
        </View>
    )

    const InputGroup = ({ children }) => (
        <View style={{ backgroundColor: 'white', borderRadius: 10, paddingVertical: 5, paddingHorizontal: 15, marginTop: 15 }}>
            {children}
        </View>
    )

    var reg = new RegExp('^[0-9]+$');

    return (
        <SafeAreaView style={{ paddingHorizontal: 10, flex: 1, }}>
            <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 30, flexDirection: 'column' }}>
                <LinearGradient
                    style={{ width: 80, height: 80, borderRadius: 40, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}
                    colors={["#bdbdbd", "#9c9c9c", "#9c9c9c"]}
                >
                    {
                        (!reg.test(name.replace(/\s/g, '')))
                            ?
                            <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: 'bold', color: 'white' }}>{processChars(name)}</Text>
                            :
                            <FontAwesome style={{ alignSelf: 'center', fontSize: 100, fontWeight: 'bold', color: 'white' }} name="user" size={12} color="white" />
                    }
                </LinearGradient>

                <Text style={{ fontSize: 35 }}>{name}</Text>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: (name !== "recent-call") ? 10 : 0 }}>
                <CallOption text="message" icon={'chatbox-ellipses'} />
                <CallOption text="call" icon={'md-call'} />
                <CallOption text="video" icon={'videocam'} />
                <CallOption text="mail" icon={'mail'} active={false} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: (name !== "recent-call") ? 10 : 0 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 15 }}>
                    <ContactNumber area="home" number={number} />
                </View>

                {
                    (name !== "recent-call")
                        ?
                        <View style={{ backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, paddingHorizontal: 15, marginTop: 15, height: 100 }}>
                            <Text>Notes</Text>
                            <TextInput multiline={true} />
                        </View>
                        :
                        <View style={{ backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, paddingHorizontal: 15, marginTop: 15, height: 100 }}>
                            <Text>Today</Text>
                            <Text>1:55 PM Missed Call</Text>
                        </View>
                }


                <InputGroup>
                {
                    (reg.test(name.replace(/\s/g, ''))) 
                    ?
                    <ListItem textContent={"Add Contact"} fontSize={18} style={{ borderBottomWidth: 0.75, paddingVertical: 12 }} />
                    :
                    null
                }
                    <ListItem textContent={"Send Message"} fontSize={18} style={{ borderBottomWidth: 0.75, paddingVertical: 12 }} />
                    <ListItem textContent={"Share Contact"} fontSize={18} style={{ borderBottomWidth: 0.75, paddingVertical: 12 }} />
                    <ListItem textContent={"Add To Favorites"} fontSize={18} style={{ paddingVertical: 12 }} />
                </InputGroup>

                <InputGroup>
                    <ListItem textContent={"Add to Emergency Contacts"} fontSize={18} style={{ paddingVertical: 12 }} />
                </InputGroup>

                <InputGroup>
                    <ListItem textContent={"Share My Location"} fontSize={18} style={{ paddingVertical: 12 }} />
                </InputGroup>

                <InputGroup>
                    <ListItem textContent={"Block this Contact"} danger={true} fontSize={18} style={{ paddingVertical: 12 }} />
                </InputGroup>

            </ScrollView>


        </SafeAreaView>
    )
}


export default UserView;