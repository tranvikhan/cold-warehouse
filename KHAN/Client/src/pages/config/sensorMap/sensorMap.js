import React from "react";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  DropdownItem,
  Row,
  Col,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import SensorItem from "./sensorItem";
import ConfigSensor from "./configSensor";
import { useDispatch, useSelector } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  getAreaData,
  getCubeData,
  getCurrentData,
  getSensorData,
} from "redux/actions";
import { ViewConfigSensorMap } from "./matrixConfigSensor/matrix";
import SensorMap3D from "./SensorMap3D";

const PremiumSlider = Slider.createSliderWithTooltip(Slider);

const SensorMapController = (props) => {
  const min = props.min ? props.min : 0;
  const max = props.max ? props.max : 10;

  return (
    <div className="mt-3 block p-3">
      <InputGroup className="col-12 mb-3 mt-5 row p-0 mr-0 ml-0">
        <InputGroupAddon addonType="prepend">Tọa độ Z</InputGroupAddon>
        <div className="form-control col-11 pt-2">
          <PremiumSlider
            step={1}
            dots
            className="mt-1"
            min={min}
            max={max}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
        <Input
          className="col-1"
          type="number"
          value={props.value}
          onChange={(event) => {
            let num = event.target.value;
            let val = num >= min && num <= max ? num : num < min ? max : min;
            props.onChange(val);
          }}
        />
      </InputGroup>
    </div>
  );
};
SensorMapController.defaultProps = {
  onChange: (v) => {},
};
const EMPTY = [[]];
const SensorMap = () => {
  const [BASE, SET_BASE] = React.useState(450);
  const [_z_, setZ] = React.useState(0);
  const [aData, setData] = React.useState(EMPTY);
  const [filter, setFilter] = React.useState("ALL");

  const CurrentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );
  const user = useSelector((state) => state.Auth.user);
  const sensors = useSelector((state) => state.RoomData.sensorData);
  const currentData = useSelector((state) => state.RoomData.currentData);
  const structure = useSelector((state) => state.RoomStructrure.structure);
  const loading = useSelector((state) => state.RoomStructrure.loading);
  const error = useSelector((state) => state.RoomStructrure.error);

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const tabContents = [
    {
      id: "1",
      title: "Sơ đồ 3D",
      disabled: false,
    },
    {
      id: "2",
      title: "Sơ đồ lớp",
      disabled: false,
    },
  ];

  const [modalConfig, setModalConfig] = React.useState({
    x: 0,
    y: 0,
    z: 0,
    d: 10,
    show: false,
  });
  const [maxZ, setMaxZ] = React.useState(0);
  const Vietnamese_is_so_beautiful = {
    ALL: "Tất cả",
    RUNNING: "Đang chạy",
    ON: "Đang bật",
    OFF: "Đang tắt",
    USSING: "Đã thêm vào kho",
  };

  React.useEffect(() => {
    if (CurrentRoomInfo) {
      let { x, y, z } = CurrentRoomInfo.size;
      const unit = CurrentRoomInfo.sensorDensity;
      x = Math.trunc(x / unit);
      y = Math.trunc(y / unit);
      z = Math.trunc(z / unit);
      setMaxZ(z - 1);

      const aBoard = new Array(y).fill(0).map((e) => new Array(x).fill(0));
      if (parseInt(_z_) === 0 || parseInt(_z_) === z - 1) {
        aBoard[0][0] = 3;
        aBoard[0][x - 1] = 3;
        aBoard[y - 1][0] = 3;
        aBoard[y - 1][x - 1] = 3;
      }
      const aSensor = structure && structure.map.map ? structure.map : [];
      aSensor.forEach((e) => {
        if (parseInt(e.location.z) === parseInt(_z_))
          aBoard[e.location.y][e.location.x] = 1;
      });

      setData(aBoard);
    }
  }, [_z_, CurrentRoomInfo, structure]);

  React.useEffect(() => {
    if (structure && CurrentRoomInfo && user) {
      dispatch(getAreaData(user, CurrentRoomInfo._id));
      dispatch(getCurrentData(user, CurrentRoomInfo._id));
      dispatch(getSensorData(user, CurrentRoomInfo._id));
      dispatch(getCubeData(user, CurrentRoomInfo._id));
    }
  }, [structure]);

  const EditInfoSensor = (id) => {
    if (CurrentRoomInfo && structure && structure.map.map) {
      let a = structure.map.find((st) => st.sensor._id === id);
      console.log(a);
      if (a) {
        setZ(a.location.z);
        setModalConfig({
          ...modalConfig,
          x: a.location.x,
          y: a.location.y,
          z: a.location.z,
          show: true,
        });
      }
    }
  };

  const [submitting, setSubmitting] = React.useState(false);
  const [backAction, setBackAction] = React.useState(null);

  React.useEffect(() => {
    if (submitting && !loading && error == null && modalConfig.show) {
      setModalConfig({ ...modalConfig, show: false });
      if (backAction) {
        dispatch(backAction);
        setBackAction(null);
      }
      setSubmitting(false);
    }
  }, [loading, error, submitting, modalConfig.show]);

  return (
    <React.Fragment>
      <Row className="page-title align-items-center">
        <Col xs={12}>
          <h4 className="mb-1 mt-0">Quản lý mạng cảm biến</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card className="mb-3">
            <CardBody>
              <ConfigSensor
                d={CurrentRoomInfo && CurrentRoomInfo.sensorDensity}
                z={_z_}
                config={modalConfig}
                toggle={() => {
                  setModalConfig({ ...modalConfig, show: !modalConfig.show });
                }}
                sensors={sensors && sensors.datas ? sensors.datas : []}
                structure={structure && structure.map.map ? structure.map : []}
                setSubmitting={(value) => {
                  setSubmitting(value);
                }}
                loading={loading}
                setBackAction={setBackAction}
              />
              <div>
                <Nav className="nav nav-pills navtab-bg nav-justified">
                  {tabContents.map((tab, index) => {
                    return (
                      <NavItem key={index}>
                        <NavLink
                          href="#"
                          disabled={tab.disabled}
                          className={classnames({
                            active: activeTab === tab.id,
                          })}
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
                <TabContent activeTab={activeTab} className="px-3 mt-2">
                  <TabPane tabId="1">
                    <div style={{ width: "inherit", height: "450px" }}>
                      {CurrentRoomInfo && (
                        <SensorMap3D
                          config={CurrentRoomInfo}
                          data={
                            currentData && currentData.datas
                              ? currentData.datas
                              : []
                          }
                        />
                      )}
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div
                      style={{ width: "inherit", height: 450 }}
                      className="p-3"
                    >
                      <ViewConfigSensorMap
                        data={aData}
                        onClick={(x, y, hue, temp) => {
                          setModalConfig({
                            ...modalConfig,
                            x: x,
                            y: y,
                            show: true,
                          });
                        }}
                      />
                    </div>

                    <SensorMapController
                      min={0}
                      max={maxZ}
                      value={_z_}
                      onChange={setZ}
                    />
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="mb-5">
            <CardBody>
              <Row className="mb-2">
                <Col sm={3}>
                  <h5>Danh sách cảm biến</h5>
                </Col>

                <Col sm={9}>
                  <div className="float-sm-right mt-3 mt-sm-0">
                    <UncontrolledButtonDropdown className="d-inline-block">
                      <DropdownToggle
                        tag="button"
                        className="btn btn-secondary btn-sm dropdown-toggle"
                      >
                        <i className="uil uil-filter" />
                        {" " + Vietnamese_is_so_beautiful[filter]}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() => setFilter("ALL")}>
                          {Vietnamese_is_so_beautiful.ALL}
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => setFilter("RUNNING")}
                          className="text-success"
                        >
                          {Vietnamese_is_so_beautiful.RUNNING}
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => setFilter("OFF")}
                          className="text-warning"
                        >
                          {Vietnamese_is_so_beautiful.USSING}
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => setFilter("ON")}
                          className="text-primary"
                        >
                          {Vietnamese_is_so_beautiful.ON}
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => setFilter("OFF")}
                          className="text-danger"
                        >
                          {Vietnamese_is_so_beautiful.OFF}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </Col>
              </Row>
              {sensors != null &&
                sensors.datas != null &&
                sensors.datas.map((sensor, i) => {
                  if (filter !== "ALL" && sensor.status !== filter) return;
                  return (
                    <SensorItem
                      EditInfoSensor={EditInfoSensor}
                      id={sensor._id}
                      value={sensor.value}
                      name={sensor.name}
                      status={Vietnamese_is_so_beautiful[sensor.status]}
                      key={i}
                    />
                  );
                })}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SensorMap;
