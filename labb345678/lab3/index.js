import { StyleSheet, Text, View, TextInput } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
const Lab3 = () => {
    const [name, setName] = useState("");
    return (
        <View style={styles.container}>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nhap ho ten"
                style={styles.tipStyle}
            />
            <Text style={styles.baseText}>
                Em vao doi bang <Text style={styles.boldText}>vang do</Text>
            </Text>
        </View>
    );
};
export default Lab3;