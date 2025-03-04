
"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { Checkbox } from "react-native-paper"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated"

const BottomTab = createBottomTabNavigator()
const Stack = createStackNavigator()

// Album data with multiple categories
const albumCategories = {
  "Giày Nike": [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/3f/5e/b8/3f5eb87551d2303276b16c5094c1141e.jpg",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/2d/e1/cb/2de1cb31bc3d6863b0f84f67ae2586a9.jpg",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/34/d1/91/34d1911a6d32e6bd1d2cddbb741382f8.jpg",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/2f/52/e6/2f52e69417090ff5ccb5eec379b78e65.jpg",
    },
  ],
  "Giày Adidas": [
    {
      id: 5,
      image:
        "https://i.pinimg.com/736x/e6/32/b7/e632b75298714391f215d67a01aa7f22.jpg",
    },
    {
      id: 6,
      image:
        "https://i.pinimg.com/736x/4a/88/1e/4a881e7cfe84f52c20c3a329f6fc49e1.jpg",
    },
    {
      id: 7,
      image:
        "https://i.pinimg.com/736x/e5/90/b7/e590b7fe501d790721801397f9be05cf.jpg",
    },
    {
      id: 8,
      image:
        "https://i.pinimg.com/736x/a9/eb/4f/a9eb4fc7216a96bf07146e20093955f5.jpg",
    },
  ],
  "Giày Thể Thao": [
    {
      id: 9,
      image:
        "https://i.pinimg.com/736x/0a/10/61/0a1061ffd74ee7507e42c98c72c1e7cf.jpg",
    },
    {
      id: 10,
      image:
        "https://i.pinimg.com/736x/b1/65/03/b16503e15be8f59538876aaf9ad7ba2d.jpg",
    },
    {
      id: 11,
      image:
        "https://i.pinimg.com/736x/6d/27/9a/6d279a424a212e96eb7e1b581137ca39.jpg",
    },
    {
      id: 12,
      image:
        "https://i.pinimg.com/736x/51/a0/0b/51a00b6fc736f129190acbd1006323d9.jpg",
    },
  ],
  "Giày Thời Trang": [
    {
      id: 13,
      image:
        "https://i.pinimg.com/736x/fc/e6/eb/fce6ebcf1e16f3934fd56a098a7840f4.jpg",
    },
    {
      id: 14,
      image:
        "https://i.pinimg.com/736x/43/0f/4a/430f4a02727366db2582fc22284317cc.jpg",
    },
    {
      id: 15,
      image:
        "https://i.pinimg.com/736x/53/4d/a9/534da9e981c5681ebd66002572361fcb.jpg",
    },
    {
      id: 16,
      image:
        "https://i.pinimg.com/736x/04/6f/d4/046fd4e13d6504d5df1ab5a7c6f0ccad.jpg",
    },
  ],
  "Giày Đặc Biệt": [
    {
      id: 17,
      image:
        "https://i.pinimg.com/736x/63/37/81/633781f9873aceb31d509d4b7dc7cd17.jpg",
    },
    {
      id: 18,
      image:
        "https://i.pinimg.com/736x/2e/9a/42/2e9a424172d5bbf80cf07f11a0280bf6.jpg",
    },
    {
      id: 19,
      image:
        "https://i.pinimg.com/736x/0f/77/bb/0f77bb6f5c52193a74e9049da00a03cf.jpg",
    },
    {
      id: 20,
      image:
        "https://i.pinimg.com/736x/ac/4a/10/ac4a10acf310580507ffd9886762ddd7.jpg",
    },
  ],
}

