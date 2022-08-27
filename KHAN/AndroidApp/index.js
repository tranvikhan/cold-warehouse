import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import AppNavigator from "./src/Navigators/app.navigator";
import { default as theme } from "./src/assets/theme/custom-theme.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Platform, SafeAreaView } from "react-native";
import { useStyleSheet, StyleService } from "@ui-kitten/components";
import { enableScreens } from "react-native-screens";
import PushNotication from "./src/screens/notification/pushNotication";
import { FeatherIconsPack } from "./src/components/feather-icons";
import { useSelector } from "react-redux";

export default function Application() {
  const styles = useStyleSheet(mainStyle);
  const themeColor = useSelector((state) => state.Layout.theme);
  enableScreens();

  return (
    <>
      {/* <PushNotication */}
      <IconRegistry icons={[EvaIconsPack, FeatherIconsPack]} />
      <ApplicationProvider {...eva} theme={{ ...eva[themeColor], theme }}>
        <SafeAreaView style={styles.droidSafeArea}>
          <AppNavigator />
        </SafeAreaView>
      </ApplicationProvider>
    </>
  );
}
const mainStyle = StyleService.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
