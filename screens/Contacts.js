// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as _Contacts from 'expo-contacts';
import AddContacts from '../components/AddToContacts';
import UserView from '../components/ContactUserView';


// this is a disabled color #8E8E8F
// this is a active color #007aff

const ACTIVE_COLOR = "#007aff"
const DISABLED_COLOR = "#8E8E8F"

const ContactStack = createStackNavigator();

const UserStack = createStackNavigator();

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;




function SectionListItem({ item, _onPress = () => { } }) {
    return (
        <TouchableOpacity onPress={_onPress} style={{ ...styles.item, flexDirection: 'row', justifyContent: 'start' }}>
            <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
        </TouchableOpacity>
    )
}

function SectionHeader({ section }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'start', ...styles.sectionHeader }}>
            <Text style={{ alignSelf: 'center', fontWeight: '800' }}>{section.title}</Text>
        </View>
    )
}

function Checkbox({ name, checked, onChange, backgroundColor = 'white', size = 20 }) {

    return (
        <TouchableOpacity activeOpacity={1} onPress={onChange} style={{ flexDirection: 'row', padding: 10, backgroundColor: backgroundColor, borderRadius: 10 }}>
            <View style={{
                width: size,
                height: size,
                backgroundColor: `${(checked) ? ACTIVE_COLOR : 'white'}`,
                borderColor: `${(!checked) ? DISABLED_COLOR : 'transparent'}`,
                borderRadius: size * 2,
                borderWidth: 0.75,
                justifyContent: 'center',
            }}>
                {
                    (checked)
                        ?
                        <Ionicons name="checkmark" size={15} color="white" style={{ alignSelf: 'center' }} />
                        :
                        null
                }
            </View>

            <Text style={{ alignSelf: 'center', marginLeft: 15, fontSize: 20 }}>{name}</Text>
        </TouchableOpacity>
    )
}

function GroupContacts(props) {

    const { navigation } = props

    const initialMount = useRef(true)
    const [iCloudCheckbox, setICloudCheckbox] = useState(true)
    const [gMailCheckbox, setGMailCheckbox] = useState(false)


    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle("light-content")
        });
        return subscribe;
    }, [])

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false
        } else {
            // handle refreshes here
        }
    }, [iCloudCheckbox, gMailCheckbox])


    const GroupView = ({ name, checked, title, onChange }) => (
        <View style={{ marginVertical: 10 }}>
            <Text>{title}</Text>
            <View style={{ marginTop: 10 }}>
                <Checkbox
                    name={name}
                    checked={checked}
                    onChange={onChange}
                />
            </View>
        </View>
    )

    return (
        <View style={{ padding: 15, flex: 1 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, marginBottom: 10 }}>
                <TouchableOpacity style={{ fontSize: 20, alignSelf: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 21, fontWeight: "500", color: "#007aff" }}></Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: '600', alignSelf: 'center', flex: 3, textAlign: 'center' }}></Text>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 21, textAlign: 'right', fontWeight: "500", color: `${(Object.entries({}).length > 0) ? '#8E8E8F' : '#007aff'}` }}>Done</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontSize: 40, fontWeight: '700', marginBottom: 20 }}>Groups</Text>

                <GroupView
                    title="ICLOUD"
                    name="All iCloud"
                    checked={iCloudCheckbox}
                    onChange={() => setICloudCheckbox(!iCloudCheckbox)}
                />

                <GroupView
                    title="GMAIL"
                    name="All Gmail"
                    checked={gMailCheckbox}
                    onChange={() => setGMailCheckbox(!gMailCheckbox)}
                />
            </View>

            <TouchableOpacity style={{ position: 'absolute', bottom: 0, padding: 10, width: device_width }}>
                <Text style={{ color: ACTIVE_COLOR, fontSize: 18, textAlign: 'center' }}>Hide all contacts</Text>
            </TouchableOpacity>


        </View>
    )
}




