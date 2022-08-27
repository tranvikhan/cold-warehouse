import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import AreasChart from "./AreasChart";
import BoxChart from "./BoxChart";
import MatrixChart from "./MatrixChart";
import { useSelector } from "react-redux";
import Loader from "components/Loader";
import { Alert } from "reactstrap";

const TabsChart = (props) => {
  const [activeTab, setActiveTab] = React.useState("3");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const tabContents = [
    {
      id: "1",
      title: "Khu vực",
      disabled: false,
    },
    {
      id: "2",
      title: "Mặt cắt 2D",
      disabled: false,
    },
    {
      id: "3",
      title: "Mô hình 3D",
      disabled: false,
    },
  ];

  const [config, setConfig] = useState(null);
  const [data, setData] = useState(null);
  const currentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );
  const cubeData = useSelector((state) => state.RoomData.cubeData);
  const loading = useSelector((state) => state.RoomData.loading);
  const error = useSelector((state) => state.RoomData.error);

  useEffect(() => {
    if (cubeData && cubeData.cubeData && currentRoomInfo) {
      setData(cubeData.cubeData);
    } else if (currentRoomInfo && !cubeData) {
      const dA = currentRoomInfo.sensorDensity;
      const xA = currentRoomInfo.size.x / dA - 1;
      const yA = currentRoomInfo.size.y / dA - 1;
      const zA = currentRoomInfo.size.z / dA - 1;
      let newData = new Array(xA).fill(
        new Array(yA).fill(new Array(zA).fill(90))
      );
      setData({
        values: newData,
        min: 98,
        max: 99,
      });
    } else {
      setData(null);
    }
  }, [cubeData, currentRoomInfo]);

  useEffect(() => {
    if (currentRoomInfo) {
      const density = currentRoomInfo.sensorDensity;
      const xBlock = currentRoomInfo.size.x / density - 1;
      const yBlock = currentRoomInfo.size.y / density - 1;
      const zBlock = currentRoomInfo.size.z / density - 1;
      //setData(null);
      setConfig({
        size: {
          x: xBlock,
          y: yBlock,
          z: zBlock,
          tilesize: 20,
        },
        door: currentRoomInfo.door,
        "axis-labels": {
          "axis-x": {
            show: true,
            list: [0],
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
  }, [currentRoomInfo]);

  return (
    <React.Fragment>
      {loading && <Loader />}
      {error && (
        <Alert color="danger" isOpen={props.error != null ? true : false}>
          <div>{props.error}</div>
        </Alert>
      )}
      <Nav className="nav nav-pills navtab-bg nav-justified">
        {tabContents.map((tab, index) => {
          return (
            <NavItem key={index}>
              <NavLink
                href="#"
                disabled={tab.disabled}
                className={classnames({ active: activeTab === tab.id })}
                onClick={() => {
                  toggle(tab.id);
                }}
              >
                <i
                  className={classnames(
                    tab.icon,
                    "d-sm-none",
                    "d-block",
                    "mr-1"
                  )}
                ></i>
                {tab.title}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={activeTab} className="mr-3 mt-4">
        <TabPane tabId="1">
          <AreasChart />
        </TabPane>
        <TabPane tabId="2">
          <MatrixChart data={data} config={config} />
        </TabPane>
        <TabPane tabId="3">
          <BoxChart data={data} config={config} />
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};
export default TabsChart;
