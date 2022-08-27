import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import * as FeatherIcon from "react-feather";

import { isUserAuthenticated } from "../helpers/authUtils";
import { useSelector } from "react-redux";

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));
const Confirm = React.lazy(() => import("../pages/auth/Confirm"));
// status
const Status = React.lazy(() => import("../pages/status"));
// dashboard
const Report = React.lazy(() => import("../pages/report"));
// config
const SensorMap = React.lazy(() =>
  import("../pages/config/sensorMap/sensorMap")
);
const AreaConfig = React.lazy(() => import("../pages/config/area/areaConfig"));
const Management = React.lazy(() =>
  import("../pages/config/managerments/Management")
);
const WareHouseConfig = React.lazy(() =>
  import("../pages/config/warehouseConfig/warehouseConfig")
);
const ApiService = React.lazy(() =>
  import("../pages/config/apiService/ApiService")
);

//more pages
const Store = React.lazy(() => import("../pages/store"));
const Help = React.lazy(() => import("../pages/help"));
const About = React.lazy(() => import("../pages/about"));

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const currentRole = useSelector((state) => {
    if (state.RoomList.currentRoom) return state.RoomList.currentRoom.role;
    else return null;
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isUserAuthenticated()) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/account/login",
                state: { from: props.location },
              }}
            />
          );
        }
        if (currentRole != null && roles)
          if (!roles.includes(currentRole))
            return (
              <Redirect
                to={{
                  pathname: "/More/About",
                  state: { from: props.location },
                }}
              />
            );
        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};

// root routes
const rootRoute = {
  path: "/",
  exact: true,
  component: () => <Redirect to="/Status" />,
  route: PrivateRoute,
};

//status
const statusRoutes = {
  path: "/Status",
  name: "Giám sát",
  icon: FeatherIcon.Activity,
  component: Status,
  roles: ["Owner", "Manager", "Viewer"],
  route: PrivateRoute,
};
// dashboards
const reportRoutes = {
  path: "/Report",
  name: "Báo cáo",
  icon: FeatherIcon.Clipboard,
  component: Report,
  roles: ["Owner", "Manager"],
  route: PrivateRoute,
};

//Config
const configSensorMap = {
  path: "/Config/Sensor",
  header: "Quản lý kho lạnh",
  name: "Cảm biến",
  icon: FeatherIcon.Cpu,
  component: SensorMap,
  roles: ["Owner", "Manager"],
  route: PrivateRoute,
};
const configArea = {
  path: "/Config/Area",
  name: "Khu vực",
  icon: FeatherIcon.Codepen,
  component: AreaConfig,
  roles: ["Owner", "Manager"],
  route: PrivateRoute,
};
const configManager = {
  path: "/Config/Manager",
  name: "Người truy cập",
  icon: FeatherIcon.Users,
  component: Management,
  roles: ["Owner", "Manager"],
  route: PrivateRoute,
};
const configWarehouse = {
  path: "/Config/Info",
  name: "Thông tin kho",
  icon: FeatherIcon.AlertCircle,
  component: WareHouseConfig,
  roles: ["Owner", "Manager"],
  route: PrivateRoute,
};
const configApi = {
  path: "/Config/Api",
  name: "Tài khoản Api",
  icon: FeatherIcon.Rss,
  component: ApiService,
  roles: ["Owner"],
  route: PrivateRoute,
};

const configRoutes = [
  configSensorMap,
  configArea,
  configManager,
  configWarehouse,
  configApi,
];

//More
const storeRoutes = {
  path: "/More/Store",
  name: "Cửa hàng",
  header: "Tiện ích",
  icon: FeatherIcon.ShoppingBag,
  component: Store,
  route: PrivateRoute,
  roles: ["User", "Owner", "Manager", "Viewer"],
};
const helpRoutes = {
  path: "/More/Help",
  name: "Trợ giúp",
  icon: FeatherIcon.HelpCircle,
  component: Help,
  route: PrivateRoute,
  roles: ["User", "Owner", "Manager", "Viewer"],
};
const aboutRoutes = {
  path: "/More/About",
  name: "Về chúng tôi",
  icon: FeatherIcon.GitHub,
  component: About,
  route: PrivateRoute,
  roles: ["User", "Owner", "Manager", "Viewer"],
};
const moreRoute = [storeRoutes, helpRoutes, aboutRoutes];
// auth
const authRoutes = {
  path: "/account",
  name: "Auth",
  children: [
    {
      path: "/account/login",
      name: "Login",
      component: Login,
      route: Route,
    },
    {
      path: "/account/logout",
      name: "Logout",
      component: Logout,
      route: Route,
    },
    {
      path: "/account/register",
      name: "Register",
      component: Register,
      route: Route,
    },
    {
      path: "/account/confirm",
      name: "Confirm",
      component: Confirm,
      route: Route,
    },
    {
      path: "/account/forget-password",
      name: "Forget Password",
      component: ForgetPassword,
      route: Route,
    },
  ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [
  rootRoute,
  statusRoutes,
  reportRoutes,
  ...configRoutes,
  ...moreRoute,
  authRoutes,
];

const authProtectedRoutes = [
  statusRoutes,
  reportRoutes,
  ...configRoutes,
  ...moreRoute,
];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
