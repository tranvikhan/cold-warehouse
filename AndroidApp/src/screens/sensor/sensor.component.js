import React from "react";
import {
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  useTheme,
  TopNavigationAction,
  TopNavigation,
  Text,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigationState } from "@react-navigation/native";

export default function Sensor({ navigation, state }) {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const sensorData = useSelector((state) => state.RoomData.sensorData);
  const screenName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  React.useEffect(() => {
    if (
      sensorData &&
      sensorData.datas &&
      screenName &&
      screenName === "Sensor"
    ) {
      setData(
        [...sensorData.datas].map((sr) => ({
          title: sr.name,
          status: sr.status,
          value: Math.round(sr.value * 100) / 100,
        }))
      );
    }
  }, [sensorData, screenName]);

  const TemperatureValue = (props) => {
    return (
      <Text category="s1" style={styles.temperature}>
        {Math.round(props.value * 100) / 100} °C
      </Text>
    );
  };
  const RenderItemIcon = (props) => {
    return <Icon {...props} pack="feather" name="cpu" />;
  };

  const renderCheckIcon = (props) => (
    <Icon
      {...props}
      name="funnel-outline"
      fill={theme["color-primary-default"]}
    />
  );

  const renderTopBar = () => <TopNavigationAction icon={renderCheckIcon} />;
  const styles = StyleSheet.create({
    temperature: {
      marginRight: 10,
    },
  });

  const renderItem = ({ item, index }) => {
    const mapStatus = {
      RUNNING: { name: "Đang chạy", color: "success" },
      ON: { name: "Đang bật", color: "primary" },
      OFF: { name: "Đang tắt", color: "danger" },
      USSING: { name: "Đã thêm vào kho", color: "warning" },
    };

    return (
      <ListItem
        title={() => <Text category="s1">{item.title}</Text>}
        description={() => (
          <Text category="p2" status={mapStatus[item.status].color}>
            {mapStatus[item.status].name}
          </Text>
        )}
        accessoryLeft={RenderItemIcon}
        accessoryRight={() => <TemperatureValue value={item.value} />}
      />
    );
  };

  return (
    <Layout style={{ flex: 1 }} level="2">
      <TopNavigation
        alignment="center"
        title="Danh sách cảm biến"
        accessoryRight={renderTopBar}
      />
      <Divider />
      <List
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  );
}
