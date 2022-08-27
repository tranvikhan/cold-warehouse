import React, { useState } from 'react';

import Select from 'react-select';
import { Card, CardBody, Col, Nav, NavItem, Row, NavLink, TabContent, TabPane, Modal, ModalHeader } from 'reactstrap';
import Management from './Management';
import classnames from 'classnames';
import SensorMap from './sensorMap';
import NewWareHouse from './newWareHouse';

export default function Config() {
    const [activeTab, setActiveTab] = useState('4');
    const [modalNew, toggleModalNew] = useState({ show: false });
    const tabContents = [
        {
            id: '1',
            title: 'Sensor Map',
            disabled: false,
        },
        {
            id: '2',
            title: 'Struct',
            disabled: false,
        },
        {
            id: '3',
            title: 'Notification',
            disabled: false,
        },
        {
            id: '4',
            title: 'Manager',
            disabled: false,
        },
    ];
    const toggleModal = () => {
        toggleModalNew({ show: !modalNew.show });
    };

    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
                <Col sm={4} xl={6}>
                    <h4 className="mb-1 mt-0">Config WareHouse</h4>
                </Col>
                <Col sm={6} xl={4}>
                    <Select
                        className="react-select bg-white mb-1"
                        classNamePrefix="react-select"
                        defaultValue={{ value: 'WH0001', label: 'Ware House 1' }}
                        options={[
                            { value: 'WH0001', label: 'Ware House 1' },
                            { value: 'WH0002', label: 'Ware House 2' },
                            { value: 'WH0003', label: 'Ware House 3' },
                        ]}></Select>
                </Col>
                <Col sm={2} xl={2}>
                    <button type="button" className="btn btn-success mt-2 mt-sm-0 w-100 mb-1" onClick={toggleModal}>
                        <i className="uil-plus mr-1"></i> Kho mới
                    </button>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                            <Nav className="nav nav-pills navtab-bg nav-justified">
                                {tabContents.map((tab, index) => {
                                    return (
                                        <NavItem key={index}>
                                            <NavLink
                                                href="#"
                                                disabled={tab.disabled}
                                                className={classnames({ active: activeTab === tab.id })}
                                                onClick={() => {
                                                    if (activeTab !== tab.id) {
                                                        setActiveTab(tab.id);
                                                    }
                                                }}>
                                                <i className={classnames(tab.icon, 'd-sm-none', 'd-block', 'mr-1')}></i>
                                                {tab.title}
                                            </NavLink>
                                        </NavItem>
                                    );
                                })}
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <SensorMap />
                                </TabPane>
                                <TabPane tabId="2">Struct</TabPane>
                                <TabPane tabId="3">Notification</TabPane>
                                <TabPane tabId="4">
                                    <Management />
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modalNew.show} toggle={toggleModal}>
                <ModalHeader>New WareHouse</ModalHeader>
                <NewWareHouse></NewWareHouse>
            </Modal>
        </React.Fragment>
    );
}
