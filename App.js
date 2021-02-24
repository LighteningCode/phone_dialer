import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let device_width = Dimensions.get("window").width;
let device_height = Dimensions.get("window").height;

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.dialer_view}>

        <TouchableOpacity
          onPress={() => console.log("Hello")}
          style={styles.button}>
          <Text style={{ color: "white", fontSize: 30 }}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Hello")}
          style={styles.button}>
          <Text style={{ color: "white", fontSize: 30 }}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Hello")}
          style={styles.button}>
          <Text style={{ color: "white", fontSize: 30 }}>1</Text>
        </TouchableOpacity>

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
    marginVertical: 40,
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
