import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import KeyPad from './screens/Keypad';



const Tab = createBottomTabNavigator()


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;





function Contacts() {
  return (
    <View>
      <Text>hello</Text>
    </View>
  )
}

function Favorites() {
  return (
    <View>
      <Text>hello</Text>
    </View>
  )
}

function VoiceMail() {
  return (
    <View style={{backgroundColor:"red"}}>
      <Text>hello</Text>
    </View>
  )
}

function Recents() {
  return (
    <View>
      <Text>hello</Text>
    </View>
  )
}


export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={"Keypad"} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Keypad') {
            iconName = focused
              ? 'keypad'
              : 'keypad'
              return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Contacts') {
            iconName = focused
              ? 'people'
              : 'people-sharp'
              return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Recents') {
            iconName = focused
              ? 'clock'
              : 'clock'
              return <FontAwesome5 name={iconName} size={size} color={color} />;
          }  else if (route.name === 'Voicemail') {
            iconName = focused
              ? 'voicemail'
              : 'voicemail'
              return <FontAwesome5 name={iconName} size={size} color={color} />;
          } else if (route.name === 'Favorites') {
            iconName = focused
              ? 'star'
              : 'star'
              return <Ionicons name={iconName} size={size} color={color} />;
          }

        },
      })}

      >
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="Recents" component={Recents} />
        <Tab.Screen name="Keypad" component={KeyPad} />
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name="Voicemail" component={VoiceMail} />
      </Tab.Navigator>
    </NavigationContainer >
  );
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
