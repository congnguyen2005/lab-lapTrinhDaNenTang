import React, { useState } from "react";
import { View, Button, SafeAreaView, ScrollView } from "react-native";
// import Bai1 from "./lab4/bai1";
// import Bai2 from "./lab4/bai2";
// import Bai3 from "./lab4/bai3";
import Bai5_1 from "./lab5/bai1";
import Bai5_2 from "./lab5/bai2";
import Bai5_3 from "./lab5/bai3";

const screens = [
//   { id: 1, title: "Bài 1", component: <Bai1 /> },
//   { id: 2, title: "Bài 2", component: <Bai2 /> },
//   { id: 3, title: "Bài 3", component: <Bai3 /> },
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
       <Bai5_2/>
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Hiển thị màn hình hiện tại */}
      <View style={{ flex: 1 }}>{screens.find((s) => s.id === screen)?.component}</View>

      {/* Thanh button chuyển màn hình */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10 }}>
        {screens.map((s) => (
          <Button key={s.id} title={s.title} onPress={() => setScreen(s.id)} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default App;
