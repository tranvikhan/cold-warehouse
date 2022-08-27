import React from "react";
import {
  CardHeader,
  Card,
  CardBody,
  Media,
  Button,
  Row,
  Col,
} from "reactstrap";

import "react-perfect-scrollbar/dist/css/styles.css";
import { dateToString } from "helpers/datetimeCover";
import ConfirmDialog from "components/ConfirmDialog";
import AddApi from "./addApi";
import { useDispatch, useSelector } from "react-redux";
import { addActivate, deleteActivate } from "redux/actions";

const APIDetail = (props) => {
  return (
    <>
      <h6 className="mt-0 mb-2 font-size-15">
        <p href="/" className="text-body">
          {props.api.station_name}
        </p>
      </h6>
      <p>
        <span className="text-black-50">Tên đăng nhập: </span>
        {props.api.api.username}
      </p>
      <p className="mb-0 mt-4">
        <span className="text-nowrap align-middle font-size-13">
          <i className="uil uil-rss-alt text-muted mr-1"></i>
          {props.api.station_id}
        </span>
        <small className="float-right text-muted">
          <i className="uil uil-calender mr-1"></i>
          {dateToString(props.api.createdAt)}
        </small>
      </p>
    </>
  );
};

const ApiService = () => {
  const [modalnew, setmodalnew] = React.useState(false);
  const [adding, setAdding] = React.useState(false);

  const activates = useSelector((state) => state.RoomActivate.activates);
  const user = useSelector((state) => state.Auth.user);
  const CurrentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );

  const dispatch = useDispatch();
  const stations = useSelector((state) => state.RoomActivate.stations);
  const loading = useSelector((state) => state.RoomActivate.loading);
  const error = useSelector((state) => state.RoomActivate.error);

  React.useEffect(() => {
    if (adding && !loading && !error) {
      setAdding(false);
      setmodalnew(!modalnew);
    }
  }, [adding, loading, error]);

  return (
    <React.Fragment>
      <Row className="page-title align-items-center">
        <Col xs={12}>
          <h4 className="mb-1 mt-0">Quản lý tài khoản Api</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card className="mb-5">
            <CardBody>
              <Card className="shadow-none">
                <CardHeader className="bg-transparent text-right">
                  <Button
                    className="mt-1"
                    color="primary"
                    onClick={() => {
                      setmodalnew(!modalnew);
                    }}
                  >
                    <i className="uil uil-plug mr-1"></i>
                    Kích hoạt API mới
                  </Button>
                </CardHeader>
                <CardBody>
                  {activates &&
                    activates.map((api) => (
                      <API
                        api={api}
                        user={user}
                        dispatch={dispatch}
                        CurrentRoomInfo={CurrentRoomInfo}
                        loading={loading}
                        error={error}
                      />
                    ))}
                </CardBody>
              </Card>
              {modalnew && (
                <AddApi
                  isOpen={modalnew}
                  toggleOpen={() => {
                    setmodalnew(!modalnew);
                  }}
                  submit={(value) => {
                    dispatch(
                      addActivate(
                        user,
                        CurrentRoomInfo._id,
                        value.username,
                        value.password,
                        value.station_id,
                        value.station_name
                      )
                    );
                    setAdding(true);
                  }}
                  user={user}
                  dispatch={dispatch}
                  CurrentRoomInfo={CurrentRoomInfo}
                  loading={loading}
                  error={error}
                  stations={stations}
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const API = (props) => {
  const [modalDelete, setModalDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  React.useEffect(() => {
    if (deleting && !props.loading && !props.error) {
      setDeleting(false);
      setModalDelete(!modalDelete);
    }
  }, [deleting, props.loading, props.error]);

  return (
    <React.Fragment>
      <Card className="border mb-3">
        <CardBody className="p-3">
          <Button
            className="float-right p-0"
            color="outline-danger"
            onClick={() => {
              setModalDelete(!modalDelete);
            }}
          >
            <i className="uil uil-trash mx-1"></i>
          </Button>

          <h6 className="mt-0 mb-2 font-size-15">
            <p href="/" className="text-body">
              {props.api.station_name}
            </p>
          </h6>
          <p>
            <span className="text-black-50">Tên đăng nhập: </span>
            {props.api.api.username}
          </p>
          <p className="mb-0 mt-4">
            <span className="text-nowrap align-middle font-size-13">
              <i className="uil uil-rss-alt text-muted mr-1"></i>
              {props.api.station_id}
            </span>
            <small className="float-right text-muted">
              <i className="uil uil-calender mr-1"></i>
              {dateToString(props.api.createdAt)}
            </small>
          </p>
        </CardBody>
      </Card>
      <ConfirmDialog
        title="Xác nhận xóa bỏ tài khoản API"
        content={<APIDetail api={props.api} />}
        color="danger"
        isOpen={modalDelete}
        toggle={() => {
          setModalDelete(!modalDelete);
        }}
        confirm={() => {
          setDeleting(true);
          props.dispatch(
            deleteActivate(props.user, props.CurrentRoomInfo._id, props.api._id)
          );
        }}
        loading={props.loading}
        error={props.error}
      ></ConfirmDialog>
    </React.Fragment>
  );
};

export default ApiService;
