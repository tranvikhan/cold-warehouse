import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { isMobileOnly } from "react-device-detect";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import * as FeatherIcon from "react-feather";

import AppMenu from "./AppMenu";
import { useDispatch } from "react-redux";
import {
  getNotificationList,
  getRoomList,
  getAreaDataSuccess,
  getCubeDataSuccess,
  getCurrentDataSuccess,
  updateRoomSuccess,
  pushNotification,
  updateNotification,
  getSensorDataSuccess,
  getRoomListFailed,
  getNotificationListFailed,
  deleteRoomSuccess,
  addSensorSuccess,
  deleteSensorSuccess,
  updateSensorSuccess,
  addAreaSuccess,
  updateAreaSuccess,
  deleteAreaSuccess,
  addMonitorSuccess,
  updateMonitorSuccess,
  deleteMonitorSuccess,
  addActivateSuccess,
  deleteActivateSuccess,
  updateAccessSuccess,
  AddAccessSuccess,
  deleteAccessSuccess,
  getAreas,
} from "redux/actions";
import { showNotification } from "helpers/webNotification";
/* import MySocket from 'socket.controller'; */
import { useToasts } from "react-toast-notifications";
const { BASE_URL } = require("constants/apiConfig");

var io = require("socket.io-client");
/**
 * User Widget
 */
const UserProfile = (props) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const webSocket = React.useRef(null);

  React.useEffect(() => {
    if (props.user && props.user.accessToken) {
      dispatch(getRoomList(props.user));
      dispatch(getNotificationList(props.user));
    } else {
      console.log("Disconnect");
      if (webSocket.current) webSocket.current.disconnect();
      webSocket.current = null;
    }
    return () => {
      console.log("Disconnect");
      if (webSocket.current) webSocket.current.disconnect();
      webSocket.current = null;
    };
  }, [props.user]);

  const checkDispatch = (room_id, action) => {
    if (props.currentRoom_id === room_id) {
      dispatch(action);
    }
  };

  const checkAnoUserAction = (room_id, actionBy, action) => {
    if (props.currentRoom_id === room_id && actionBy != props.user.user._id) {
      dispatch(action);
    }
  };

  React.useEffect(() => {
    if (props.user.accessToken && props.currentRoom_id) {
      if (webSocket.current) webSocket.current.disconnect();
      webSocket.current = io.connect(BASE_URL);
      console.log("Connect");
      const socket = webSocket.current;
      console.log(
        "Socket io Client run socket client with room: ",
        props.currentRoom_id
      );

      socket.on("connect", function () {
        console.log("Socket io Client  Connected");
        socket.emit("login", props.user.accessToken);
      });

      socket.on("data_cube_room", function (data) {
        checkDispatch(data.room, getCubeDataSuccess(data));
        console.log("Socket io Client Cube", data);
      });
      socket.on("data_sensor", function (data) {
        checkDispatch(data.room, getSensorDataSuccess(data));
        console.log("Socket io Client Sensor", data);
      });

      socket.on("data_room", function (data) {
        checkDispatch(data.room, getCurrentDataSuccess(data));
        console.log("Socket io Client Curent Data", data);
      });
      socket.on("log", function (data) {
        console.log("Socket io Client Log", data);
      });

      socket.on("data_area", function (data) {
        checkDispatch(data.room, getAreaDataSuccess(data));
        console.log("Socket io Client Area", data);
      });

      socket.on("notification", function (data) {
        if (data.message == "add") {
          dispatch(pushNotification(data.data));

          if (Notification.permission == "granted") {
            showNotification("Quản lý nhiệt độ kho lạnh", data.data.content);
          } else {
            addToast(data.data.content, {
              appearance: "warning",
              autoDismiss: true,
            });
          }
        }
        if (data.message == "update") {
          dispatch(updateNotification(data.data._id, data.data));
        }
        //console.log('Socket io Client Notification',data);
      });

      socket.on("access", function (data) {
        console.log(data);
        if (data.message == "accepted") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            updateAccessSuccess(data.data.access)
          );
        }
        if (data.message == "invite") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            AddAccessSuccess(data.data.access)
          );
        }
        if (data.message == "add") {
          if (
            props.user &&
            data.data.access.user &&
            data.data.access.user._id === props.user.user._id
          ) {
            socket.emit("join-room", "room" + data.data.room._id);
            dispatch(getRoomList(props.user));
          }
        }
        if (data.message == "edit") {
          if (
            props.user &&
            data.data.access.user &&
            data.data.access.user._id !== props.user.user._id
          ) {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateAccessSuccess(data.data.access)
            );
          } else {
            dispatch(getRoomList(props.user));
          }
        }
        if (data.message == "delete") {
          if (
            props.user &&
            data.data.access.user &&
            data.data.access.user._id !== props.user.user._id
          ) {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              deleteAccessSuccess(data.data.access._id)
            );
          } else {
            socket.emit("leave-room", "room" + data.data.room._id);
            dispatch(getRoomList(props.user));
          }
        }
        console.log("Socket io Client Access ", data);
      });

      socket.on("area", function (data) {
        if (data.message == "add") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            addAreaSuccess(data.data.area)
          );
        }
        if (data.message == "edit") {
          if (
            props.currentArea &&
            props.currentArea._id === data.data.area._id
          ) {
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateAreaSuccess(data.data.area)
            );
          }
        }
        if (data.message == "delete") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            deleteAreaSuccess(data.data.area._id)
          );
        }
        if (data.message == "add-monitor") {
          if (props.currentArea && props.currentArea._id === data.data.area._id)
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              addMonitorSuccess(data.data.monitors)
            );
        }
        if (data.message == "edit-monitor") {
          if (props.currentArea && props.currentArea._id === data.data.area._id)
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateMonitorSuccess(data.data.monitor)
            );
        }
        if (data.message == "switch-monitor") {
          if (props.currentArea && props.currentArea._id === data.data.area._id)
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              updateMonitorSuccess(data.data.monitor)
            );
        }
        if (data.message == "delete-monitor") {
          if (props.currentArea && props.currentArea._id === data.data.area._id)
            checkAnoUserAction(
              data.data.room._id,
              data.data.actionBy,
              deleteMonitorSuccess(data.data.monitors)
            );
        }
        console.log("Socket io Client Area Info", data);
      });

      socket.on("activate", function (data) {
        if (data.message == "add") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            addActivateSuccess(data.data.activate)
          );
        }
        if (data.message == "delete") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            deleteActivateSuccess(data.data.activate._id)
          );
        }

        console.log("Socket io Client Activate ", data);
      });

      socket.on("room", function (data) {
        if (data.message == "edit") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            updateRoomSuccess(data.data.room)
          );
        }
        if (data.message == "delete") {
          socket.emit("leave-room", "room" + data.data.room._id);
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            deleteRoomSuccess(data.data.room._id)
          );
        }

        console.log("Socket io Room Info ", data);
      });

      socket.on("structure", function (data) {
        if (data.message == "add") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            addSensorSuccess(data.data.structure)
          );
        }
        if (data.message == "update") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            updateSensorSuccess(data.data.structure)
          );
        }
        if (data.message == "delete") {
          checkAnoUserAction(
            data.data.room._id,
            data.data.actionBy,
            deleteSensorSuccess(data.data.structure)
          );
        }

        console.log("Socket io Client Structure ", data);
      });

      socket.on("disconnect", function () {});
    }

    return () => {
      if (webSocket.current) webSocket.current.disconnect();
    };
  }, [props.user.accessToken, props.currentRoom_id, props.currentArea]);

  return (
    <React.Fragment>
      <div className="media user-profile mt-2 mb-2">
        <img
          src={props.user.user.avatar}
          className="avatar-sm rounded-circle mr-2"
          alt={props.user.user.username}
        />
        <img
          src={props.user.user.avatar}
          className="avatar-xs rounded-circle mr-2"
          alt={props.user.user.username}
        />

        <div className="media-body">
          <h6 className="pro-user-name mt-0 mb-0">
            {props.user.user.fullname}
          </h6>
          <span className="pro-user-desc">{props.user.user.username}</span>
        </div>

        <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
          <DropdownToggle
            data-toggle="dropdown"
            tag="button"
            className="btn btn-link p-0 dropdown-toggle mr-0"
          >
            <FeatherIcon.ChevronDown />
          </DropdownToggle>
          <DropdownMenu
            right
            className="topbar-dropdown-menu profile-dropdown-items"
          >
            <Link to="/account/info" className="dropdown-item notify-item">
              <FeatherIcon.User className="icon-dual icon-xs mr-2" />
              <span>Tài khoản</span>
            </Link>
            <Link to="/account/lock" className="dropdown-item notify-item">
              <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
              <span>Khóa màn hình</span>
            </Link>
            <DropdownItem divider />
            <Link to="/account/logout" className="dropdown-item notify-item">
              <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
              <span>Đăng xuất</span>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </React.Fragment>
  );
};

