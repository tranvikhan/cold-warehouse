import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated } from '../helpers/authUtils';

// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// status
const Status = React.lazy(() => import('../pages/status'));
// dashboard
const Report = React.lazy(() => import('../pages/report'));
// config
const Config = React.lazy(() => import('../pages/config'));
//more pages
const Store = React.lazy(() => import('../pages/store'));
const Help = React.lazy(() => import('../pages/help'));
const About = React.lazy(() => import('../pages/about'));
// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }
            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/Status" />,
    route: PrivateRoute,
};

//status
const statusRoutes = {
    path: '/Status',
    name: 'Status',
    icon: FeatherIcon.Activity,
    badge: {
        variant: 'success',
        text: '1',
    },
    component: Status,
    roles: ['Admin'],
    route: PrivateRoute,
};
// dashboards
const reportRoutes = {
    path: '/Report',
    name: 'Report',
    icon: FeatherIcon.Clipboard,
    component: Report,
    roles: ['Admin'],
    route: PrivateRoute,
};

//Config

const configRoutes = {
    path: '/Config',
    name: 'Warehouse',
    header: 'Config',
    icon: FeatherIcon.Box,
    component: Config,
    roles: ['Admin'],
    route: PrivateRoute,
};

//More
const storeRoutes = {
    path: '/More/Store',
    name: 'Store',
    header: 'More',
    icon: FeatherIcon.ShoppingBag,
    component: Store,
    route: PrivateRoute,
    roles: ['Admin'],
};
const helpRoutes = {
    path: '/More/Help',
    name: 'Help',
    icon: FeatherIcon.HelpCircle,
    component: Help,
    route: PrivateRoute,
    roles: ['Admin'],
};
const aboutRoutes = {
    path: '/More/About',
    name: 'About',
    icon: FeatherIcon.GitHub,
    component: About,
    route: PrivateRoute,
    roles: ['Admin'],
};
const moreRoute = [storeRoutes, helpRoutes, aboutRoutes];
// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
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

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [rootRoute, statusRoutes, reportRoutes, configRoutes, ...moreRoute, authRoutes];

const authProtectedRoutes = [statusRoutes, reportRoutes, configRoutes, ...moreRoute];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
