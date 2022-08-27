import React, { Component } from 'react';
import { Row, Col, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { ChevronDown, Mail, Printer, File } from 'react-feather';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';

import Select from 'react-select';

class Report extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={2} xl={1}>
                            <h4 className="mb-1 mt-0 inline">Report</h4>
                        </Col>
                        <Col sm={4} xl={2}>
                            <Select
                                className="react-select bg-white"
                                classNamePrefix="react-select"
                                options={[
                                    { value: 'WH0001', label: 'Ware House 1' },
                                    { value: 'WH0002', label: 'Ware House 2' },
                                    { value: 'WH0003', label: 'Ware House 3' },
                                ]}></Select>
                        </Col>

                        <Col sm={6} xl={9}>
                            <form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        value={this.state.filterDate}
                                        onChange={(date) => {
                                            this.setState({ filterDate: date });
                                        }}
                                        options={{ mode: 'range' }}
                                        className="form-control"
                                    />
                                </div>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="primary" className="dropdown-toggle">
                                        <i className="uil uil-file-alt mr-1"></i>Download
                                        <i className="icon ml-1">
                                            <ChevronDown />
                                        </i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Mail className="icon-dual icon-xs mr-2"></Mail>
                                            <span>Email</span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Printer className="icon-dual icon-xs mr-2"></Printer>
                                            <span>Print</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <File className="icon-dual icon-xs mr-2"></File>
                                            <span>Re-Generate</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </form>
                        </Col>
                    </Row>

                    {/* stats */}
                    <Statistics></Statistics>

                    {/* charts */}
                    <Row>
                        <Col xl={12}>
                            <RevenueChart />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default Report;
