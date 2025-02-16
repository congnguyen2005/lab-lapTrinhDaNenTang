import React, { useState, useEffect } from "react";
import { View, Button, SafeAreaView, ScrollView, Text } from "react-native";
import * as Font from "expo-font";

// Import các bài lab
import Bai5_1 from "./lab5/bai1";
import Bai5_2 from "./lab5/bai2";
import Bai5_3 from "./lab5/bai3";

const loadFonts = async () => {
  await Font.loadAsync({
    "Shafarik-Regular": require("./assets/font/Shafarik-Regular.ttf"),
  });
};

const screens = [
  {
    id: 1,
    title: "Bai1 Lab5",
    component: (
      <ScrollView>
        <Bai5_1 />
      </ScrollView>
    ),
  },
  {
    id: 2,
    title: "Bai2 Lab 5",
    component: (
      <ScrollView>
        <Bai5_2 />
      </ScrollView>
    ),
  },
  {
    id: 3,
    title: "Bai3 Lab 5",
    component: (
      <ScrollView>
        <Bai5_3 />
      </ScrollView>
    ),
  },
];

const App = () => {
  const [screen, setScreen] = useState(1);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Hiển thị màn hình hiện tại */}
      <View style={{ flex: 1 }}>{screens.find((s) => s.id === screen)?.component}</View>

      {/* Thanh button chuyển màn hình */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        {screens.map((s) => (
          <Button
            key={s.id}
            title={s.title}
            onPress={() => setScreen(s.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;
