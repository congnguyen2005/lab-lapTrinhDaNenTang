import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import BottomTabs from "./lab7bai3/BottomTab/index"; // Đảm bảo đường dẫn đúng

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}


