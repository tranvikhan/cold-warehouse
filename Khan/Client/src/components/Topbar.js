import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import {
  Menu,
  X,
  Search,
  Settings,
  User,
  HelpCircle,
  Lock,
  LogOut,
  ChevronDown,
  Plus,
} from "react-feather";
import {
  showRightSidebar,
  getCurrentRoomInfo,
  createRoom,
  getNotificationList,
  setCurrentRoom,
  getAreaData,
  getCurrentData,
  getSensorData,
  getCubeData,
  getRoomStructure,
  getUserAccess,
  getActivates,
  getAreas,
  getCurrentRoomInfoFailed,
  getAreaDataFailed,
  getCurrentDataFailed,
  getSensorDataFailed,
  getCubeDataFailed,
  getRoomStructureFailed,
  getUserAccessFailed,
  getActivatesFailed,
  getAreasFailed,
} from "../redux/actions";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import LanguageDropdown from "./LanguageDropdown";

import logo from "../assets/images/logo.png";
import profilePic from "../assets/images/users/avatar-7.jpg";
import NewWareHouse from "./newWareHouse";
import { useDispatch, useSelector } from "react-redux";

const ProfileMenus = [
  {
    label: "My Account",
    icon: User,
    redirectTo: "/",
  },
  {
    label: "Settings",
    icon: Settings,
    redirectTo: "/",
  },
  {
    label: "Support",
    icon: HelpCircle,
    redirectTo: "/",
  },
  {
    label: "Lock Screen",
    icon: Lock,
    redirectTo: "/",
  },
  {
    label: "Logout",
    icon: LogOut,
    redirectTo: "/account/logout",
    hasDivider: true,
  },
];

const Topbar = (props) => {
  const [newWareHouseModal, setNewWareHouseModal] = useState(false);
  const dispatch = useDispatch();
  const action_name = useSelector((state) => state.RoomList.action_name);
  const loading = useSelector((state) => state.RoomList.loading);
  const error = useSelector((state) => state.RoomList.error);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => {
    setNewWareHouseModal(!newWareHouseModal);
  };

  useEffect(() => {
    if (props.currentRoom && props.user && props.currentRoom.room._id) {
      dispatch(getAreaDataFailed(null));
      dispatch(getCurrentDataFailed(null));
      dispatch(getSensorDataFailed(null));
      dispatch(getCubeDataFailed(null));

      dispatch(getRoomStructureFailed(null));
      dispatch(getUserAccessFailed(null));
      dispatch(getActivatesFailed(null));
      dispatch(getAreasFailed(null));

      //

      dispatch(getCurrentRoomInfo(props.user, props.currentRoom.room._id));

      dispatch(getAreaData(props.user, props.currentRoom.room._id));
      dispatch(getCurrentData(props.user, props.currentRoom.room._id));
      dispatch(getSensorData(props.user, props.currentRoom.room._id));
      dispatch(getCubeData(props.user, props.currentRoom.room._id));

      dispatch(getRoomStructure(props.user, props.currentRoom.room._id));
      dispatch(getUserAccess(props.user, props.currentRoom.room._id));
      dispatch(getActivates(props.user, props.currentRoom.room._id));
      dispatch(getAreas(props.user, props.currentRoom.room._id));
    }
    if (props.user == null) {
      setCurrentRoom(null);
    }
    return () => {
      /* dispatch(getAreaDataFailed(null));
      dispatch(getCurrentDataFailed(null));
      dispatch(getSensorDataFailed(null));
      dispatch(getCubeDataFailed(null));
      dispatch(getCurrentRoomInfoFailed(null)); */
    };
  }, [props.user, props.currentRoom]);

  const setCurrent = (obj) => {
    dispatch(setCurrentRoom(obj));
  };
  const submitNewRoom = (room) => {
    dispatch(createRoom(props.user, room));
    setIsSubmitting(true);
  };
  useEffect(() => {
    if (newWareHouseModal && isSubmitting) {
      if (!error && !loading) {
        setNewWareHouseModal(false);
        setIsSubmitting(false);
      }
    }
  }, [loading, error, newWareHouseModal, isSubmitting]);

  return (
    <React.Fragment>
      <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
        <Container fluid>
          {/* logo */}
          <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
            <span className="logo-lg">
              <img src={logo} alt="" height="40" />
            </span>
            <span className="logo-sm">
              <img src={logo} alt="" height="40" />
            </span>
          </Link>

          {/* menu*/}
          <ul className="navbar-nav bd-navbar-nav list-unstyled menu-left mb-0">
            <li className="">
              <button
                className="button-menu-mobile open-left disable-btn mr-0"
                onClick={props.openLeftMenuCallBack}
              >
                <Menu className="menu-icon" />
                <X className="close-icon" />
              </button>
            </li>
          </ul>

          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="default"
              className="dropdown-toggle text-dark font-weight-bold mt-2"
            >
              {props.currentRoom && props.currentRoom.room.name}
              <i className="icon ml-1">
                <ChevronDown />
              </i>
            </DropdownToggle>
            <DropdownMenu right>
              {props.myRoom && props.myRoom.length > 0 ? (
                <DropdownItem header>Kho của tôi</DropdownItem>
              ) : (
                <></>
              )}
              {props.myRoom &&
                props.myRoom.map((obj) => (
                  <DropdownItem
                    onClick={() => {
                      setCurrent(obj);
                    }}
                  >
                    <span>{obj.room.name}</span>
                  </DropdownItem>
                ))}

              {props.sharedRoom && props.sharedRoom.length > 0 ? (
                <DropdownItem header>Kho được chia sẻ</DropdownItem>
              ) : (
                <></>
              )}

              {props.sharedRoom &&
                props.sharedRoom.map((obj) => (
                  <DropdownItem
                    onClick={() => {
                      setCurrent(obj);
                    }}
                  >
                    <span>{obj.room.name}</span>
                  </DropdownItem>
                ))}
              {((props.sharedRoom && props.sharedRoom[0]) ||
                (props.myRoom && props.myRoom[0])) && <DropdownItem divider />}
              <DropdownItem className="text-success" onClick={toggleModal}>
                <i className="icon ml-1">
                  <Plus />
                </i>
                Tạo kho lạnh mới
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <NewWareHouse
            error={error}
            isOpen={newWareHouseModal}
            toggleOpen={toggleModal}
            submit={(value) => {
              submitNewRoom(value);
            }}
            loading={loading}
          />
          <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
            {/* <li className="d-none d-sm-block">
              <div className="app-search">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm ..."
                    />
                    <Search />
                  </div>
                </form>
              </div>
            </li>

            <LanguageDropdown tag="li" /> */}
            <NotificationDropdown />

            {/* <li className="notification-list">
                            <button
                                className="btn btn-link nav-link right-bar-toggle"
                                onClick={this.handleRightSideBar}>
                                <Settings />
                            </button>
                        </li> */}

            <ProfileDropdown
              profilePic={profilePic}
              menuItems={ProfileMenus}
              username={"Shreyu N"}
              description="Administrator"
            />
          </ul>
        </Container>
      </div>
    </React.Fragment>
  );
};

Topbar.defaultProps = {
  auth: null,
  myRoom: [],
  sharedRoom: [],
  currentRoom: {
    role: "Owner",
    room: {
      _id: undefined,
      name: "Đang tải dữ liệu...",
    },
  },
};

const mapStateToProps = (state) => {
  const { myRoom, sharedRoom, currentRoom } = state.RoomList;
  const { user } = state.Auth;
  return { user, myRoom, sharedRoom, currentRoom };
};

export default connect(mapStateToProps, { showRightSidebar })(Topbar);
