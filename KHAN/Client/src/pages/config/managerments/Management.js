import React, { useEffect } from "react";
import {
  CardHeader,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Button,
  Row,
  Col,
} from "reactstrap";

import "react-perfect-scrollbar/dist/css/styles.css";

import AddUser from "./addUser";
import EditRoleUser from "./editUserMg";
import ConfirmDialog from "components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { AddAccess, deleteAccess, updateAccess } from "redux/actions";

const getRoleName = {
  Owner: "Chủ kho lạnh",
  Manager: "Chỉnh sửa",
  Viewer: "Chỉ xem",
};

const GetTool = (props) => {
  const [modalEdit, setModalEdit] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);
  const loading = useSelector((state) => state.RoomAccess.loading);
  const error = useSelector((state) => state.RoomAccess.error);
  const auth = useSelector((state) => state.Auth);
  const currentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );
  const dispatch = useDispatch();

  const [editting, setEditting] = React.useState(false);
  const [deletting, setDeletting] = React.useState(false);
  React.useEffect(() => {
    if (modalDelete && deletting && !loading && error == null) {
      setModalDelete(!modalDelete);
      setDeletting(false);
    }
  }, [loading, error, deletting, modalDelete]);

  React.useEffect(() => {
    if (modalEdit && editting && !loading && error == null) {
      setModalEdit(!modalEdit);
      setEditting(false);
    }
  }, [loading, error, editting, modalEdit]);

  return (
    <>
      <UncontrolledDropdown className="align-self-center float-right">
        <DropdownToggle
          tag="button"
          className="btn btn-link p-0 dropdown-toggle text-muted"
        >
          <i className="uil uil-ellipsis-v"></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            onClick={() => {
              setModalEdit(!modalEdit);
            }}
            disabled={props.access.role === "Owner"}
          >
            <i className="uil uil-edit-alt mr-2"></i>Sửa quyền
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            className="text-danger"
            disabled={props.access.role === "Owner"}
            onClick={() => {
              setModalDelete(!modalDelete);
            }}
          >
            <i className="uil uil-trash mr-2"></i>
            {props.access.accepted ? "Xóa quyền" : "Hủy lời mời"}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <EditRoleUser
        access={props.access}
        loading={loading}
        error={error}
        isOpen={modalEdit}
        toggleOpen={() => {
          setModalEdit(!modalEdit);
        }}
        onSubmit={(newRole, access_id) => {
          setEditting(true);
          dispatch(
            updateAccess(auth.user, currentRoomInfo._id, access_id, newRole)
          );
        }}
      ></EditRoleUser>
      <ConfirmDialog
        title={
          props.access.accepted
            ? "Xác nhận xóa quyền truy cập của tài khoản"
            : "Xác nhận hủy lời mời truy cập của tài khoản"
        }
        loading={loading}
        error={error}
        content={<UserDetail access={props.access} />}
        color="danger"
        isOpen={modalDelete}
        toggle={() => {
          setModalDelete(!modalDelete);
        }}
        confirm={() => {
          dispatch(
            deleteAccess(auth.user, currentRoomInfo._id, props.access._id)
          );
          setDeletting(true);
        }}
      ></ConfirmDialog>
    </>
  );
};
const UserDetail = (props) => {
  return (
    <Media className="mt-1 pt-3">
      <img
        src={props.access.user.avatar}
        className={"avatar rounded mr-3"}
        alt={props.access.user.fullname}
      />
      <Media body>
        <h6 className="mt-1 mb-0 font-size-15">{props.access.user.fullname}</h6>
        <h6 className="text-muted font-weight-normal mt-1 mb-3">
          {getRoleName[props.access.role]}
        </h6>
      </Media>
    </Media>
  );
};

const Member = (props) => {
  return (
    <Media className="mt-1 border-top pt-3">
      <img
        src={props.access.user.avatar}
        className={"avatar rounded mr-3"}
        alt={props.access.user.fullname}
      />
      <Media body>
        <h6 className="mt-1 mb-0 font-size-15">{props.access.user.fullname}</h6>
        <h6 className="text-muted font-weight-normal mt-1 mb-3">
          {getRoleName[props.access.role]}
          {!props.access.accepted && (
            <span className="text-warning">{" - Đã gửi lời mời"}</span>
          )}
        </h6>
      </Media>
      {props.access.role !== "Owner" &&
        props.auth &&
        props.auth.user &&
        props.access.user._id !== props.auth.user.user._id && (
          <GetTool {...props}></GetTool>
        )}
    </Media>
  );
};

const Members = () => {
  const [modalnew, setmodalnew] = React.useState(false);
  const accesses = useSelector((state) => state.RoomAccess.accesses);
  const loading = useSelector((state) => state.RoomAccess.loading);
  const error = useSelector((state) => state.RoomAccess.error);
  const [adding, setAdding] = React.useState(false);

  const auth = useSelector((state) => state.Auth);
  const currentRoomInfo = useSelector(
    (state) => state.RoomList.currentRoomInfo
  );
  const dispatch = useDispatch();
  const submitAdd = (selectedUsers, role) => {
    selectedUsers.map((user) => {
      dispatch(AddAccess(auth.user, currentRoomInfo._id, user.id, role));
      setAdding(true);
    });
  };

  React.useEffect(() => {
    if (modalnew && adding && !loading && error == null) {
      setAdding(false);
      setmodalnew(!modalnew);
    }
  }, [modalnew, adding, loading, error]);

  return (
    <>
      <Card className="shadow-none">
        <CardHeader className="bg-transparent text-right">
          <Button
            className="mt-4"
            color="primary"
            onClick={() => {
              setmodalnew(!modalnew);
            }}
          >
            <i className="uil uil-user-plus mr-1"></i>
            Thêm người mới
          </Button>
        </CardHeader>
        <CardBody>
          {accesses && accesses.map((ac) => <Member access={ac} auth={auth} />)}
        </CardBody>
      </Card>
      <AddUser
        isOpen={modalnew}
        toggleOpen={() => {
          setmodalnew(!modalnew);
        }}
        submitAdd={submitAdd}
        loading={loading}
        error={error}
      ></AddUser>
    </>
  );
};

const Management = () => {
  return (
    <React.Fragment>
      <Row className="page-title align-items-center">
        <Col xs={12}>
          <h4 className="mb-1 mt-0">Quản lý quyền truy cập</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card className="mb-5">
            <CardBody>
              <Members />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Management;
