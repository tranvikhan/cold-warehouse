import AvForm from "availity-reactstrap-validation/lib/AvForm";
import AvGroup from "availity-reactstrap-validation/lib/AvGroup";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
import React from "react";
import Select from "react-select";
import Loader from "components/Loader";
import {
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Label,
  InputGroupAddon,
  Media,
} from "reactstrap";
import sensorimg from "assets/icons/Devices/CPU1.svg";
import sensor3img from "assets/icons/Devices/CPU3.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteSensor, updateSensor, addSensor } from "redux/actions";

//import {Wizard, Steps,Step} from 'react-albus';
const ConfigSensor = (props) => {
  const [defaultSensor, setDefaultSensor] = React.useState(null);
  const [oldSensor, setOldSensor] = React.useState(null);

  const dispatch = useDispatch();
  const CurrentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );
  const user = useSelector((state) => state.Auth.user);

  React.useEffect(() => {
    if (props.config.show) {
      let item = props.structure.find(
        (st) =>
          st.location.x == props.config.x &&
          st.location.y == props.config.y &&
          st.location.z == props.z
      );

      if (item) {
        let temp = sensorItemInfo(
          props.sensors &&
            props.sensors.find((sr) => sr._id === item.sensor._id)
        );
        console.log(item, temp);
        setDefaultSensor(temp);
        setOldSensor(temp);
      } else {
        setDefaultSensor(null);
        setOldSensor(null);
      }
    } else {
      setDefaultSensor(null);
      setOldSensor(null);
    }
  }, [props.config, props.structure, props.z, props.sensors.length]);

  const addSensorAction = () => {
    if (defaultSensor) {
      if (!defaultSensor.isUsed) {
        dispatch(
          addSensor(user, CurrentRoomInfo._id, defaultSensor.id, {
            x: props.config.x,
            y: props.config.y,
            z: props.z,
          })
        );
        props.setSubmitting(true);
      }
    }
  };
  const editSensorAction = () => {
    console.log(oldSensor, defaultSensor);
    if (!oldSensor && defaultSensor && defaultSensor.isUsed) {
      dispatch(
        updateSensor(user, CurrentRoomInfo._id, defaultSensor.id, {
          x: props.config.x,
          y: props.config.y,
          z: props.z,
        })
      );
      props.setSubmitting(true);
      return;
    }
    if (oldSensor && defaultSensor && !defaultSensor.isUsed) {
      let old_id = oldSensor.id;
      let new_id = defaultSensor.id;
      dispatch(deleteSensor(user, CurrentRoomInfo._id, old_id));
      props.setBackAction(
        addSensor(user, CurrentRoomInfo._id, new_id, {
          x: props.config.x,
          y: props.config.y,
          z: props.z,
        })
      );
      props.setSubmitting(true);
      return;
    }
    if (oldSensor && defaultSensor && defaultSensor.isUsed) {
      dispatch(deleteSensor(user, CurrentRoomInfo._id, oldSensor.id));
      props.setBackAction(
        updateSensor(user, CurrentRoomInfo._id, defaultSensor.id, {
          x: props.config.x,
          y: props.config.y,
          z: props.z,
        })
      );
      props.setSubmitting(true);
      return;
    }
  };
  const deleteSensorAction = () => {
    if (defaultSensor) {
      dispatch(deleteSensor(user, CurrentRoomInfo._id, defaultSensor.id));
      props.setSubmitting(true);
    }
  };

  const sensorItemInfo = (sensor) => {
    return (
      sensor && {
        id: sensor._id,
        isUsed: sensor.status === "RUNNING" || sensor.status === "USSING",
        value: sensor.name + " " + sensor.datatype_id,
        label: (
          <Media className="pt-1">
            <img
              src={
                sensor.status === "RUNNING" || sensor.status === "USSING"
                  ? sensor3img
                  : sensorimg
              }
              className="avatar rounded mr-2"
              alt=""
            />
            <Media body>
              <h6 className="mt-1 mb-0 font-size-15">{sensor.name}</h6>
              <h6 className="text-muted font-weight-normal mt-1">
                {sensor.datatype_id}
              </h6>
            </Media>
          </Media>
        ),
      }
    );
  };
  const geSensorsOption = (sensors = []) => {
    return sensors && sensors.map((sensor) => sensorItemInfo(sensor));
  };

  return (
    <Modal isOpen={props.config.show} toggle={props.toggle}>
      {props.loading && <Loader />}
      <AvForm>
        <ModalHeader>Thông tin vị trí</ModalHeader>
        <ModalBody className="px-3">
          <Row>
            <Col>
              <Label for="vitri">Tọa độ</Label>
              <AvGroup id="vitri">
                <div className="input-group">
                  <div class="input-group-prepend text-danger">
                    <span class="input-group-text text-danger font-weight-bold">
                      X
                    </span>
                  </div>
                  <AvInput
                    name="x"
                    disabled
                    value={props.config.x == 0 ? "0" : props.config.x}
                  />
                </div>
              </AvGroup>
              <AvGroup>
                <div className="input-group">
                  <div class="input-group-prepend text-danger">
                    <span class="input-group-text text-success font-weight-bold">
                      Y
                    </span>
                  </div>
                  <AvInput
                    name="y"
                    disabled
                    value={props.config.y == 0 ? "0" : props.config.y}
                  />
                </div>
              </AvGroup>
              <AvGroup>
                <div className="input-group">
                  <div class="input-group-prepend text-danger">
                    <span class="input-group-text text-primary font-weight-bold">
                      Z
                    </span>
                  </div>
                  <AvInput
                    name="z"
                    disabled
                    value={props.z == 0 ? "0" : props.z}
                  />
                </div>
              </AvGroup>
            </Col>

            <Col>
              <Label for="khoangchach">Khoảng cách đến trục</Label>
              <AvGroup id="khoangchach">
                <div className="input-group">
                  <AvInput
                    disabled
                    name="dx"
                    value={
                      props.config.x == 0
                        ? "0 - " + (props.config.x + 1) * props.d
                        : props.config.x * props.d +
                          " - " +
                          (props.config.x + 1) * props.d
                    }
                  />
                  <InputGroupAddon addonType="append">cm</InputGroupAddon>
                </div>
              </AvGroup>
              <AvGroup>
                <div className="input-group">
                  <AvInput
                    disabled
                    name="dy"
                    value={
                      props.config.y == 0
                        ? "0 - " + (props.config.y + 1) * props.d
                        : props.config.y * props.d +
                          " - " +
                          (props.config.y + 1) * props.d
                    }
                  />
                  <InputGroupAddon addonType="append">cm</InputGroupAddon>
                </div>
              </AvGroup>
              <AvGroup>
                <div className="input-group">
                  <AvInput
                    disabled
                    name="dz"
                    value={
                      props.z == 0
                        ? "0 - " + (props.z + 1) * props.d
                        : props.z * props.d + " - " + (props.z + 1) * props.d
                    }
                  />
                  <InputGroupAddon addonType="append">cm</InputGroupAddon>
                </div>
              </AvGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label for="choncambien">Chọn cảm biến</Label>
              <Select
                height={100}
                id="choncambien"
                className="react-select"
                classNamePrefix="react-select"
                value={defaultSensor}
                onChange={(value) => {
                  setDefaultSensor(value);
                }}
                options={geSensorsOption(props.sensors)}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: 70,
                    minHeight: 70,
                  }),
                  valueContainer: (provided, state) => ({
                    ...provided,
                    height: "70px",
                    padding: "5px 5px",
                  }),
                }}
              ></Select>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="text-right">
          {oldSensor && oldSensor.id === defaultSensor.id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteSensorAction}
            >
              <i className="uil uil-trash-alt mr-1"> </i>
              Gỡ cảm biên
            </button>
          )}
          {((oldSensor && defaultSensor && oldSensor.id !== defaultSensor.id) ||
            (!oldSensor && defaultSensor && defaultSensor.isUsed)) && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={editSensorAction}
            >
              <i className="uil uil-wrench mr-1"> </i>
              Đổi cảm biến
            </button>
          )}
          {!oldSensor && defaultSensor && !defaultSensor.isUsed && (
            <button
              type="button"
              onClick={addSensorAction}
              className="btn btn-success"
            >
              <i className="uil uil-plus mr-1 mr-1"> </i>
              Thêm cảm biến
            </button>
          )}
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};

export default ConfigSensor;
