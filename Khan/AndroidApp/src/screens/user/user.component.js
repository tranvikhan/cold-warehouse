import {
  Avatar,
  Icon,
  Layout,
  ListItem,
  Text,
  Toggle,
  useTheme,
} from "@ui-kitten/components";
import { StyleSheet, ScrollView, Alert } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { toggleTheme } from "../../redux/actions";

export default function User() {
  const theme = useTheme();
  const [checkNotification, setCheckNotification] = React.useState(true);
  const state = useSelector((state) => state.Auth);
  const themeColor = useSelector((state) => state.Layout.theme);
  const dispatch = useDispatch();

  const getTheme = () => {
    return themeColor == "dark";
  };
  const [checkDarkMode, setCheckDarkMode] = React.useState(getTheme);
  const toggleThemeColor = (isDark) => {
    dispatch(toggleTheme(isDark ? "dark" : "light"));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listItem: {
      margin: 5,
      borderRadius: 10,
      minHeight: 55,
    },
    category: {
      marginTop: 10,
      marginLeft: 8,
    },
    userAvatar: {
      margin: 15,
    },
    onPress: {
      backgroundColor: "red",
    },
  });

  return (
    <Layout style={styles.container} level="2">
      <ScrollView showsHorizontalScrollIndicator={false}>
        <ListItem
          disabled
          style={styles.listItem}
          title={state.user.user.fullname}
          description={state.user.user.email}
          accessoryLeft={(props) => (
            <Avatar
              size="giant"
              source={{ uri: state.user.user.avatar }}
              style={styles.userAvatar}
            ></Avatar>
          )}
        />
        <Text style={styles.category} category="p2" appearance="hint">
          Tài khoản
        </Text>
        <ListItem
          onPress={() => {
            Alert.alert(String(state.user.user));
          }}
          style={styles.listItem}
          title="Thông tin"
          accessoryLeft={(props) => <Icon name="info-outline" {...props} />}
        />
        <ListItem
          style={styles.listItem}
          title="Đổi mật khẩu"
          accessoryLeft={(props) => <Icon name="unlock-outline" {...props} />}
        />
        <ListItem
          onPress={() => {
            dispatch(logoutUser());
          }}
          style={styles.listItem}
          title="Đăng xuất"
          accessoryLeft={(props) => <Icon name="log-out-outline" {...props} />}
        />
        <Text style={styles.category} category="p2" appearance="hint">
          Giao diện
        </Text>
        <ListItem
          style={styles.listItem}
          title="Chế độ tối"
          accessoryLeft={(props) => <Icon name="globe-outline" {...props} />}
          accessoryRight={(props) => (
            <Toggle
              checked={checkDarkMode}
              onChange={() => {
                setCheckDarkMode(!checkDarkMode);
                toggleThemeColor(!checkDarkMode);
              }}
            ></Toggle>
          )}
        />
        <Text style={styles.category} category="p2" appearance="hint">
          Thông báo
        </Text>
        <ListItem
          style={styles.listItem}
          title="Thông báo"
          accessoryLeft={(props) => <Icon name="moon-outline" {...props} />}
          accessoryRight={(props) => (
            <Toggle
              checked={checkNotification}
              onChange={() => {
                setCheckNotification(!checkNotification);
              }}
            ></Toggle>
          )}
        />
      </ScrollView>
    </Layout>
  );
}
