import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { isMobileOnly } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import * as FeatherIcon from 'react-feather';

import AppMenu from './AppMenu';

/**
 * User Widget
 */
const UserProfile = (props) => {
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
                    <h6 className="pro-user-name mt-0 mb-0">{props.user.user.fullname}</h6>
                    <span className="pro-user-desc">{props.user.user.username}</span>
                </div>

                <UncontrolledDropdown className="align-self-center profile-dropdown-menu">
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="button"
                        className="btn btn-link p-0 dropdown-toggle mr-0">
                        <FeatherIcon.ChevronDown />
                    </DropdownToggle>
                    <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                        <Link to="/account/info" className="dropdown-item notify-item">
                            <FeatherIcon.User className="icon-dual icon-xs mr-2" />
                            <span>My Account</span>
                        </Link>
                        <Link to="/account/lock" className="dropdown-item notify-item">
                            <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
                            <span>Lock Screen</span>
                        </Link>
                        <DropdownItem divider />
                        <Link to="/account/logout" className="dropdown-item notify-item">
                            <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
                            <span>Logout</span>
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
        document.addEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Bind event
     */
    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Handle the click anywhere in doc
     */
    handleOtherClick = (e) => {
        if (this.menuNodeRef.contains(e.target)) return;
        // else hide the menubar
        if (document.body && isMobileOnly) {
            document.body.classList.remove('sidebar-enable');
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
                <div className="left-side-menu" ref={(node) => (this.menuNodeRef = node)}>
                    <UserProfile user={this.props.user} />
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
    return { user, loading, error };
};
export default connect(mapStateToProps, {})(LeftSidebar);
