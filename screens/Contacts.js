// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as _Contacts from 'expo-contacts';


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

function Checkbox({ checked, onChange }) {

    return (
        <TouchableOpacity onPress={onChange} style={{ flexDirection: 'row' }}>
            <View style={{
                width: 25,
                height: 25,
                backgroundColor: `${(checked) ? ACTIVE_COLOR : 'white'}`,
                borderColor: `${(!checked) ? DISABLED_COLOR : 'transparent'}`,
                borderRadius: 50,
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

            <Text style={{ alignSelf: 'center', marginLeft: 15, fontSize: 20 }}>All iCloud</Text>
        </TouchableOpacity>
    )
}

function GroupContacts(props) {

    const { navigation } = props

    const initialMount = useRef(true)
    const [iCloudCheckbox, setICloudCheckbox] = useState(false)
    

    useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            StatusBar.setBarStyle("light-content")
        });
        return subscribe;
    }, [])

    useEffect(() => {
        if (initialMount.current) {
            initialMount.current = false
        }else{
            // handle refreshes here
        }
    }, [iCloudCheckbox])

 
    const handleChecked = () => {
        let checked = iCloudCheckbox
        setICloudCheckbox(!checked)
    }

    return (
        <View style={{ padding: 15 }}>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ fontSize: 20, alignSelf: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 21, fontWeight: "500", color: "#007aff" }}></Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: '600', alignSelf: 'center', flex: 3, textAlign: 'center' }}></Text>
                <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 21, textAlign: 'right', fontWeight: "500", color: `${(Object.entries({}).length > 0) ? '#8E8E8F' : '#007aff'}` }}>Done</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={{ fontSize: 40, fontWeight: '700', marginBottom: 20 }}>Groups</Text>

                <View>
                    <Text>ICLOUD</Text>

                    <Checkbox
                        checked={iCloudCheckbox}
                        onChange={handleChecked}
                    />

                </View>
            </View>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, width: device_width, marginBottom: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ fontSize: 20, alignSelf: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 21, fontWeight: "500", color: "#007aff" }}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, fontWeight: '600', alignSelf: 'center', flex: 3, textAlign: 'center' }}>New Contact</Text>
                <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 21, textAlign: 'right', fontWeight: "500", color: `${(Object.entries({}).length > 0) ? '#8E8E8F' : '#007aff'}` }}>Done</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>

                <View style={{ backgroundColor: "#ededed" }}>

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

function Button({ textContent, fontSize = 16, style = {}, active = true }) {
    return (
        <TouchableOpacity style={{ fontSize: 20, alignSelf: 'center', flex: 1, ...style }}>
            <Text style={{ fontSize: fontSize, fontWeight: "500", color: `${(!active) ? '#8E8E8F' : '#007aff'}` }}>{textContent}</Text>
        </TouchableOpacity>
    )
}

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

function Input({ placeholder, name = "input", onChange = () => { console.log("Input changed") } }) {
    const [_name, setName] = useState('input')
    return (
        <TextInput placeholderTextColor="#a6a6a6" onChangeText={onChange} placeholder={placeholder} style={styles.inputBox} />
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
                            { name: "Belvis Acheampong", area: "mobile", },
                            { name: "Belinda Kumaesi", area: "mobile" },
                            { name: "Brenda Abu", area: "mobile" },
                        ]
                    },
                    {
                        title: "C",
                        data: [
                            { name: "Calvin Asantey", area: "mobile" },
                            { name: "Cerry Assumani", area: "mobile" },
                            { name: "Cindy Armah", area: "mobile" },
                        ]
                    },
                    {
                        title: "D",
                        data: [
                            { name: "Delvis Agbe", area: "mobile" },
                            { name: "Declan Nyankah", area: "mobile" },
                            { name: "Dennis Brown", area: "mobile" },
                        ]
                    },
                    {
                        title: "E", data: [
                            { name: "Elvis Agbesi", area: "mobile" },
                            { name: "Ezra Kusi", area: "mobile" },
                            { name: "Elias Famiche", area: "mobile" },
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

function UserView({ route }) {

    const [firstChar, setFirstChar] = useState()
    const [lastChar, setLastChar] = useState()

    const { name, area, } = route.params

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

    return (
        <SafeAreaView style={{ paddingHorizontal: 10, flex: 1, }}>
            <View style={{ alignSelf: 'center', marginTop: 10, marginBottom: 30, flexDirection: 'column' }}>
                <LinearGradient
                    style={{ width: 80, height: 80, borderRadius: 40, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}
                    colors={["#bdbdbd", "#9c9c9c", "#9c9c9c"]}
                >
                    <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: 'bold', color: 'white' }}>{processChars(name)}</Text>
                </LinearGradient>

                <Text style={{ fontSize: 35 }}>{name}</Text>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <CallOption text="message" icon={'chatbox-ellipses'} />
                <CallOption text="call" icon={'md-call'} />
                <CallOption text="video" icon={'videocam'} />
                <CallOption text="mail" icon={'mail'} active={false} />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 15 }}>
                    <ContactNumber area="home" number="+233 05 845 1585" />
                </View>

                <View style={{ backgroundColor: 'white', borderRadius: 10, paddingVertical: 13, paddingHorizontal: 15, marginTop: 15, height: 100 }}>
                    <Text>Notes</Text>
                    <TextInput multiline={true} />
                </View>

                <InputGroup>
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