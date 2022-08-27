import AvField from "availity-reactstrap-validation/lib/AvField";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import AvGroup from "availity-reactstrap-validation/lib/AvGroup";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
import TChart from "components/3DChart/3DChart";
import React from "react";
import { ChevronDown } from "react-feather";
import Flatpickr from "react-flatpickr";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import Loader from "components/Loader";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import NewArea from "./newArea";
import { useDispatch, useSelector } from "react-redux";
import {
  addArea,
  addMonitor,
  deleteArea,
  deleteMonitor,
  getAreaInfo,
  updateArea,
  updateMonitor,
} from "redux/actions";
import ConfirmDialog from "components/ConfirmDialog";
import HueBar from "components/HueBar";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const AreaConfig = (props) => {
  const [data, setData] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [slice, setSlice] = React.useState(null);
  const defaultSize = {
    x0: 0,
    y0: 0,
    z0: 0,
    x1: 0,
    y1: 0,
    z1: 0,
  };

  const [newModal, setNewModal] = React.useState(false);
  const [addingArea, setAddingArea] = React.useState(false);

  const [modalDelete, setModalDelete] = React.useState(false);
  const [deletingArea, setDeletingArea] = React.useState(false);

  const [modalNewMonitor, setModalNewMonitor] = React.useState(false);
  const [addingMonitor, setAddingMonitor] = React.useState(false);

  const toggleNewModal = () => {
    setNewModal(!newModal);
  };
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.RoomArea.areas);
  const currentArea = useSelector((state) => state.RoomArea.currentArea);
  const user = useSelector((state) => state.Auth.user);
  const loading = useSelector((state) => state.RoomArea.loading);
  const error = useSelector((state) => state.RoomArea.error);
  const cubeData = useSelector((state) => state.RoomData.cubeData);
  const CurrentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );

  const [size, setSize] = React.useState(defaultSize);
  const [edited, setEdited] = React.useState(false);
  const [name, setName] = React.useState("");
  const [emailOn, setEmailOn] = React.useState(false);
  const [monitorOn, setMonitorOn] = React.useState(false);
  const [maxSize, setMaxSize] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  React.useEffect(() => {
    if (cubeData && cubeData.cubeData) {
      setData(cubeData.cubeData);
    } else if (maxSize && CurrentRoomInfo) {
      let newData = new Array(maxSize.x).fill(
        new Array(maxSize.y).fill(new Array(maxSize.z).fill(90))
      );
      setData({
        values: newData,
        min: 98,
        max: 99,
      });
    } else {
      setData(null);
    }
  }, [cubeData, maxSize]);

  React.useEffect(() => {
    if (currentArea) {
      setName(currentArea.name);
      setEmailOn(currentArea.emailOn);
      setMonitorOn(currentArea.monitorOn);
      setSize(currentArea.size);
    } else {
      setName("");
      setEmailOn(false);
      setMonitorOn(false);
      setSize(defaultSize);
    }
  }, [currentArea]);

  React.useEffect(() => {
    if (CurrentRoomInfo && size) {
      let currentSize = {
        x: CurrentRoomInfo.size.x / CurrentRoomInfo.sensorDensity - 1,
        y: CurrentRoomInfo.size.y / CurrentRoomInfo.sensorDensity - 1,
        z: CurrentRoomInfo.size.z / CurrentRoomInfo.sensorDensity - 1,
      };
      setData(null);
      setMaxSize(currentSize);
      setConfig({
        size: {
          x: currentSize.x,
          y: currentSize.y,
          z: currentSize.z,
          tilesize: 20,
        },
        door: CurrentRoomInfo.door,
        "axis-labels": {
          "axis-x": {
            show: true,
            list: [size.x0, size.x1],
          },
          "axis-y": {
            show: true,
            list: [size.y0, size.y1],
          },
          "axis-z": {
            show: true,
            list: [size.z0, size.z1],
          },
        },
      });
    } else {
      setConfig(null);
    }
  }, [CurrentRoomInfo, size]);

  React.useEffect(() => {
    if (currentArea) {
      setEdited(
        currentArea.name != name ||
          currentArea.size.x0 != size.x0 ||
          currentArea.size.y0 != size.y0 ||
          currentArea.size.z0 != size.z0 ||
          currentArea.size.x1 != size.x1 ||
          currentArea.size.y1 != size.y1 ||
          currentArea.size.z1 != size.z1 ||
          currentArea.emailOn != emailOn ||
          currentArea.monitorOn != monitorOn
      );
    }
  }, [currentArea, name, size, emailOn, monitorOn]);

  React.useEffect(() => {
    if (size) {
      setSlice({
        origin: {
          x: size.x0,
          y: size.y0,
          z: size.z0,
        },
        destination: {
          x: size.x1,
          y: size.y1,
          z: size.z1,
        },
      });
    }
  }, [size]);

  React.useEffect(() => {
    if (addingArea && !loading && !error) {
      setAddingArea(false);
      setNewModal(!newModal);
    }
    if (deletingArea && !loading && !error) {
      setDeletingArea(false);
      setModalDelete(!modalDelete);
    }
    if (addingMonitor && !loading && !error) {
      setAddingMonitor(false);
      setModalNewMonitor(!modalNewMonitor);
    }
  }, [addingMonitor, deletingArea, addingArea, loading, error]);

  const monitorEdit = (newMonitor) => {
    dispatch(
      updateMonitor(
        user,
        CurrentRoomInfo._id,
        currentArea._id,
        newMonitor.monitor_id,
        newMonitor.monitor
      )
    );
  };
  const monitorDelete = (id) => {
    dispatch(deleteMonitor(user, CurrentRoomInfo._id, currentArea._id, id));
  };
  const monitorAdd = (newMonitor) => {
    dispatch(
      addMonitor(user, CurrentRoomInfo._id, currentArea._id, newMonitor)
    );
    setAddingMonitor(true);
  };

  return (
    <React.Fragment>
      <NewArea
        isOpen={newModal}
        toggleOpen={toggleNewModal}
        loading={loading}
        CurrentRoomInfo={CurrentRoomInfo}
        submit={(name, size, emailOn, monitorOn) => {
          dispatch(
            addArea(user, CurrentRoomInfo._id, {
              name,
              size,
              emailOn,
              monitorOn,
            })
          );
          setAddingArea(true);
        }}
      ></NewArea>
      <ConfirmDialog
        title="Xác nhận xóa khu vực"
        content={currentArea && currentArea.name}
        color="danger"
        isOpen={modalDelete}
        toggle={() => {
          setModalDelete(!modalDelete);
        }}
        confirm={() => {
          dispatch(deleteArea(user, CurrentRoomInfo._id, currentArea._id));
          setDeletingArea(true);
        }}
      ></ConfirmDialog>

      {loading && !newModal && !modalDelete && <Loader />}
      <Row className="page-title align-items-center">
        <Col xs={12}>
          <h4 className="mb-1 mt-0">Quản lý khu vực giám sát nhiệt độ</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card className="mb-5">
            <CardBody>
              <Row>
                <Col md={6}>
                  {currentArea && data && config && slice && (
                    <>
                      <TChart config={config} data={data} slice={slice} />
                      <div className="p-x-4">
                        {data.max != 99 ? (
                          <HueBar
                            min={data.min}
                            max={data.max}
                            width={"100%"}
                            height={10}
                          />
                        ) : (
                          <div className="text-center text-warning mt-2">
                            <i className="uil uil-exclamation-octagon mr-1"></i>
                            Chưa có dữ liệu nhiệt độ
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </Col>
                <Col md={6}>
                  <Card className="shadow-none p-0">
                    <CardHeader className="text-right bg-transparent p-0">
                      <UncontrolledButtonDropdown>
                        <DropdownToggle
                          color="default"
                          className="dropdown-toggle text-dark font-weight-bold "
                        >
                          {currentArea ? currentArea.name : "Chọn khu vực"}
                          <i className="icon ml-1">
                            <ChevronDown />
                          </i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {areas &&
                            areas.map((area) => (
                              <DropdownItem
                                onClick={() => {
                                  dispatch(
                                    getAreaInfo(
                                      user,
                                      CurrentRoomInfo._id,
                                      area._id
                                    )
                                  );
                                }}
                              >
                                <span>{area.name}</span>
                              </DropdownItem>
                            ))}

                          {areas && areas[0] && <DropdownItem divider />}
                          <DropdownItem
                            className="text-success"
                            onClick={toggleNewModal}
                          >
                            <i className="uil uil-plus mr-1"></i>
                            Tạo khu vực mới
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </CardHeader>
                    <CardBody className="p-0">
                      <AvForm
                        onValidSubmit={(vl) => {
                          dispatch(
                            updateArea(
                              user,
                              CurrentRoomInfo._id,
                              currentArea._id,
                              { name, size, emailOn, monitorOn }
                            )
                          );
                        }}
                      >
                        <AvField
                          name="name"
                          label="Tên khu vực"
                          type="text"
                          value={name}
                          onChange={(prevValue, nextValue) => {
                            setName(nextValue);
                          }}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Vui lòng điền tên kho lạnh",
                            },
                          }}
                        />
                        <Row>
                          <Col>
                            <Label for="min">Tọa độ nhỏ nhất</Label>
                            <AvGroup id="min">
                              <div className="input-group">
                                <div className="input-group-prepend text-danger">
                                  <span className="input-group-text text-danger font-weight-bold">
                                    X<small className="mt-1">min</small>
                                  </span>
                                </div>
                                <AvInput
                                  name="x0"
                                  type="number"
                                  min={0}
                                  max={maxSize.x}
                                  onChange={(prevValue, nextValue) => {
                                    setSize({ ...size, x0: nextValue });
                                  }}
                                  value={size.x0 === 0 ? "0" : size.x0}
                                />
                              </div>
                            </AvGroup>
                            <AvGroup>
                              <div className="input-group">
                                <div className="input-group-prepend text-danger">
                                  <span className="input-group-text text-success font-weight-bold">
                                    Y<small className="mt-1">min</small>
                                  </span>
                                </div>
                                <AvInput
                                  name="y0"
                                  type="number"
                                  min={0}
                                  max={maxSize.y}
                                  onChange={(prevValue, nextValue) => {
                                    setSize({ ...size, y0: nextValue });
                                  }}
                                  value={size.y0 === 0 ? "0" : size.y0}
                                />
                              </div>
                            </AvGroup>
                            <AvGroup>
                              <div className="input-group">
                                <div className="input-group-prepend text-danger">
                                  <span className="input-group-text text-primary font-weight-bold">
                                    Z<small className="mt-1">min</small>
                                  </span>
                                </div>
                                <AvInput
                                  name="z0"
                                  type="number"
                                  min={0}
                                  max={maxSize.z}
                                  onChange={(prevValue, nextValue) => {
                                    setSize({ ...size, z0: nextValue });
                                  }}
                                  value={size.z0 === 0 ? "0" : size.z0}
                                />
                              </div>
                            </AvGroup>
                            <AvGroup>
                              <Label for="monitorNoti">
                                Bật thông báo ứng dụng
                              </Label>
                              <CustomInput
                                type="switch"
                                id="configmonitorNoti"
                                name="monitorOn"
                                checked={monitorOn}
                                onChange={() => {
                                  setMonitorOn(!monitorOn);
                                }}
                              />
                            </AvGroup>
                          </Col>

                          <Col>
                            <Label for="max">Tọa độ lớn nhất</Label>
                            <AvGroup id="max">
                              <div className="input-group">
                                <div className="input-group-prepend text-danger">
                                  <span className="input-group-text text-danger font-weight-bold">
                                    X<small className="mt-1">max</small>
                                  </span>
                                </div>
                                <AvInput
                                  name="x1"
                                  type="number"
                                  min={size.x0}
                                  max={maxSize.x}
                                  value={size.x1 === 0 ? "0" : size.x1}
                                  onChange={(prevValue, nextValue) => {
                                    setSize({ ...size, x1: nextValue });
                                  }}
                                />
                              </div>
                            </AvGroup>
                            <AvGroup>
                              <div className="input-group">
                                <div className="input-group-prepend text-danger">
                                  <span className="input-group-text text-success font-weight-bold">
                                    Y<small className="mt-1">max</small>
                                  </span>
                                </div>
                                <AvInput
                                  name="y1"
                                  type="number"
                                  min={size.y0}
                                  max={maxSize.y}
                                  value={size.y1 === 0 ? "0" : size.y1}
                                  onChange={(prevValue, nextValue) => {
                                    setSize({ ...size, y1: nextValue });
                                  }}
                                />
                              </div>
                            </AvGroup>
                            <AvGroup>
                              <div className="input-group">
                                <div className="input-group-prepend text-danger">
                                  <span className="input-group-text text-primary font-weight-bold">
                                    Z<small className="mt-1">max</small>
                                  </span>
                                </div>
                                <AvInput
                                  name="z1"
                                  type="number"
                                  min={size.z0}
                                  max={maxSize.z}
                                  value={size.z1 === 0 ? "0" : size.z1}
                                  onChange={(prevValue, nextValue) => {
                                    setSize({ ...size, z1: nextValue });
                                  }}
                                />
                              </div>
                            </AvGroup>
                            <AvGroup>
                              <Label for="confignotiEmail">
                                Bật thông báo email
                              </Label>
                              <CustomInput
                                type="switch"
                                id="confignotiEmail"
                                name="emailOn"
                                onChange={() => {
                                  setEmailOn(!emailOn);
                                }}
                                checked={emailOn}
                              />
                            </AvGroup>
                          </Col>
                        </Row>
                        <div className="text-right mt-3">
                          <Button
                            disabled={!currentArea}
                            className="mr-3"
                            color="outline-danger"
                            onClick={() => {
                              setModalDelete(!modalDelete);
                            }}
                          >
                            <i className="uil uil-exclamation-triangle mr-1"></i>
                            Xóa khu vực
                          </Button>
                          <Button
                            type="submit"
                            disabled={!edited}
                            color="outline-primary"
                          >
                            <i className="uil uil-check"></i>
                            Lưu thay đổi
                          </Button>
                        </div>
                      </AvForm>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/*  --------------------------------------------------------------- */}
      <Row>
        <Col xs={12}>
          <Card className="mb-5">
            <CardBody>
              <Row className="mt-4">
                <Col sm={7}>
                  <h5>Danh sách thời gian và nhiệt độ giám sát</h5>
                </Col>
                <Col sm={5} className="text-right mb-4">
                  <Button
                    disabled={!currentArea}
                    color="secondary"
                    size="sm"
                    onClick={() => {
                      setModalNewMonitor(!modalNewMonitor);
                    }}
                  >
                    <i className="uil uil-plus mr-1"></i>
                    Thêm khung thời gian
                  </Button>
                </Col>
              </Row>
              {currentArea && (
                <AddMonitor
                  onAdd={monitorAdd}
                  isOpen={modalNewMonitor}
                  toggle={() => {
                    setModalNewMonitor(!modalNewMonitor);
                  }}
                ></AddMonitor>
              )}

              {currentArea &&
                currentArea.monitors &&
                currentArea.monitors.map((monitor) => (
                  <Monitor
                    monitor={monitor}
                    onEdit={monitorEdit}
                    onDelete={monitorDelete}
                  ></Monitor>
                ))}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const Monitor = (props) => {
  const [editedMonitor, setEditedMonitor] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [times, setTimes] = React.useState({
    from: "2012-12-19T00:00:00.000Z",
    to: "2012-12-19T06:00:00.000Z",
  });
  const [temperature, setTemperature] = React.useState({ min: -100, max: 100 });
  React.useEffect(() => {
    if (props.monitor) {
      setActive(props.monitor.active);
      setTimes(props.monitor.times);
      setTemperature({
        min: props.monitor.temperature.min * 10,
        max: props.monitor.temperature.max * 10,
      });
    }
  }, [props.monitor]);

  React.useEffect(() => {
    if (props.monitor)
      setEditedMonitor(
        active != props.monitor.active ||
          times.from != props.monitor.times.from ||
          times.to != props.monitor.times.to ||
          temperature.min != props.monitor.temperature.min * 10 ||
          temperature.max != props.monitor.temperature.max * 10
      );
  }, [props.monitor, active, temperature, times]);

  return (
    <Card className="border mb-3 ">
      <CardBody>
        <Row>
          <Col className="my-1" md={4} xl={2}>
            <div className="input-group">
              <div className="input-group-prepend text-danger">
                <span className="input-group-text">Giám sát</span>
              </div>
              <div className="form-control">
                <CustomInput
                  type="switch"
                  name="sad"
                  id="laksln"
                  checked={active}
                  onChange={() => {
                    setActive(!active);
                  }}
                />
              </div>
            </div>
          </Col>
          <Col className="my-1" md={8} xl={3}>
            <div className="input-group">
              <div className="input-group-prepend text-danger">
                <span className="input-group-text">Thời gian</span>
              </div>
              <Flatpickr
                value={new Date(times.from)}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                  time_24hr: true,
                  maxTime:
                    "" +
                    new Date(times.to).getHours() +
                    ":" +
                    new Date(times.to).getMinutes(),
                }}
                onChange={(date) => {
                  setTimes({ ...times, from: new Date(date).toISOString() });
                }}
                className="form-control"
              />
              <Flatpickr
                value={new Date(times.to)}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                  time_24hr: true,
                  minTime:
                    "" +
                    new Date(times.from).getHours() +
                    ":" +
                    new Date(times.from).getMinutes(),
                }}
                onChange={(date) => {
                  setTimes({ ...times, to: new Date(date).toISOString() });
                }}
                className="form-control"
              />
            </div>
          </Col>
          <Col className="my-1" md={12} xl={6}>
            <div className="input-group">
              <div className="input-group-prepend text-danger">
                <span className="input-group-text">Nhiệt độ</span>
              </div>
              <div className="form-control pt-2 col-8">
                <Range
                  className="mt-1"
                  value={[temperature.min, temperature.max]}
                  onChange={(value) =>
                    setTemperature({ min: value[0], max: value[1] })
                  }
                  min={-250}
                  max={200}
                  tipFormatter={(value) => value / 10 + " °C"}
                />
              </div>
              <input
                className="form-control col-2"
                type="number"
                step=".1"
                min={-25}
                max={20}
                value={temperature.min / 10}
                onChange={(e) => {
                  setTemperature({ ...temperature, min: e.target.value * 10 });
                }}
              />
              <input
                className="form-control col-2"
                type="number"
                step=".1"
                value={temperature.max / 10}
                onChange={(e) => {
                  setTemperature({ ...temperature, max: e.target.value * 10 });
                }}
                min={-25}
                max={20}
              />
            </div>
          </Col>
          <Col className="my-1 text-right" md={12} xl={1}>
            <Button
              className=" p-0 cursor-pointer mt-2"
              color="outline-success"
              disabled={!editedMonitor}
              onClick={() => {
                props.onEdit({
                  monitor_id: props.monitor._id,
                  monitor: {
                    active,
                    times,
                    temperature: {
                      min: temperature.min / 10,
                      max: temperature.max / 10,
                    },
                  },
                });
              }}
            >
              <i className="uil uil-check mx-1"></i>
            </Button>
            <Button
              className=" p-0 cursor-pointer mt-2 ml-1"
              color="outline-danger"
              onClick={() => {
                props.onDelete(props.monitor._id);
              }}
            >
              <i className="uil uil-trash mx-1"></i>
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const AddMonitor = (props) => {
  const [active, setActive] = React.useState(false);
  const [times, setTimes] = React.useState({
    from: "2012-12-19T00:00:00.000Z",
    to: "2012-12-19T06:00:00.000Z",
  });
  const [temperature, setTemperature] = React.useState({ min: -100, max: 100 });
  return (
    props.isOpen && (
      <Card className="border mb-3 ">
        <CardBody>
          <Row>
            <Col className="my-1" md={4} xl={2}>
              <div className="input-group">
                <div className="input-group-prepend text-danger">
                  <span className="input-group-text">Giám sát</span>
                </div>
                <div className="form-control">
                  <CustomInput
                    type="switch"
                    name="sad"
                    id="laksln"
                    checked={active}
                    onChange={() => {
                      setActive(!active);
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col className="my-1" md={8} xl={3}>
              <div className="input-group">
                <div className="input-group-prepend text-danger">
                  <span className="input-group-text">Thời gian</span>
                </div>
                <Flatpickr
                  value={new Date(times.from)}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                    maxTime:
                      "" +
                      new Date(times.to).getHours() +
                      ":" +
                      new Date(times.to).getMinutes(),
                  }}
                  onChange={(date) => {
                    setTimes({ ...times, from: new Date(date).toISOString() });
                  }}
                  className="form-control"
                />
                <Flatpickr
                  value={new Date(times.to)}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    time_24hr: true,
                    minTime:
                      "" +
                      new Date(times.from).getHours() +
                      ":" +
                      new Date(times.from).getMinutes(),
                  }}
                  onChange={(date) => {
                    setTimes({ ...times, to: new Date(date).toISOString() });
                  }}
                  className="form-control"
                />
              </div>
            </Col>
            <Col className="my-1" md={12} xl={6}>
              <div className="input-group">
                <div className="input-group-prepend text-danger">
                  <span className="input-group-text">Nhiệt độ</span>
                </div>
                <div className="form-control pt-2 col-8">
                  <Range
                    className="mt-1"
                    value={[temperature.min, temperature.max]}
                    onChange={(value) =>
                      setTemperature({ min: value[0], max: value[1] })
                    }
                    min={-250}
                    max={200}
                    tipFormatter={(value) => value / 10 + " °C"}
                  />
                </div>
                <input
                  className="form-control col-2"
                  type="number"
                  step=".1"
                  min={-25}
                  max={20}
                  value={temperature.min / 10}
                  onChange={(e) => {
                    setTemperature({
                      ...temperature,
                      min: e.target.value * 10,
                    });
                  }}
                />
                <input
                  className="form-control col-2"
                  type="number"
                  step=".1"
                  value={temperature.max / 10}
                  onChange={(e) => {
                    setTemperature({
                      ...temperature,
                      max: e.target.value * 10,
                    });
                  }}
                  min={-25}
                  max={20}
                />
              </div>
            </Col>
            <Col className="my-1 text-right" md={12} xl={1}>
              <Button
                className=" p-0 cursor-pointer mt-2"
                color="outline-primary"
                onClick={() => {
                  props.onAdd({
                    active,
                    times,
                    temperature: {
                      min: temperature.min / 10,
                      max: temperature.max / 10,
                    },
                  });
                }}
              >
                <i className="uil uil-plus mx-1"></i>
              </Button>
              <Button
                className=" p-0 cursor-pointer mt-2 ml-1"
                color="outline-danger"
                onClick={props.toggle}
              >
                <i className="uil uil-multiply mx-1"></i>
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  );
};

export default AreaConfig;
