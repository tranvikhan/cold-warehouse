import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {
  Button,
  CheckBox,
  Icon,
  Input,
  Layout,
  Spinner,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/actions";
import MyAlert from "../../components/alert.component";
import { ScrollView } from "react-native-gesture-handler";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [accept, setAccept] = React.useState(false);
  const state = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [check, setCheck] = React.useState({
    usernameColor: "basic",
    passwordColor: "basic",
    emailColor: "basic",
    checkboxColor: "basic",
  });
  const [visibles, setVisibles] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [firstRender, setFirstRender] = React.useState(false);

  const submitSignUp = () => {
    setCheck({
      usernameColor: username === "" ? "danger" : "basic",
      passwordColor: password === "" ? "danger" : "basic",
      emailColor: email === "" ? "danger" : "basic",
      checkboxColor: !accept ? "danger" : "basic",
    });
    if (username != "" && password != "" && email != "" && accept) {
      setFirstRender(true);
      dispatch(registerUser(username, email, password));
    }
  };

  React.useEffect(() => {
    if (state.register_success && !state.loading && firstRender) {
      setFirstRender(true);
      setVisible2(true);
    }
    if (firstRender && state.errorRegister && !state.loading) {
      setFirstRender(true);
      setVisibles(true);
    }
  }, [state.loading, state.errorRegister]);

  const LoadingIndicator = (props) => {
    if (props.isLoading)
      return (
        <View style={[props.style, styles.indicator]}>
          <Spinner size="small" status="basic" />
        </View>
      );
    return <></>;
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <Layout style={styles.container}>
      <MyAlert
        status="danger"
        title="Lỗi"
        text={state.errorRegister}
        visible={visibles}
        setVisible={(value) => setVisibles(value)}
      ></MyAlert>
      <MyAlert
        status="success"
        title="Thành công"
        text="Đăng kí thành công"
        visible={visible2}
        setVisible={(value) => {
          navigateBack();
          setVisible2(value);
        }}
      ></MyAlert>
      <TopNavigation accessoryLeft={BackAction} title="Đăng nhập" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.inputView}>
          <Input
            status={check.usernameColor}
            size="large"
            selectionColor="#3C4ED5"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChangeText={(nextValue) => setUsername(nextValue)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            type="email"
            status={check.emailColor}
            size="large"
            selectionColor="#3C4ED5"
            placeholder="Nhập email"
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
        </View>
        <View style={styles.inputView}>
          <Input
            size="large"
            status={check.passwordColor}
            value={password}
            selectionColor="#3C4ED5"
            placeholder="Nhập mật khẩu"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </View>
        <View style={styles.inputView}>
          <CheckBox
            status={check.checkboxColor}
            checked={accept}
            onChange={(nextChecked) => setAccept(nextChecked)}
          >
            Tôi đồng ý với thỏa thuận sử dụng
          </CheckBox>
        </View>
        <View style={{ ...styles.inputView, marginBottom: 10 }}>
          <Button
            onPress={submitSignUp}
            size="large"
            status="primary"
            accessoryLeft={() => <LoadingIndicator isLoading={state.loading} />}
          >
            ĐĂNG KÍ
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  inputView: {
    marginBottom: 30,
    width: "85%",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
});
