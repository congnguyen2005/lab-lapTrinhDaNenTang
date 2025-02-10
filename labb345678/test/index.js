import React from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import { RefreshControl, ScrollView, StatusBar, FlatList } from "react-native";
import { styles } from "./styles";
const Lab42 = () => {
  const STYLES = ["default", "dark-content", "light-content"];
  const [statusBarStyle, setStatusBarStyle] = React.useState(STYLES[0]);
  const [refreshing, setRefreshing] = React.useState(false);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refereshing={refreshing}
          onRefresh={changeStatusBarStyle}
        />
      }
    >
      <StatusBar
        barStyle={statusBarStyle}
        translucent
        backgroundColor={"transparent"}
      />
      <Text style={styles.text}> Keo xuong de doi mau Status bar </Text>
    </ScrollView>
  );
};

export default Lab42;
