import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, Text, FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TopTab = createMaterialTopTabNavigator();

// Dữ liệu cho mục "Cho Bạn"
const musicData = [
    { id: "1", title: "Em của ngày hôm qua", artist: "Sơn Tùng M-TP", image: "https://nguoiduatin.mediacdn.vn/thumb_w/642/media/ha-thi-linh/2018/05/12/chay-ngay-di-song-tung-mtp1.jpg" },
    { id: "2", title: "Mất kết nối", artist: "Dương Domic", image: "https://i.scdn.co/image/ab67616100005174352d5672d70464e67c3ae963" },
    { id: "3", title: "Tái sinh", artist: "Tùng dương", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdGJHlXch3ZuBzTusRjzMybECMjRWPeGSbBQ&s" }
];

const ChoBanScreen = ({ navigation }) => {
    const [savedSongs, setSavedSongs] = useState([]);

    const handleSaveSong = (song) => {
        if (!savedSongs.some((s) => s.id === song.id)) {
            const newSavedSongs = [...savedSongs, song];
            setSavedSongs(newSavedSongs);
            navigation.navigate("Saved", { savedSongs: newSavedSongs });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={musicData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.itemContent}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.artist}>{item.artist}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveSong(item)}>
                            <Text style={styles.saveText}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

// Dữ liệu cho mục "Trực Tiếp"
const liveData = [
    {
        id: "1",
        streamer: "MixiGaming",
        title: "GTA V Roleplay - Vào tù xả stress",
        avatar: "https://upload.wikimedia.org/wikipedia/vi/a/a5/Mixigaming-Logo.jpg",
        thumbnail: "https://i.ytimg.com/vi/-zrXNP4mvEs/hq720.jpg"
    },
    {
        id: "2",
        streamer: "PewPew",
        title: "Chém gió cuối tuần",
        avatar: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/343741654_224328713546129_5406994893824882027_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEu-I1sRryQPgkbFNGsozfkYGoz4wuvH5lgajPjC68fma7o4-FBBw-a77MtYLTBezdop2JMKkGFpRkYW1Mu9hDE&_nc_ohc=Px5EN8i4PiAQ7kNvgGsNjjn&_nc_oc=AdiOU7pwLoMYlv_7nl1xnYCi76jr0e3qTPaoPkRhW2JqQqDeqQcvTeYC2zsEWN1m1ak&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=A1QaGJqFFOuevvjHeNEQmTp&oh=00_AYAqFYqG-t9RK9SH17t5x70TwNHexRc3ny45rENBR2TF1Q&oe=67BFB169",
        thumbnail: "https://kenh14cdn.com/2020/3/20/photo-1-15846764331851968227929.png"
    },
    {
        id: "3",
        streamer: "Độ Mixi",
        title: "PUBG vui vẻ cùng anh em",
        avatar: "https://upload.wikimedia.org/wikipedia/vi/a/a5/Mixigaming-Logo.jpg",
        thumbnail: "https://mixigaming.com/wp-content/uploads/2019/08/hqdefault-28-324x235.jpg"
    }
];

const TrucTiepScreen = () => (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={liveData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.liveItem}>
                    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                    <View style={styles.liveInfo}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View>
                            <Text style={styles.streamer}>{item.streamer}</Text>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.liveBadge}>
                        <Text style={styles.liveText}>LIVE</Text>
                    </View>
                </View>
            )}
        />
    </SafeAreaView>
);

// Dữ liệu cho mục "Trò Chơi"
const gameData = [
    { id: "1", title: "Liên Quân Mobile", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjZ3wDgVhqNu61IBvrZbM3-hTcPmO8xkduZDg0Gpd2oEdT7rm48Z8Hh7NK3JcpxeEuGik&usqp=CAU" },
    { id: "2", title: "PUBG Mobile", image: "https://play-lh.googleusercontent.com/wfNAn7kVvVuEhMqJMf_fm10ZlU_mxxpkmtmyt6i_sYPOElRtt_m9NEMcROl-fIoCNuk" },
    { id: "3", title: "Genshin Impact", image: "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Genshin_Impact.png" },
    { id: "4", title: "FIFA Online 4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX0ogaho9ZSppcc9AHNh6-P7Bq8iVB-JWH8g&s" },
    { id: "5", title: "Valorant", image: "https://steamuserimages-a.akamaihd.net/ugc/1289667502762077035/0BBD690EF2F84B522A6E1D34EBE5F1513685C089/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" }
];

const TroChoiScreen = () => (
    <SafeAreaView style={styles.container}>
        <FlatList
            data={gameData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            )}
        />
    </SafeAreaView>
);

const TopTabs = () => {
    return (
        <TopTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let icons = {
                        "Cho Bạn": "cart",
                        "Trực Tiếp": "videocam",
                        "Trò Chơi": "game-controller"
                    };
                    return <Ionicons name={icons[route.name]} size={20} color={color} />;
                },
                tabBarShowIcon: true,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.indicator
            })}
        >
            <TopTab.Screen name="Cho Bạn" component={ChoBanScreen} />
            <TopTab.Screen name="Trực Tiếp" component={TrucTiepScreen} />
            <TopTab.Screen name="Trò Chơi" component={TroChoiScreen} />
        </TopTab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 10
    },
    item: {
        padding: 10,
        backgroundColor: "white",
        marginVertical: 5,
        borderRadius: 10,
        elevation: 2
    },
    saveButton: {
        backgroundColor: "#4B0082",
        paddingVertical: 6,
        borderRadius: 8,
        alignItems: "center"
    },
    saveText: {
        color: "white",
        fontWeight: "bold"
    },
    itemContent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10 // Để tạo khoảng cách với nút lưu
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    artist: {
        fontSize: 14,
        color: "gray"
    },
    tabBar: {
        backgroundColor: "#4B0082"
    },
    indicator: {
        backgroundColor: "white"
    },
    liveItem: {
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 15,
        overflow: "hidden",
        elevation: 3
    },
    thumbnail: {
        width: "100%",
        height: 180
    },
    liveInfo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    streamer: {
        fontSize: 16,
        fontWeight: "bold"
    },
    liveBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "red",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 5
    },
    liveText: {
        color: "white",
        fontWeight: "bold"
    }
});

export default TopTabs;
