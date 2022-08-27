import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { loginUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import MyAlert from "../../components/alert.component";

const LoadingIndicator = (props) => {
  if (props.isLoading)
    return (
      <View style={[props.style, styles.indicator]}>
        <Spinner size="small" status="basic" />
      </View>
    );
  return <></>;
};

const SignIn = ({ navigation }) => {
  const [username, setUsername] = React.useState("vikhan");
  const [check, setCheck] = React.useState({
    usernameColor: "basic",
    passwordColor: "basic",
  });

  const [password, setPassword] = React.useState("123456");
  const [visible, setVisible] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const state = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const submitLogin = () => {
    setCheck({
      usernameColor: username === "" ? "danger" : "basic",
      passwordColor: password === "" ? "danger" : "basic",
    });
    if (username != "" && password != "")
      dispatch(loginUser(username, password));
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  React.useEffect(() => {
    setVisible(state.errorLogin && !state.loading);
  }, [state.loading, state.errorLogin]);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container} level="1">
      <MyAlert
        status="danger"
        title="Lỗi"
        text={state.errorLogin}
        visible={visible}
        setVisible={(value) => setVisible(value)}
      ></MyAlert>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
        <Text style={styles.text} category="h5">
          QUẢN LÝ NHIỆT ĐỘ KHO LẠNH
        </Text>
        <View style={styles.inputView}>
          <Input
            size="large"
            selectionColor="#3C4ED5"
            placeholder="Nhập tên đăng nhập"
            value={username}
            status={check.usernameColor}
            onChangeText={(nextValue) => setUsername(nextValue)}
          />
        </View>
        <View style={{ ...styles.inputView, marginBottom: 10 }}>
          <Input
            size="large"
            selectionColor="#3C4ED5"
            value={password}
            placeholder="Nhập mật khẩu"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            status={check.passwordColor}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </View>
        <Button
          appearance="ghost"
          style={styles.forgot}
          status="basic"
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          Quên mật khẩu ?
        </Button>
        <View style={styles.inputView}>
          <Button
            size="large"
            status="primary"
            onPress={submitLogin}
            accessoryLeft={() => <LoadingIndicator isLoading={state.loading} />}
          >
            ĐĂNG NHẬP
          </Button>
        </View>
        <View style={styles.inputView}>
          <Button
            size="large"
            appearance="outline"
            status="basic"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            ĐĂNG KÍ
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop: 40,
    height: 90,
    resizeMode: "contain",
    marginBottom: 40,
  },
  inputView: {
    marginBottom: 25,
    width: "85%",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 40,
    textAlign: "center",
    width: "85%",
  },
  forgot: {
    marginBottom: 25,
  },
});
