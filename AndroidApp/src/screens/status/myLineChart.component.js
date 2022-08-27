import {
  Layout,
  Text,
  useTheme,
  Select,
  SelectItem,
  IndexPath,
  Icon,
  SelectGroup,
} from "@ui-kitten/components";
import React from "react";
import { Dimensions, ScrollView, View, StyleSheet, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector, useDispatch } from "react-redux";
import AreaRoom from "../../components/areaRoom.component";
import { setCurrentRoom } from "../../redux/actions";
import { useNavigationState } from "@react-navigation/native";
import { SortTimeToString } from "../../helpers/datetimeCover";

export default function MyLineChart(props) {
  const dispatch = useDispatch();
  const myRoom = useSelector((state) => state.RoomList.myRoom);
  const sharedRoom = useSelector((state) => state.RoomList.sharedRoom);
  const [mtemp, setMTemp] = React.useState([]);
  const [stemp, setSTemp] = React.useState([]);
  const screenName = useNavigationState(
    (state) => state.routes[state.index].name
  );
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0, 0));
  const [warehouse, setWarehouse] = React.useState([
    ["Kho 1", "Kho 2"],
    ["Kho 3"],
  ]);
  React.useEffect(() => {
    let a = [...warehouse[0]];
    let b = [...warehouse[1]];
    if (myRoom) {
      a = [...myRoom].map((r) => r.room.name);
      setMTemp(a);
    }
    if (sharedRoom) {
      b = [...sharedRoom].map((r) => r.room.name);
      setSTemp(b);
    }
    setWarehouse([[...a], [...b]]);

    console.log([[...a], [...b]]);
  }, [myRoom, sharedRoom]);
  React.useEffect(() => {
    console.log("run");
    if (selectedIndex.section === 0 && myRoom && myRoom[selectedIndex.row]) {
      dispatch(setCurrentRoom(myRoom[selectedIndex.row]));
    } else if (
      selectedIndex.section === 1 &&
      sharedRoom &&
      sharedRoom[selectedIndex.row]
    ) {
      dispatch(setCurrentRoom(sharedRoom[selectedIndex.row]));
    }
  }, [selectedIndex]);

  const [areaIndex, setAreaIndex] = React.useState(null);
  const [dataArray, setDataArray] = React.useState({
    datas: [],
    labels: [],
  });
  React.useEffect(() => {
    if (areaData && areaIndex != null) {
      console.log(areaIndex);
      let coppyLable = [...areaData].map((dt) =>
        dt.areas[areaIndex] ? SortTimeToString(dt.time) : "null"
      );
      let copyData = [...areaData].map((dt) =>
        dt.areas[areaIndex]
          ? dt.areas[areaIndex].average
            ? dt.areas[areaIndex].average
            : dt.areas[areaIndex].value
          : 0
      );
      setDataArray({
        datas: [...copyData],
        labels: [...coppyLable],
      });
    } else {
      setAreaIndex(null);
    }
  }, [areaIndex]);

  const [data, setData] = React.useState([]);
  const areaData = useSelector((state) => state.RoomData.areaData);
  React.useEffect(() => {
    if (areaData && areaData[0] && areaData[areaData.length - 1].areas[0]) {
      if (areaData[areaData.length - 1].areas.length != data.length) {
        if (areaIndex == null) setAreaIndex(0);
        setData(
          [...areaData[areaData.length - 1].areas].map((area, index) => ({
            id: area._id,
            index: index,
            title: area.name,
            status: "stability",
            temperature:
              Math.round((area.average ? area.average : area.value) * 100) /
              100,
          }))
        );
      } else {
        if (
          areaIndex != null &&
          screenName &&
          screenName === "LineChart" &&
          props.parentScreen &&
          props.parentScreen === "Status"
        ) {
          setData(
            [...areaData[areaData.length - 1].areas].map((area, index) => ({
              id: area._id,
              index: index,
              title: area.name,
              status: "stability",
              temperature:
                Math.round((area.average ? area.average : area.value) * 100) /
                100,
            }))
          );

          let coppyLable = [...areaData].map((dt) =>
            dt.areas[areaIndex] ? SortTimeToString(dt.time) : "null"
          );
          let copyData = [...areaData].map((dt) =>
            dt.areas[areaIndex]
              ? dt.areas[areaIndex].average
                ? dt.areas[areaIndex].average
                : dt.areas[areaIndex].value
              : 0
          );
          setDataArray({
            datas: [...copyData],
            labels: [...coppyLable],
          });
        }
      }
    } else {
      setData([]);
      setDataArray({
        datas: [],
        labels: [],
      });
      setAreaIndex(null);
    }
  }, [areaData, props.parentScreen]);

  const styles = StyleSheet.create({
    selectInput: { width: "95%", marginTop: 15, marginBottom: 10 },
    container: { flex: 1, alignItems: "center" },
    chartView: {
      backgroundColor: theme["background-basic-color-4"],
      width: "95%",
      borderRadius: 10,
      padding: 5,
    },
    chartTitle: { marginLeft: 4, marginTop: 10 },
    srollViewAre: {
      height: Dimensions.get("window").height * 0.24,
      marginTop: 15,
      width: "100%",
    },
    areRoomView: {
      backgroundColor: theme["background-basic-color-4"],
      padding: 20,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    areRoomFocus: { backgroundColor: theme["color-primary-focus"] },
  });

  return (
    <Layout style={styles.container} level="3">
      <Select
        style={styles.selectInput}
        selectedIndex={selectedIndex}
        value={warehouse[selectedIndex.section][selectedIndex.row]}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <SelectGroup title="Kho của tôi">
          {mtemp.map((t) => (
            <SelectItem title={t} key={t} />
          ))}
        </SelectGroup>
        <SelectGroup title="Kho được chia sẽ">
          {stemp.map((t) => (
            <SelectItem title={t} key={t} />
          ))}
        </SelectGroup>
      </Select>
      <View style={styles.chartView}>
        {areaIndex != null && data && (
          <Text style={styles.chartTitle}>{data[areaIndex].title}</Text>
        )}
        {areaIndex != null && dataArray && dataArray && dataArray.datas[0] && (
          <LineChart
            withInnerLines={false}
            data={{
              labels: dataArray.labels,
              datasets: [
                {
                  data: dataArray.datas,
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={Dimensions.get("window").width * 0.5}
            yAxisLabel="-"
            yAxisSuffix="°C"
            yAxisInterval={1} // optional, defaults to 1
            bezier
            style={{
              marginVertical: 15,
              borderRadius: 5,
            }}
            chartConfig={{
              backgroundColor: "#000000",
              backgroundGradientFrom: theme["background-basic-color-4"],
              backgroundGradientTo: theme["background-basic-color-4"],
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (lever) => theme["color-primary-default"],
              labelColor: (lever) => theme["text-basic-color"],
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "2",
                strokeWidth: "4",
                stroke: theme["color-primary-default"],
              },
            }}
          />
        )}
      </View>
      <View style={styles.srollViewAre}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsHorizontalScrollIndicator={false}
        >
          {data &&
            data[0] &&
            data.map((dt) => (
              <AreaRoom
                data={dt}
                key={dt.index}
                focus={dt.index === areaIndex ? true : false}
                onPressView={() => {
                  console.log(dt.index);
                  setAreaIndex(dt.index);
                }}
              />
            ))}
        </ScrollView>
      </View>
    </Layout>
  );
}
