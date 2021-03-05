import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

const ACTIVE_COLOR = "#007aff"
const DISABLED_COLOR = "#8E8E8F"


function FavoriteListItem({ item, editMode }) {
    return (
        <View style={{ flexDirection: 'row' }}>


            {
                (editMode)
                    ?
                    <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
                        <TouchableOpacity style={{ alignSelf: 'center' }} >
                            <FontAwesome5 name="minus-circle" size={18} color="#ff2424" />
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }



            <View style={{ flex: 1, justifyContent: 'center', marginRight: 20, marginLeft: 20 }}>
                <View style={{ alignSelf: 'center' }}>
                    <LinearGradient
                        style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', flexDirection: 'row' }}
                        colors={["#bdbdbd", "#9c9c9c", "#9c9c9c"]}
                    >
                        <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>{item.profileChars}</Text>
                    </LinearGradient>
                </View>
            </View>


            <View style={{ flex: 9, justifyContent: 'space-between', flexDirection: 'row', height: 65, paddingHorizontal: 5, borderBottomWidth: 0.75, borderColor: "#d1d1d1" }}>

                <View style={{ flex: 5, alignSelf: 'center', alignContent: 'flex-start', justifyContent: 'space-around' }}>
                    <Text style={{ alignSelf: 'flex-start', fontSize: 18, fontWeight: '600', color: "black" }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name="phone" size={16} color="#a6a6a6" style={{ marginRight: 10 }} />
                        <Text style={{ alignSelf: 'flex-start', color: "#bfbfbf" }}>{item.area}</Text>
                    </View>
                </View>

                <View style={{ flex: 1, alignSelf: 'center' }}>
                    {
                        (editMode)
                            ?
                            <FontAwesome5 style={{ alignSelf: 'flex-end', marginRight: 5 }} name="grip-lines" size={18} color={DISABLED_COLOR} />
                            :
                            <Ionicons style={{ alignSelf: 'flex-end', marginRight: 5 }} color="#0084ff" name="information-circle-outline" size={22} />
                    }
                </View>

            </View>
        </View>
    )
}


function Favorites() {

    const [allFavorites, setAllFavories] = useState({
        data: [
            { name: "Mercedex AMG GTR", area: "mobile", profileChars: "MG" },
            { name: "Elvis Agbesi", area: "mobile", profileChars: "EA" },
            { name: "Emmanuel Ashitey", area: "Whatsapp Audio", profileChars: "EA" },
            { name: "Mum", area: "home", profileChars: "M" },
            { name: "Michael Agbo Soli", area: "work", profileChars: "MS" },
        ]
    })

    const [editMode, setEditMode] = useState(false)

    return (
        <SafeAreaView style={{}}>
            <StatusBar style="auto" />
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, width: device_width, borderBottomColor: "#bdbdbd", borderBottomWidth: 0.8 }}>
                    <View style={{ alignSelf: 'center', flex: 1, alignItems: 'flex-start' }}>
                        <Ionicons name="add" size="30" color="#3385ff" />
                    </View>
                    <View style={{ alignSelf: 'center', flex: 1 }}>
                        <Text style={{ fontSize: 25, fontWeight: '500', alignSelf: 'center', flex: 1, textAlign: 'center' }}>Favorites</Text>
                    </View>
                    <TouchableOpacity onPress={() => setEditMode(!editMode)} style={{ flex: 1, alignSelf: 'center',paddingVertical: 5 }}>
                        <Text style={{ fontSize: 20, alignSelf: 'flex-end', color: "#3385ff", textAlign: 'right' }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', height: device_height }}>
                <ScrollView>
                    <View>
                        <FlatList
                            data={allFavorites.data}
                            renderItem={({ item, index }) => <FavoriteListItem key={item.name + index} editMode={editMode} item={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
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
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    }
});


export default Favorites;