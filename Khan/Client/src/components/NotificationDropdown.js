import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
} from "reactstrap";
import { Bell } from "react-feather";
import { useToasts } from "react-toast-notifications";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import NotificationDetail from "./notificatonDetail";
import { dateToString } from "helpers/datetimeCover";
import { showNotification } from "helpers/webNotification";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotification,
  deleteNotification,
  replyAccess,
} from "redux/actions";

const notificationContainerStyle = {
  maxHeight: "400px",
};

const NotificationDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const notifications = useSelector((state) => state.Notification);

  const auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  const [notificationDefault, setNotificationDefault] = React.useState({
    show: false,
    info: {},
  });

  /*:: toggleDropdown: () => void */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleNotification = () => {
    setNotificationDefault({
      ...notificationDefault,
      show: !notificationDefault.show,
    });
  };
  const ShowNotification = (item) => {
    setNotificationDefault({
      info: item,
      show: !notificationDefault.show,
    });
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
        className="notification-list"
        tag="div"
        id="notiDropdown"
      >
        <DropdownToggle
          data-toggle="dropdown"
          tag="a"
          className="nav-link dropdown-toggle"
          onClick={toggleDropdown}
          aria-expanded={dropdownOpen}
        >
          <Bell />
          <span className="noti-icon-badge"></span>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-lg">
          <div onClick={toggleDropdown}>
            <div className="dropdown-item noti-title border-bottom">
              <h5 className="m-0 font-size-16">
                <span className="float-right">
                  <Clear />
                </span>
                Thông báo
              </h5>
            </div>
          </div>
          <PerfectScrollbar style={notificationContainerStyle}>
            {notifications &&
              notifications.list &&
              notifications.list.map((item, i) => {
                return (
                  <GetNotification
                    i={i}
                    item={item}
                    openNotification={(value) => ShowNotification(value)}
                  ></GetNotification>
                );
              })}
          </PerfectScrollbar>
        </DropdownMenu>
      </Dropdown>
      <UncontrolledTooltip placement="left" target="notiDropdown">
        {notifications && notifications.length} thông báo mới
      </UncontrolledTooltip>
      <NotificationDetail
        isOpen={notificationDefault.show}
        toggle={toggleNotification}
        content={notificationDefault.info}
        deleteAction={() => {
          toggleNotification();
          dispatch(deleteNotification(auth.user, notificationDefault.info._id));
        }}
        sayYesAccess={() => {
          dispatch(
            replyAccess(auth.user, notificationDefault.info.obj_id, true)
          );
          dispatch(deleteNotification(auth.user, notificationDefault.info._id));
          toggleNotification();
        }}
        sayNoAccess={() => {
          dispatch(
            replyAccess(auth.user, notificationDefault.info.obj_id, false)
          );
          dispatch(deleteNotification(auth.user, notificationDefault.info._id));
          toggleNotification();
        }}
      ></NotificationDetail>
    </React.Fragment>
  );
};

const Clear = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);
  return (
    <Link
      to="#"
      className="text-dark"
      onClick={() => {
        dispatch(deleteAllNotification(auth.user));

        if (Notification.permission == "granted") {
          showNotification(
            "Quản lý nhiệt độ kho lạnh",
            "Đã xóa toàn bộ thông báo"
          );
        } else {
          addToast("Đã xóa toàn bộ thông báo", {
            appearance: "success",
            autoDismiss: true,
          });
        }
      }}
    >
      <small>Xóa hết</small>
    </Link>
  );
};
const GetNotification = (props) => {
  const getIcon = () => {
    let icon;
    let color;
    let title;
    switch (props.item.type) {
      case "WARRING_LOW_TEMPERATURE":
        icon = "uil  uil-temperature-minus";
        color = "warning";
        title = "Cảnh báo nhiệt độ thấp";
        break;
      case "WARRING_HIGH_TEMPERATURE":
        icon = "uil  uil-temperature-plus";
        color = "danger";
        title = "Cảnh báo nhiệt độ cao";
        break;
      case "Access-Invite":
        icon = "uil uil-envelope-add";
        color = "success";
        title = "Lời mời cộng tác";
        break;
      case "SUCCESS":
        icon = "uil uil-check";
        color = "success";
        title = "Thành công";
        break;
      case "ERRO":
        icon = "uil uil-times";
        color = "danger";
        title = "Lỗi";
        break;

      default:
        icon = "uil  uil-exclamation-triangle";
        color = "warning";
        title = "Thông báo";
        break;
    }
    return {
      icon: icon,
      color: color,
      title: title,
    };
  };
  return (
    <Link
      onClick={() => {
        props.openNotification(props.item);
      }}
      className="dropdown-item notify-item"
      key={props.i + "-noti"}
    >
      <div className={`notify-icon bg-${getIcon().color}`}>
        <i className={getIcon().icon}></i>
      </div>
      <p className="notify-details">
        {getIcon().title}
        <small>{props.item.content}</small>
        <small className="text-muted">
          {dateToString(props.item.updatedAt)}
        </small>
      </p>
    </Link>
  );
};

export default NotificationDropdown;