/**
 * Sidenav
 */
const SideNav = () => {
  return (
    <div className="sidebar-content">
      <div id="sidebar-menu">
        <AppMenu />
      </div>
    </div>
  );
};

class LeftSidebar extends Component {
  menuNodeRef;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOtherClick = this.handleOtherClick.bind(this);
  }

  /**
   * Bind event
   */
  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Bind event
   */
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Handle the click anywhere in doc
   */
  handleOtherClick = (e) => {
    if (this.menuNodeRef.contains(e.target)) return;
    // else hide the menubar
    if (document.body && isMobileOnly) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  /**
   * Handle click
   * @param {*} e
   * @param {*} item
   */
  handleClick(e) {
    console.log(e);
  }

  render() {
    const isCondensed = this.props.isCondensed || false;
    return (
      <React.Fragment>
        <div
          className="left-side-menu"
          ref={(node) => (this.menuNodeRef = node)}
        >
          <UserProfile {...this.props} />
          {!isCondensed && (
            <PerfectScrollbar>
              <SideNav />
            </PerfectScrollbar>
          )}
          {isCondensed && <SideNav />}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const { user, loading, error } = state.Auth;
  const { currentArea } = state.RoomArea;
  const currentRoom_id = state.RoomList.currentRoom
    ? state.RoomList.currentRoom.room._id
    : null;
  return { user, loading, error, currentRoom_id, currentArea };
};
export default connect(mapStateToProps, {})(LeftSidebar);
