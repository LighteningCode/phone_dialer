import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()


let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;


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

function CustomPhoneButton({ children, input, _onPress, custom_style = {} }) {
  return (
    <TouchableOpacity
      onPress={() => (typeof _onPress === 'function') ? _onPress(input) : ""}
      style={{ ...styles.button, ...custom_style }}>
      {children}
    </TouchableOpacity>
  )
}

function KeyPad() {
  const [dial, setDial] = useState('')
  const initailMount = useRef(true)

  useEffect(() => {
    if (initailMount.current) {

      initailMount.current = false
    } else {
      // refresh
    }

  }, [dial])

  const handlePress = (input) => {
    const newDial = dial + input
    setDial(newDial)
  }

  const handleDelete = () => {
    const s = dial;
    const newDial = s.substr(0, s.length - 1)
    setDial(newDial)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ marginTop: 50, height: device_height }}>

        <View style={{ marginTop: 50, paddingHorizontal: 20, paddingVertical: 30, marginBottom: 10 }}>
          <View style={{ height: 50 }}>
            <Text style={{ fontSize: 50, textAlign: "center" }}>{dial}</Text>
          </View>

          <View style={{ height: 20 }}>

            {
              (dial === "") ?
                <Text></Text>
                :
                <Text style={{ textAlign: 'center', fontSize: 20, color: '#0288f5' }}>Add contact</Text>
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
            <CustomPhoneButton custom_style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} />

            <CustomPhoneButton custom_style={{ backgroundColor: '#00e600' }}>
              <FontAwesome5 name={"phone-alt"} color="white" size={30} />
            </CustomPhoneButton>


            {
              (dial === "") ?
                <CustomPhoneButton custom_style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }} />
                :
                <CustomPhoneButton _onPress={handleDelete} custom_style={{ backgroundColor: 'rgba(52, 52, 52, 0.0)' }}>
                  <Ionicons name="backspace" size={30} color="gray" />
                </CustomPhoneButton>
            }


          </View>
        </View>

      </View>

    </View>
  );
}

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
