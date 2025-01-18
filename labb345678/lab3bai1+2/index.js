import { StyleSheet, Text, View, TextInput, Modal } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
const Lab3 = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nhập họ tên"
                style={styles.tipStyle}
            />
            <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                style={styles.tipStyle}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu"
                secureTextEntry={true}
                style={styles.tipStyle}
            />
            <View style={styles.container}>
                {/* Line 1 */}
                <Text style={styles.baseText}>
                    Em vào đợi bằng{' '}
                    <Text style={[styles.boldText, { color: 'red' }]}>vang đỏ</Text> anh vào đợi bằng{' '}
                    <Text style={[styles.boldText, { color: 'yellow' }]}>nước trà</Text>
                </Text>

                {/* Line 2 */}
                <Text style={styles.baseText}>
                    Bằng con mưa thơm{' '}
                    <Text style={[styles.boldText, { fontSize: 20, fontStyle: 'italic' }]}>mùi đất</Text>
                    <Text> và </Text>
                    <Text style={[{ fontSize: 10, fontStyle: 'italic' }]}>
                        bằng hoa dại mọc trước nhà
                    </Text>
                </Text>

                {/* Line 3 */}
                <Text style={[
                    styles.baseText,
                    styles.italicText,
                    styles.boldText,
                    styles.grayText,
                ]}>
                    Em vào đợi bằng kế hoạch anh vào đợi bằng mộng mơ
                </Text>

                {/* Line 4 */}
                <Text style={styles.baseText}>
                    Lý trí em là{' '}
                    <Text style={{
                        textDecorationLine: 'underline',
                        letterSpacing: 20,
                        fontWeight: 'bold',
                    }}>
                        công cụ{' '}
                    </Text>
                    còn trái tim anh là{' '}
                    <Text style={{
                        textDecorationLine: 'underline',
                        letterSpacing: 20,
                        fontWeight: 'bold',
                    }}>
                        dòng chảy{' '}
                    </Text>
                </Text>

                {/* Line 5 */}
                <Text style={[styles.baseText, { textAlign: 'right' }]}>
                    Em vào đời nhiều đồng nghiệp anh vào đợi nhiều thân tình
                </Text>

                {/* Line 6 */}
                <Text style={[
                    styles.baseText,
                    {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'orange',
                    },
                ]}>
                    Anh chỉ muốn chân mình đập đất không muốn đạp ai dưới chân mình
                </Text>

                {/* Line 7 */}
                <Text style={[
                    styles.baseText,
                    { fontWeight: 'bold', color: 'black' },
                ]}>
                    Em vào đợi bằng <Text style={{ color: 'white' }}>mây trắng</Text> em vào đợi bằng <Text style={{ color: 'yellow' }}>nắng xanh</Text>
                </Text>

                {/* Line 8 */}
                <Text style={[
                    styles.baseText,
                    { fontWeight: 'bold', color: 'black' },
                ]}>
                    Em vào đợi bằng <Text style={{ color: 'yellow' }}>đại lộ</Text> và còn đường dài <Text style={{ color: 'white' }}>vắng anh</Text>
                </Text>
            </View>
        </View>
    );
};
export default Lab3;