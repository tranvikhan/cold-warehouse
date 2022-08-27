import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import TabsChart from './TabsChart';

function Status(props) {
    return (
        <React.Fragment>
            <Row className="page-title align-items-center">
            <Col xs={12}>
                    <h4 className="mb-1 mt-0">Giám sát kho lạnh</h4>
            </ Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Card className="mb-5">
                        <CardBody>
                            <TabsChart />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Status;
