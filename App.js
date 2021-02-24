import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;


function PhoneButton({ children, input, _onPress }) {
  return (
    <>
      <TouchableOpacity
        onPress={(_onPress) ? _onPress(input) : _onPress("") }
        style={styles.button}>
        {children}
      </TouchableOpacity>
    </>
  )
}

export default function App() {

  const [dial, setDial] = useState('')
  const initailMount = useRef(true)

  useEffect(() => {
    if (initailMount.current) {
      
      initailMount.current = false
    }else{
      // refresh
    }

  }, [dial])

  const handlePress = (input) => {
    const newDial = dial + input
    setDial(newDial)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={{marginTop: 50}}>
        <Text style={{fontSize: 50}}>{dial}</Text>
      </View>

      <View style={styles.dialer_view}>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <PhoneButton input={1} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>1</Text>
          </PhoneButton>

          <PhoneButton input={2} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>2</Text>
          </PhoneButton>

          <PhoneButton input={3} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>3</Text>
          </PhoneButton>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <PhoneButton input={4} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>4</Text>
          </PhoneButton>

          <PhoneButton input={5} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>5</Text>
          </PhoneButton>

          <PhoneButton input={6} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>6</Text>
          </PhoneButton>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <PhoneButton input={7} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>7</Text>
          </PhoneButton>

          <PhoneButton input={8} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>8</Text>
          </PhoneButton>

          <PhoneButton input={9} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>9</Text>
          </PhoneButton>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <PhoneButton input={"*"} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>*</Text>
          </PhoneButton>

          <PhoneButton input={0} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>0</Text>
          </PhoneButton>

          <PhoneButton input={"#"} _onPress={handlePress}>
            <Text style={{ color: "white", fontSize: 30 }}>#</Text>
          </PhoneButton>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <PhoneButton>
            <Text style={{ color: "white", fontSize: 30 }}>Call</Text>
          </PhoneButton>
        </View>

      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32a895',
    fontWeight: 'bold',
    padding: 10,
    marginHorizontal: 10,
    width: 70,
    height: 70,
    borderRadius: 1200,
  },
  dialer_view: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'column',
    paddingVertical: 150
  }
});
