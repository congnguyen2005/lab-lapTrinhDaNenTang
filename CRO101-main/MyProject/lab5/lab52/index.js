import { StatusBar } from "expo-status-bar";
import { ImageBackground, TouchableOpacity, View, Text } from "react-native"; // Thêm import Text
import { styles } from "./styles";

const Lab52 = () => {
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#fff"/>
            <ImageBackground source={require('../asset/image.png')}
                style={styles.image}>
                <View style={styles.details}>
                    <Text style={styles.text}>
                        <Text style={styles.firstLine}> Discover {'\n'}</Text>
                        <Text style={styles.secondLine}>world with us</Text>
                    </Text>
                    <Text style={styles.textStyle}>Discover world with us</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Get started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

export default Lab52;