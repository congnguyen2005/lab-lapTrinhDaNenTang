import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';

export default function Bai1Screen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Ô nhập liệu */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nhập họ tên" />
        <TextInput style={styles.input} placeholder="Nhập số điện thoại" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Nhập mật khẩu" secureTextEntry />
      </View>

      {/* Hộp chứa văn bản */}
      <ScrollView style={styles.textBox}>
        <Text style={[styles.text, styles.yellow]}>Em vào đời bằng vàng đỏ</Text>
        <Text style={styles.text}>Anh vào đời bằng nước trà</Text>
        <Text style={[styles.text, styles.white]}>Bàng con mưa thơm mùi đất</Text>
        <Text style={styles.text}>Em vào đời bằng kế hoạch, anh vào đời bằng mộng mơ</Text>
        <Text style={styles.text}>Lý trí em là <Text style={styles.underline}>cộng</Text>, con trái tim anh là <Text style={styles.underline}>đồng</Text></Text>
        <Text style={[styles.text, styles.red]}>Anh chỉ muốn chân mình đạp đất không muốn đạp ai dưới chân mình</Text>
        <Text style={[styles.text, styles.white]}>Em vào đời bằng mây trắng</Text>
        <Text style={[styles.text, styles.green]}>Em vào đời bằng nắng xanh</Text>
        <Text style={[styles.text, styles.yellow]}>Em vào đời bằng đại lộ và con đường đó giờ vàng ánh</Text>
      </ScrollView>

      {/* Nút chuyển sang Bài 2 */}
      <Button title="Đi tới Bài 3" onPress={() => navigation.navigate('Bai3')} />

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      paddingLeft: 10,
      fontSize: 16,
      backgroundColor: '#fff',
    },
    textBox: {
      backgroundColor: 'blue',
      padding: 20,
      borderRadius: 5,
      width: '100%',
      maxHeight: 300,
    },
    text: {
      color: 'white',
      fontSize: 16,
      marginBottom: 5,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    red: {
      color: 'red',
      fontWeight: 'bold',
    },
    yellow: {
      color: 'yellow',
      fontWeight: 'bold',
    },
    white: {
      color: 'white',
    },
    green: {
      color: 'lightgreen',
    },
  });
