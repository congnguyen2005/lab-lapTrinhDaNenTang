import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import UserListScreen from "./Lab8/UserListScreen";
import EditUserScreen from "./Lab8/EditUserScreen";
import AddUserScreen from "./Lab8/AddUserScreen";
import UserDetailScreen from "./Lab8/UserDetailScreen";



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserListScreen">
        <Stack.Screen name="UserListScreen" component={UserListScreen} options={{ title: "Danh sách người dùng" }} />
        <Stack.Screen name="EditUserScreen" component={EditUserScreen} options={{ title: "Chỉnh sửa người dùng" }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
