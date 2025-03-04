import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { View, Text, StyleSheet, Image } from "react-native"

const Tab = createMaterialTopTabNavigator()

const images = {
  "Tab 1": "https://picsum.photos/id/1015/300/200",
  "Tab 2": "https://picsum.photos/id/1016/300/200",
  "Tab 3": "https://picsum.photos/id/1019/300/200",
}

const Screen = ({ name }) => (
  <View style={styles.screen}>
    <Text style={styles.screenTitle}>{name}</Text>
    <Image source={{ uri: images[name] }} style={styles.image} />
  </View>
)

const Tab1Screen = () => <Screen name="Tab 1" />
const Tab2Screen = () => <Screen name="Tab 2" />
const Tab3Screen = () => <Screen name="Tab 3" />

const Bai2_TopTabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: styles.tabBarIndicator,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tab.Screen name="Tab 1" component={Tab1Screen} />
        <Tab.Screen name="Tab 2" component={Tab2Screen} />
        <Tab.Screen name="Tab 3" component={Tab3Screen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  tabBar: {
    backgroundColor: "#f0f0f0",
  },
  tabBarIndicator: {
    backgroundColor: "#007AFF",
    height: 3,
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "none",
  },
})

export default Bai2_TopTabs