import { StyleSheet, Text, View,StatusBar, Image } from 'react-native'
import React from 'react'

export default function SplashScreen() {
  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Image 
        source={require("../assets/images/splash.png")}
        resizeMode='contain'
        style={{width: "100%",height: "50%",marginBottom: 40}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }
})