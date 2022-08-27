import React from 'react';
import { Step, Steps, Wizard } from 'react-albus';

import { CardBody, Col, Progress, Card, Button, Row, CustomInput } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
export default function NewWareHouse() {
    return (
        <Card className="shadow-none">
            <CardBody>
                <Wizard
                    render={({ step, steps }) => (
                        <React.Fragment>
                            <Progress
                                animated
                                striped
                                color="success"
                                value={((steps.indexOf(step) + 1) / steps.length) * 100}
                                className="mb-3 progress-sm"
                            />

                            <Steps>
                                <Step
                                    id="info"
                                    render={({ next }) => (
                                        <AvForm
                                            onValidSubmit={(event, values) => {
                                                next();
                                            }}>
                                            <AvField
                                                name="name"
                                                label="Tên kho lạnh"
                                                type="text"
                                                validate={{
                                                    required: {
                                                        value: true,
                                                        errorMessage: 'Vui lòng điền tên kho lạnh',
                                                    },
                                                }}
                                            />
                                            <AvField name="description" label="Mô tả" type="text" />

                                            <ul className="list-inline wizard mb-0">
                                                <li className="next list-inline-item float-right">
                                                    <Button color="success" type="submit">
                                                        Tiếp
                                                    </Button>
                                                </li>
                                            </ul>
                                        </AvForm>
                                    )}
                                />
                                <Step
                                    id="size"
                                    render={({ next, previous }) => (
                                        <AvForm
                                            onValidSubmit={(event, values) => {
                                                next();
                                            }}>
                                            <AvField name="x" label="Dài (X)" type="number" min={0} required />
                                            <AvField name="y" label="Rộng (Y)" type="number" min={0} required />
                                            <AvField name="z" label="Cao (Z)" type="number" min={0} required />
                                            <AvField name="z" label="Khoảng cách" type="number" min={0} required />
                                            <p className="text-danger">Đơn vị cm</p>

                                            <ul className="list-inline wizard mb-0">
                                                <li className="previous list-inline-item">
                                                    <Button onClick={previous} color="info">
                                                        Trở lại
                                                    </Button>
                                                </li>
                                                <li className="next list-inline-item float-right">
                                                    <Button color="success" type="submit">
                                                        Tiếp
                                                    </Button>
                                                </li>
                                            </ul>
                                        </AvForm>
                                    )}
                                />
                                <Step
                                    id="door"
                                    render={({ previous }) => (
                                        <Row>
                                            <Col sm={12}>
                                                <div className="text-center">
                                                    <h2 className="mt-0">
                                                        <i className="mdi mdi-check-all"></i>
                                                    </h2>
                                                    <h5 className="mt-0">Chọn vị trí của cửa</h5>
                                                    asdhn
                                                    <div className="mb-3">
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox2"
                                                            label="I agree with the Terms and Conditions"
                                                        />
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={12}>
                                                <ul className="list-inline wizard mb-0">
                                                    <li className="previous list-inline-item">
                                                        <Button onClick={previous} color="info">
                                                            Trở lại
                                                        </Button>
                                                    </li>

                                                    <li className="next list-inline-item float-right">
                                                        <Button color="success">Lưu</Button>
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    )}
                                />
                            </Steps>
                        </React.Fragment>
                    )}
                />
            </CardBody>
        </Card>
    );
}
