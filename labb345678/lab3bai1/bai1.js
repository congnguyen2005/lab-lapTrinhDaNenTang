import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Bai1 = () => {
  return (
    <View style={styles.container}>
      {/* Các hộp nhập liệu */}
      <TextInput style={styles.input} placeholder="Nhập họ tên" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Nhập số điện thoại" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Nhập mật khẩu" placeholderTextColor="#888" secureTextEntry />

      {/* Phần văn bản */}
      <View style={styles.box}>
        <Text style={[styles.text, styles.textYellow]}>
          Em vào đời bằng <Text style={styles.highlightYellow}>vàng đỏ</Text>, anh vào đời bằng nước trà
        </Text>
        <Text style={[styles.text, styles.textWhite]}>
          Bằng cơn mưa thơm <Text style={styles.highlightWhite}>mùi đất</Text> và bằng hoa dại mọc trước nhà
        </Text>
        <Text style={[styles.text, styles.textBlue]}>
          Em vào đời bằng kế hoạch, anh vào đời bằng <Text style={styles.highlightBlue}>mộng mơ</Text>
        </Text>
        <Text style={[styles.text, styles.textUnderline]}>
          Lý trí em là{' '}
          <Text style={styles.highlightUnderline}>c  ô  n  g  c  ụ</Text>, còn trái tim anh là{' '}
          <Text style={styles.highlightUnderline}>đ ộ n g c ơ</Text>
        </Text>
        <Text style={[styles.text, styles.textWhite]}>
          Em vào đời nhiều đồng nghiệp, anh vào đời nhiều thân tình
        </Text>
        <Text style={[styles.text, styles.textRed]}>
          Anh chỉ muốn chân mình đạp đất không muốn đạp ai dưới chân mình
        </Text>
        <Text style={[styles.text, styles.textYellow]}>
          Em vào đời bằng <Text style={styles.highlightYellow}>mây trắng</Text>, em vào đời bằng nắng xanh
        </Text>
        <Text style={[styles.text, styles.textRed]}>
          Em vào đời bằng đại lộ, và con đường đó có <Text style={styles.highlightRed}>vàng anh</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF', // Nền trắng
    padding: 10,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  box: {
    width: '90%',
    backgroundColor: '#0000FF', // Nền màu xanh dương
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 10, // Kích thước chữ
    lineHeight: 28, // Khoảng cách giữa các dòng
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif', // Kiểu font
  },
  textYellow: {
    color: 'yellow',
  },
  textWhite: {
    color: 'white',
  },
  textBlue: {
    color: 'lightblue',
  },
  textRed: {
    color: 'red',
  },
  textUnderline: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  highlightYellow: {
    color: 'yellow',
    fontWeight: 'bold',
  },
  highlightWhite: {
    color: 'white',
    fontWeight: 'bold',
  },
  highlightBlue: {
    color: 'lightblue',
    fontWeight: 'bold',
  },
  highlightRed: {
    color: 'red',
    fontWeight: 'bold',
  },
  highlightUnderline: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default Bai1;
