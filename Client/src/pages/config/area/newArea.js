import React from "react";
import {
  Modal,
  ModalHeader,
  CardBody,
  ModalFooter,
  Card,
  Button,
  Label,
  CustomInput,
  Col,
  Row,
} from "reactstrap";
import { AvForm, AvGroup } from "availity-reactstrap-validation";
import Loader from "components/Loader";
import AvInput from "availity-reactstrap-validation/lib/AvInput";
import AvField from "availity-reactstrap-validation/lib/AvField";

const NewArea = (props) => {
  const [name, setName] = React.useState("");
  const [emailOn, setEmailOn] = React.useState(false);
  const [monitorOn, setMonitorOn] = React.useState(false);
  const [maxSize, setMaxSize] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [size, setSize] = React.useState({
    x0: 0,
    y0: 0,
    z0: 0,
    x1: 10,
    y1: 10,
    z1: 10,
  });
  React.useEffect(() => {
    if (props.CurrentRoomInfo) {
      setMaxSize({
        x:
          props.CurrentRoomInfo.size.x / props.CurrentRoomInfo.sensorDensity -
          1,
        y:
          props.CurrentRoomInfo.size.y / props.CurrentRoomInfo.sensorDensity -
          1,
        z:
          props.CurrentRoomInfo.size.z / props.CurrentRoomInfo.sensorDensity -
          1,
      });
    }
  }, [props.CurrentRoomInfo]);
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
      {props.loading && <Loader />}
      <AvForm
        onValidSubmit={(vl) => {
          props.submit(name, size, emailOn, monitorOn);
        }}
      >
        <ModalHeader>Thêm khu vực mới</ModalHeader>
        <Card className="shadow-none">
          <CardBody>
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
                  <Label for="monitorNoti">Bật thông báo ứng dụng</Label>
                  <CustomInput
                    type="switch"
                    id="monitorNoti"
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
                  <Label for="emailNoti">Bật thông báo email</Label>
                  <CustomInput
                    type="switch"
                    id="emailNoti"
                    name="emailOn"
                    onChange={() => {
                      setEmailOn(!emailOn);
                    }}
                    checked={emailOn}
                  />
                </AvGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <ModalFooter>
          <Button type="submit" color="primary">
            Thêm
          </Button>
          <Button type="button" onClick={props.toggleOpen} color="secondary">
            Hủy
          </Button>
        </ModalFooter>
      </AvForm>
    </Modal>
  );
};
export default NewArea;
