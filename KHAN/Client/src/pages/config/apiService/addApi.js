import React from "react";
import { Step, Steps, Wizard } from "react-albus";

import {
  CardBody,
  Progress,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Alert,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import AvRadioGroup from "availity-reactstrap-validation/lib/AvRadioGroup";
import AvRadio from "availity-reactstrap-validation/lib/AvRadio";
import AvGroup from "availity-reactstrap-validation/lib/AvGroup";
import Loader from "components/Loader";
import { getStations, getStationsFailed } from "redux/actions";

export default function AddApi(props) {
  const [username, setUsername] = React.useState("tester@kholanhctu");
  const [password, setPassword] = React.useState("tester@123");

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
      <ModalHeader>Kích hoạt API mới</ModalHeader>
      <ModalBody>
        <Card className="shadow-none">
          <CardBody>
            <Wizard
              render={({ step, steps }) => (
                <React.Fragment>
                  {props.loading && <Loader />}
                  {props.error && (
                    <Alert
                      color="danger"
                      isOpen={props.error != null ? true : false}
                    >
                      <div>{props.error}</div>
                    </Alert>
                  )}
                  <Progress
                    animated
                    striped
                    color="primary"
                    value={((steps.indexOf(step) + 1) / steps.length) * 100}
                    className="mb-3 progress-sm"
                  />

                  <Steps>
                    <Step
                      id="apiUser"
                      render={({ next }) => (
                        <>
                          <AvForm
                            onValidSubmit={(event, values) => {
                              //Get stations and next
                              props.dispatch(
                                getStations(
                                  props.user,
                                  props.CurrentRoomInfo._id,
                                  values.username,
                                  values.password
                                )
                              );
                              setUsername(values.username);
                              setPassword(values.password);
                            }}
                          >
                            {!props.loading &&
                              !props.error &&
                              props.stations &&
                              next()}
                            <AvField
                              name="username"
                              value={username}
                              label="Tên đăng nhập Api"
                              type="text"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage:
                                    "Vui lòng điền tên đăng nhập Api",
                                },
                              }}
                            />
                            <AvField
                              name="password"
                              value={password}
                              label="Mật khẩu đăng nhập Api"
                              type="password"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage:
                                    "Vui lòng điền mật khẩu đăng nhập Api",
                                },
                              }}
                            />

                            <ul className="list-inline wizard mb-0">
                              <li className="next list-inline-item float-right">
                                <Button color="primary" type="submit">
                                  Tiếp theo
                                </Button>
                              </li>
                            </ul>
                          </AvForm>
                        </>
                      )}
                    />
                    <Step
                      id="chooseStation"
                      render={({ previous }) => (
                        <AvForm
                          onValidSubmit={(event, values) => {
                            props.submit({
                              username: username,
                              password: password,
                              station_id: values.station_select.station_id,
                              station_name: values.station_select.station_name,
                            });
                          }}
                        >
                          <AvGroup>
                            <Label for="station_select">Chọn Station:</Label>
                            <AvRadioGroup
                              name="station_select"
                              required
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: "Vui lòng chọn Station",
                                },
                              }}
                            >
                              {props.stations &&
                                props.stations.map((station) => (
                                  <AvRadio
                                    className="mt-3 mb-3"
                                    customInput
                                    label={station.station_name}
                                    value={{
                                      station_id: station.station_id,
                                      station_name: station.station_name,
                                    }}
                                  />
                                ))}
                            </AvRadioGroup>
                          </AvGroup>
                          <ul className="list-inline wizard mt-2 mb-0">
                            <li className="previous list-inline-item">
                              <Button
                                onClick={() => {
                                  props.dispatch(getStationsFailed(null));
                                  previous();
                                }}
                                color="secondary"
                              >
                                Trở lại
                              </Button>
                            </li>
                            <li className="next list-inline-item float-right">
                              <Button color="primary" type="submit">
                                Hoàn tất
                              </Button>
                            </li>
                          </ul>
                        </AvForm>
                      )}
                    />
                  </Steps>
                </React.Fragment>
              )}
            />
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  );
}
