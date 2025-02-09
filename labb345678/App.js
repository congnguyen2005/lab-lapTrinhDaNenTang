import React, { useState } from "react";
import { View, Button } from "react-native";
import Bai1 from "./lab4/bai1";
import Bai2 from "./lab4/bai2";
import Bai3 from "./lab4/bai3";

const App = () => {
  const [screen, setScreen] = useState(1);

  return (
    <View style={{ flex: 1 }}>
      {screen === 1 && <Bai1 />}
      {screen === 2 && <Bai2 />}
      {screen === 3 && <Bai3 />}

      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        <Button title="Bài 1" onPress={() => setScreen(1)} />
        <Button title="Bài 2" onPress={() => setScreen(2)} />
        <Button title="Bài 3" onPress={() => setScreen(3)} />
      </View>
    </View>
  );
};

export default App;
