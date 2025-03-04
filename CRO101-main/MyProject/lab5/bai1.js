
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Lab51 = () => {
  let [fontsLoaded] = useFonts({
    Shafarik: require("../assets/fonts/Shafarik-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return AppLoading;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>day la font rat khac</Text>
    </View>
  );
};
export default Lab51;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Shafarik",
    fontSize: 25,
  },
});
