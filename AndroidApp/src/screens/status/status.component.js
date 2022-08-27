import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Icon, Layout, Tab, TabBar } from "@ui-kitten/components";
import MyLineChart from "./myLineChart.component";
import ThreeChart from "./threeChart.component";
import { useNavigationState } from "@react-navigation/native";

const LineIcon = (props) => <Icon {...props} name="activity" />;

const ThreeIcon = (props) => <Icon {...props} name="cube-outline" />;

const { Navigator, Screen } = createMaterialTopTabNavigator();
const TopTabBar = ({ navigation, state }) => {
  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <Tab title="Biểu đồ đường" icon={LineIcon} />
      <Tab title="Biểu đồ 3D" icon={ThreeIcon} />
    </TabBar>
  );
};

export default function Status(props) {
  const screenName = useNavigationState(
    (state) => state.routes[state.index].name
  );
  return (
    <Layout style={{ flex: 1 }}>
      <Navigator tabBar={(props) => <TopTabBar {...props} />}>
        <Screen name="LineChart">
          {(props) => <MyLineChart {...props} parentScreen={screenName} />}
        </Screen>
        <Screen name="ThreeChart">
          {(props) => <ThreeChart {...props} parentScreen={screenName} />}
        </Screen>
      </Navigator>
    </Layout>
  );
}
