import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;


function PhoneButton({input, _onPress,number }) {
  return (
    <TouchableOpacity
      onPress={() => (typeof _onPress === 'function') ? _onPress(input) : ""}
      style={styles.button}>
        <Text style={styles.dialer_text}>{number}</Text>
    </TouchableOpacity>
  )
}

function CustomPhoneButton({ children, input, _onPress }) {
  return (
    <TouchableOpacity
      onPress={() => (typeof _onPress === 'function') ? _onPress(input) : ""}
      style={styles.button}>
      {children}
    </TouchableOpacity>
  )
}

export default function App() {

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

      <View style={{ marginTop: 50, backgroundColor:"blue",height:device_height }}>

        <View style={{ marginTop: 50, paddingHorizontal: 20,paddingVertical: 50,marginBottom:10, backgroundColor:"red" }}>
          <Text style={{ fontSize: 50, textAlign: "center" }}>{dial}</Text>
        </View>

        <View style={{ flexDirection: 'column', height: 450, paddingHorizontal: 150, backgroundColor:"yellow" }}>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <PhoneButton input={1} _onPress={handlePress} number={1} />

            <PhoneButton input={2} _onPress={handlePress} number={2} />

            <PhoneButton input={3} _onPress={handlePress} number={3} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <PhoneButton input={4} _onPress={handlePress} number={4} />

            <PhoneButton input={5} _onPress={handlePress} number={5} />

            <PhoneButton input={6} _onPress={handlePress} number={6} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <PhoneButton input={7} _onPress={handlePress} number={7} />

            <PhoneButton input={8} _onPress={handlePress} number={8} />

            <PhoneButton input={9} _onPress={handlePress} number={9} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <PhoneButton input={"*"} _onPress={handlePress} number={"*"} />

            <PhoneButton input={0} _onPress={handlePress} number={0} />

            <PhoneButton input={"#"} _onPress={handlePress} number={"#"} />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

            <CustomPhoneButton>
              <Text style={{ color: "black", fontSize: 30 }}>Call</Text>
            </CustomPhoneButton>

            <CustomPhoneButton _onPress={handleDelete}>
              <Text style={{ color: "black", fontSize: 30 }}>Del</Text>
            </CustomPhoneButton>
          </View>

        </View>

      </View>

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    height: device_height
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
    fontWeight: 'bold',
    padding: 5,
    margin: 10,
    width: 75,
    height: 75,
    borderRadius: 1200,
  },
  dialer_text:{
    color: "#2b2b2b",
    fontSize: 30,
    fontWeight: '600'
  },
  dialer_view: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'column',
    paddingVertical: 150
  }
});