const CollectionScreen = ({ route }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.selectedCategory || Object.keys(albumCategories)[0],
  )

  useEffect(() => {
    if (route.params?.selectedCategory) {
      setSelectedCategory(route.params.selectedCategory)
    }
  }, [route.params?.selectedCategory])
  const categories = Object.keys(albumCategories)
  const { width } = Dimensions.get("window")

  const translateX = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    translateX.value = 0
    opacity.value = 1

    translateX.value = withRepeat(
      withSequence(withTiming(-width, { duration: 20000, easing: Easing.linear }), withTiming(0, { duration: 0 })),
      -1,
      false,
    )

    opacity.value = withRepeat(
      withSequence(withTiming(0.6, { duration: 2000 }), withTiming(1, { duration: 2000 })),
      -1,
      true,
    )
  }, [width, translateX, opacity])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.categoryMenuContainer, fadeStyle]}>
        <Animated.View style={[styles.categoryMenuContent, animatedStyle]}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextActive]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Animated.View>

      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
          {albumCategories[selectedCategory].map((item) => (
            <View key={item.id} style={styles.imageCard}>
              <Image source={{ uri: item.image }} style={styles.detailImage} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  const albums = Object.keys(albumCategories).map((category, index) => ({
    id: index + 1,
    title: category,
    image: albumCategories[category][0].image,
    count: albumCategories[category].length,
  }))

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Bộ Sưu Tập Giày</Text>
      <View style={styles.albumGrid}>
        {albums.map((album) => (
          <TouchableOpacity
            key={album.id}
            style={styles.albumCard}
            onPress={() => navigation.navigate("Collection", { selectedCategory: album.title })}
          >
            <Image source={{ uri: album.image }} style={styles.albumImage} />
            <View style={styles.albumInfo}>
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumCount}>{album.count} photos</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Xuan Thuan")
  const [age, setAge] = useState("20")

  const handleSave = () => {
    setIsEditing(false)
  }

  const interests = [
    { emoji: "🎨", label: "Art" },
    { emoji: "🥋", label: "Martial arts" },
    { emoji: "📸", label: "Landscape photography" },
    { emoji: "✈️", label: "Travel" },
  ]

  return (
    <View style={styles.profileContainer}>
      <ScrollView style={styles.profileContent} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: "https://i.imgur.com/7lsPp45.jpeg" }} style={styles.avatar} />
        </View>

        <View style={styles.formContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileAge}>Age: {age}</Text>
            </View>
          )}
        </View>

        <View style={styles.interestsContainer}>
          <Text style={styles.interestsTitle}>Interests:</Text>
          <View style={styles.interestsList}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.interestItem}>
                <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                <Text style={styles.interestLabel}>{interest.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.editButton, isEditing && styles.cancelButton]}
        onPress={() => setIsEditing(!isEditing)}
      >
        <Text style={[styles.editButtonText, isEditing && styles.cancelButtonText]}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isExamMode, setIsExamMode] = useState(false)
  const [isSilent, setIsSilent] = useState(false)

  return (
    <View style={styles.settingsContainer}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Exam Mode</Text>
        <Switch
          value={isExamMode}
          onValueChange={setIsExamMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isExamMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Silent Mode</Text>
        <Checkbox status={isSilent ? "checked" : "unchecked"} onPress={() => setIsSilent(!isSilent)} />
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          // Add logout logic here
          console.log("Logout pressed")
          // You would typically clear user session, tokens, etc.
          // Then navigate to login screen or home screen
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Albums" component={HomeScreen} />
  </Stack.Navigator>
)

const Bai3_CombinedTabs = ({ navigation }) => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline"
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline"
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline"
            } else if (route.name === "Collection") {
              iconName = focused ? "images" : "images-outline"
            }

            return <Icon name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarLabelPosition: "beside-icon",
        })}
      >
        <BottomTab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <BottomTab.Screen
          name="Collection"
          component={CollectionScreen}
          options={({ navigation }) => ({
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => navigation.navigate("Collection", { selectedCategory: null })}
              />
            ),
          })}
        />
        <BottomTab.Screen name="Profile" component={ProfileScreen} />
        <BottomTab.Screen name="Settings" component={SettingsScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  categoryMenuContainer: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  categoryMenuContent: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    minWidth: 100,
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: "#007AFF",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  categoryButtonTextActive: {
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#333",
  },
  albumGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    justifyContent: "space-between",
  },
  albumCard: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  albumImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  albumInfo: {
    padding: 12,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  albumCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    justifyContent: "space-between",
  },
  imageCard: {
    width: "48%",
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileContent: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  profileInfo: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  profileAge: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  interestsContainer: {
    padding: 20,
  },
  interestsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  interestsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  interestItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  interestEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  interestLabel: {
    fontSize: 16,
    color: "#333",
  },
  editButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: "#007AFF",
    margin: 10,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#4CD964",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingLabel: {
    fontSize: 18,
  },
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  topTabBar: {
    backgroundColor: "#f0f0f0",
    height: 60,
  },
  topTabLabel: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "none",
  },
  tabBarIndicator: {
    backgroundColor: "#007AFF",
    height: 3,
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  profileContent: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4cd964",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default Bai3_CombinedTabs
