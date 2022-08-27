// @flow
import React from 'react';
import { Row, Col } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import StatisticsWidget from '../../components/StatisticsWidget';

const Statistics = () => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Today Sensor"
                        title="1"
                        icon={FeatherIcon.Cpu}
                        iconClass="icon-dual-primary"></StatisticsWidget>
                </Col>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Manager"
                        title="4"
                        icon={FeatherIcon.Users}
                        iconClass="icon-dual-warning"></StatisticsWidget>
                </Col>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Total Cels"
                        title="1000"
                        icon={FeatherIcon.Grid}
                        iconClass="icon-dual-success"></StatisticsWidget>
                </Col>
                <Col md={6} xl={3}>
                    <StatisticsWidget
                        description="Warning Temperature"
                        title="7"
                        icon={FeatherIcon.Bell}
                        iconClass="icon-dual-info"></StatisticsWidget>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Statistics;