function ContactList({ navigation }) {

    const getContacts = async () => {
        const status = await _Contacts.requestPermissionsAsync();
        console.log(status)
        if (status === 'granted') {
            const data = await _Contacts.getContactsAsync({
                fields: [_Contacts.Fields.Emails]
            })

            console.log(data.data.length)

            if (data.length > 0) {
                const contact = data[0];
                console.log(contact)
            }
        }
    }

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle("dark-content")
        });
        return subscribe;
    }, [navigation])

    useEffect(() => {
        getContacts()
    }, [])

    const OpenUserView = (userData) => {
        navigation.navigate('User', userData)
    }

    return (
        <SafeAreaView style={{ ...styles.container, width: device_width, height: device_height, flexDirection: 'column', backgroundColor: '#ebebeb' }}>
            <StatusBar style="auto" />

            <View style={{ backgroundColor: '#ebebeb', paddingBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, width: device_width, marginBottom: 10 }}>

                    <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }} onPress={() => navigation.navigate("Groups")}>
                        <Text style={{ fontSize: 20, alignSelf: 'flex-start', color: "#3385ff" }}>Groups</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 25, fontWeight: '500', alignSelf: 'center', flex: 1, textAlign: 'center' }}>Contacts</Text>
                    <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-end' }}>

                        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
                            <Ionicons name="add" size={30} color="#3385ff" />
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: device_width }}>
                    <View style={{ backgroundColor: '#e0e0e0', height: 35, width: device_width * 0.95, paddingHorizontal: 10, borderRadius: 10, flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', marginRight: 7 }}>
                            <Ionicons name='search' color="#9c9c9c" size={20} />
                        </View>
                        <TextInput placeholder="Search" />
                    </View>
                </View>
            </View>

            <SectionList
                style={styles.sectionListContainer}
                sections={[
                    {
                        title: "B", data: [
                            { name: "Belvis Acheampong", area: "mobile", number: "+233 23 236 5898" },
                            { name: "Belinda Kumaesi", area: "mobile", number: "+233 25 115 5898" },
                            { name: "Brenda Abu", area: "mobile", number: "+233 24 236 255" },
                        ]
                    },
                    {
                        title: "C",
                        data: [
                            { name: "Calvin Asantey", area: "mobile", number: "+233 20 336 5898" },
                            { name: "Cerry Assumani", area: "mobile", number: "+233 23 222 2256" },
                            { name: "Cindy Armah", area: "mobile", number: "+233 50 236 5898" },
                        ]
                    },
                    {
                        title: "D",
                        data: [
                            { name: "Delvis Agbe", area: "mobile", number: "+233 26 236 1585" },
                            { name: "Declan Nyankah", area: "mobile", number: "+233 24 236 5898" },
                            { name: "Dennis Brown", area: "mobile", number: "+233 23 303 1133" },
                        ]
                    },
                    {
                        title: "E", data: [
                            { name: "Elvis Agbesi", area: "mobile", number: "+233 23 236 5898" },
                            { name: "Ezra Kusi", area: "mobile", number: "+233 23 236 5898" },
                            { name: "Elias Famiche", area: "mobile", number: "+233 23 236 5898" },
                        ]
                    },
                ]}
                renderItem={({ item }) => <SectionListItem _onPress={() => OpenUserView(item)} key={`item${item}`} item={item} />}
                renderSectionHeader={({ section }) => <SectionHeader key={`section${section}`} section={section} />}
                keyExtractor={(item, index) => index.toString()}
            />

        </SafeAreaView>
    )
}



function ContactView(props) {

    const { navigation } = props

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle("dark-content")
        });
        return subscribe;
    }, [navigation])

    return (
        <UserStack.Navigator
            initialRouteName="List"
            headerMode="none"
            mode="modal"
            screenOptions={{
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS
            }}
        >
            <UserStack.Screen options={{ headerShown: false }} component={ContactList} name="List" />

            <UserStack.Screen
                options={{
                    headerRight: () =>
                        <TouchableOpacity style={styles.normal_btn}>
                            <Text style={{ color: '#007aff', fontWeight: 'normal', fontSize: 20 }}>Edit</Text>
                        </TouchableOpacity>
                }}
                component={UserView}
                name="User" />

            <UserStack.Screen
                options={{
                    headerTitle: null,
                }}
                component={AddContacts}
                name="Add"
            />

            <UserStack.Screen
                options={{
                    headerTitle: null,
                    headerRight: () =>
                        <TouchableOpacity style={styles.normal_btn}>
                            <Text style={{ color: '#007aff', fontWeight: 'normal', fontSize: 20 }}>Done</Text>
                        </TouchableOpacity>

                }}
                component={GroupContacts}
                name="Groups"
            />
        </UserStack.Navigator>

    )
}


function Contacts() {


    return (

        <ContactStack.Navigator
            headerMode="none"
            mode="modal"
            screenOptions={{
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalPresentationIOS
            }}
            initialRouteName="Contacts"
        >
            <ContactStack.Screen name="Contacts" component={ContactView} />
        </ContactStack.Navigator>

    )
}


const styles = StyleSheet.create({
    container: {
        height: device_height,
        paddingTop: 60,
    },
    normal_btn: {
        color: "#007aff",
        padding: 10,
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
    sectionListContainer: {
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    inputBox: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontSize: 16,
        borderBottomWidth: 0.75,
        borderBottomColor: "#e0e0e0",
    },
    inputGroup: {
        backgroundColor: "#ffffff",
        paddingLeft: 15,
        marginBottom: 40,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        height: 25,
        fontWeight: 'bold',
        color: "black",
        backgroundColor: '#d4d4d4',
    },
    item: {
        backgroundColor: "rgba(247,247,247,1.0)",
        fontSize: 18,
        height: 40,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderColor: "#e3e3e3",
        borderBottomWidth: 0.5
    },
});


export default Contacts;