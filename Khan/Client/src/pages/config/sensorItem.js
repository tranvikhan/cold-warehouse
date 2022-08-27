import React from 'react';
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Media } from 'reactstrap';
import imageCpu from '../../assets/icons/Devices/CPU1.svg';
import classNames from 'classnames';
const SensorItem = (props) => {
    const colorStatus = () => {
        switch (props.status) {
            case 'RUNNING':
                return 'badge badge-soft-success';
            case 'SLEPPING':
                return 'badge badge-soft-danger';
            default:
                return 'badge badge-soft-warning';
        }
    };
    return (
        <Media className="mt-1 border-top pt-2">
            <img src={imageCpu} className="avatar rounded mr-3" alt="" />

            <Media left>
                <h6 className="mt-1 mb-0 font-size-15">{props.name}</h6>
                <h6 className="text-muted font-weight-normal mt-1">{props.id}</h6>
            </Media>
            <Media body></Media>
            <span className={classNames(colorStatus(), 'py-1 px-1 align-self-center mr-2')}>{props.status}</span>
            <UncontrolledDropdown className="align-self-center float-right">
                <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle text-muted">
                    <i className="uil uil-ellipsis-v"></i>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <i className="uil uil-exclamation-circle mr-2"></i>Info
                    </DropdownItem>
                    <DropdownItem>
                        <i className="uil uil-edit-alt mr-2"></i>Edit
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="text-danger">
                        <i className="uil uil-trash mr-2"></i>Delete
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Media>
    );
};
export default SensorItem;
