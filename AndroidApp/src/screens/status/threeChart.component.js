import {
  Layout,
  useTheme,
  Icon,
  Button,
  Select,
  IndexPath,
  SelectItem,
  Text,
} from "@ui-kitten/components";

import { useSelector } from "react-redux";
import React from "react";
import TChart from "./components/TChart";
import { useNavigationState } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { Slider } from "react-native-elements";
import { Image } from "react-native";
import { View } from "react-native";

export default function ThreeChart(props) {
  const cubeData = useSelector((state) => state.RoomData.cubeData);
  const sheetRef = React.useRef(null);
  const theme = useTheme();
  const currentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );
  const screenName = useNavigationState(
    (state) => state.routes[state.index].name
  );
  const [data, setData] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [slice, setSlice] = React.useState({
    axis: "x",
    level: 0,
  });
  React.useEffect(() => {
    if (currentRoomInfo) {
      let xBlock = currentRoomInfo.size.x / currentRoomInfo.sensorDensity - 1;
      let yBlock = currentRoomInfo.size.y / currentRoomInfo.sensorDensity - 1;
      let zBlock = currentRoomInfo.size.z / currentRoomInfo.sensorDensity - 1;
      if (config == null) {
        setConfig({
          size: {
            x: xBlock,
            y: yBlock,
            z: zBlock,
            tilesize: 5,
          },
          door: currentRoomInfo.door,
          "axis-labels": {
            "axis-x": {
              show: false,
              list: [],
            },
            "axis-y": {
              show: false,
              list: [],
            },
            "axis-z": {
              show: false,
              list: [],
            },
          },
        });
      }
      console.log(screenName);
      if (cubeData) {
        if (
          screenName &&
          screenName === "ThreeChart" &&
          props.parentScreen &&
          props.parentScreen === "Status"
        ) {
          setData(cubeData.cubeData);
          console.log("SET DATA");
        }
      } else {
        setData({
          values: new Array(xBlock).fill(
            new Array(yBlock).fill(new Array(zBlock).fill(90))
          ),
          min: 98,
          max: 99,
        });
      }
    } else {
      setData(null);
      setConfig(null);
    }
  }, [cubeData, currentRoomInfo, props.parentScreen]);

  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const mapAxis = ["Trục X", "Trục Y", "Trục Z"];

  const renderContent = () => (
    <Layout
      level="2"
      style={{
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        height: 200,
      }}
    >
      <Button
        size="small"
        appearance="ghost"
        accessoryLeft={(props) => (
          <Icon {...props} name="chevron-up" pack="feather" />
        )}
      />
      <View style={{ width: "100%", marginBottom: 10 }}>
        <Slider
          value={slice.level}
          style={{ width: "100%" }}
          onValueChange={(value) =>
            setSlice({ axis: slice.axis, level: value })
          }
          maximumValue={50}
          minimumValue={0}
          thumbStyle={{
            width: 20,
            height: 20,
            backgroundColor: theme["color-primary-600"],
          }}
          minimumTrackTintColor={theme["background-basic-color-4"]}
          maximumTrackTintColor={theme["background-basic-color-4"]}
          trackStyle={{
            height: 8,
            borderRadius: 5,
          }}
          step={1}
        />
      </View>

      <Select
        style={{ width: "100%" }}
        selectedIndex={selectedIndex}
        value={mapAxis[selectedIndex - 1]}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectItem title="Trục X" />
        <SelectItem title="Trục Y" />
        <SelectItem title="Trục Z" />
      </Select>
    </Layout>
  );
  return (
    <>
      <Layout
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        {data && config && slice && (
          <TChart config={config} data={data} slice={slice} />
        )}
        {data && config && (
          <>
            <Image
              style={{ width: "100%", height: 10, resizeMode: "stretch" }}
              source={require("../../assets/images/thanh.jpg")}
            />
            <Layout
              level="3"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            >
              <Text style={{ width: "20%", textAlign: "left" }}>
                {Math.round(data.min * 100) / 100}
              </Text>
              <Text style={{ width: "20%", textAlign: "center" }}>
                {Math.round(((data.max - data.min) * 0.25 + data.min) * 100) /
                  100}
              </Text>
              <Text style={{ width: "20%", textAlign: "center" }}>
                {Math.round(((data.max - data.min) * 0.5 + data.min) * 100) /
                  100}
              </Text>
              <Text style={{ width: "20%", textAlign: "center" }}>
                {Math.round(((data.max - data.min) * 0.75 + data.min) * 100) /
                  100}
              </Text>
              <Text style={{ width: "20%", textAlign: "right" }}>
                {Math.round(data.max * 100) / 100}
              </Text>
            </Layout>
          </>
        )}
      </Layout>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[200, 100, 40]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </>
  );
}
