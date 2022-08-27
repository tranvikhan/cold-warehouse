import React from 'react';
import { Step, Steps, Wizard } from 'react-albus';

import { CardBody, Col, Progress, Card, Button, Row, CustomInput,Modal,ModalHeader,ModalBody, Label, Alert } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';
import AvRadio from 'availity-reactstrap-validation/lib/AvRadio';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import dinhhuong from 'assets/images/dinhhuong.svg'
import Loader from 'components/Loader';


export default function NewWareHouse(props) {
    const [name,setName] = React.useState('Kho lạnh ..');
    const [description,setDescription] = React.useState('');
    const [size,setSize] = React.useState({x:500,y:200,z:200});
    const [sensorDensity,setSensorDensity] = React.useState(10);
    const [door,setDoor] = React.useState({show:false,direction: "B"});
    
    
    return(
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            {props.loading && <Loader />}
            <ModalHeader>Kho lạnh mới</ModalHeader>
            <ModalBody>
            <Card className="shadow-none">
            <CardBody>
            {props.error && (
                <Alert color="danger" isOpen={props.error ? true : false}>
                    <div>{props.error}</div>
                </Alert>
            )}
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
                                            //Chạy hàm kiễm tra tên
                                            setName(values.name);
                                            setDescription(values.description);
                                            next();
                                        }}>
                                        <AvField
                                            name="name"
                                            value={name}
                                            label="Tên kho lạnh"
                                            type="text"
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: 'Vui lòng điền tên kho lạnh',
                                                },
                                            }}
                                        />
                                        <AvField name="description" label="Mô tả" type="text" value={description} />

                                        <ul className="list-inline wizard mb-0">
                                            <li className="next list-inline-item float-right">
                                                <Button color="success" type="submit">
                                                    Tiếp theo
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
                                            if(values.sensorDensity <= Math.min(values.x,values.y,values.z)){
                                                setSize({
                                                    x:values.x,
                                                    y:values.y,
                                                    z:values.z
                                                })
                                                setSensorDensity(values.sensorDensity);
                                                next();
                                            }
                                            
                                        }}>
                                        <AvField name="x" label="Chiều dài (hướng X)" type="number" min={10} step={10} required value={size.x}/>
                                        <AvField name="y" label="Chiều rộng (hướng Y)" type="number" min={10} step={10} required value={size.y} />
                                        <AvField name="z" label="Chiều cao (hướng Z)" type="number" min={10} step={10} required value={size.z} />
                                        <AvField name="sensorDensity" label="Khoảng cách cảm biến" type="number" min={10} step={10} value={sensorDensity} required />
                                        <p className="text-warning">Đơn vị đo: cm</p>
                                        <ul className="list-inline wizard mb-0">
                                            <li className="previous list-inline-item">
                                                <Button onClick={previous} color="secondary">     
                                                    Trở lại
                                                </Button>
                                            </li>
                                            <li className="next list-inline-item float-right">
                                                <Button color="success" type="submit">
                                                    Tiếp theo 
                                                </Button>
                                            </li>
                                        </ul>
                                    </AvForm>
                                )}
                            />
                            <Step
                                id="door"
                                render={({ previous }) => (
                                    
                                    <AvForm
                                    onValidSubmit={(event, values) => {
                                        props.submit({
                                            name,
                                            description,
                                            size,
                                            sensorDensity,
                                            door:{
                                                direction: values.direction,
                                                show: door.show
                                            }

                                        });         
                                    }}>
                                    <AvGroup>
                                        <Label for="direction">Chọn vị trí cửa:</Label>
                                        <Row>
                                            <Col sm={4}>
                                                <AvRadioGroup 
                                                    name="direction" 
                                                    value={door.direction} 
                                                    required 
                                                >
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng A" value="A" />
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng B" value="B" />
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng C" value="C" />
                                                <AvRadio className='mt-3 mb-3' customInput label="Hướng D" value="D" />
                                                </AvRadioGroup>
                                            </Col>
                                            <Col sm={8}>
                                               <img src={dinhhuong} className='w-100' />
                                            </Col>
                                        </Row>
                                    </AvGroup>
                                    <AvGroup>
                                        <Label for="show_btn">Hiển thị cửa</Label>
                                        <CustomInput
                                        type="switch"
                                        id="show_btn"
                                        name="show_door"
                                        checked={door.show}
                                        onChange={()=>{
                                            setDoor({
                                                direction: door.direction,
                                                show: !door.show
                                            })
                                        }}
                                        />                                           
                                        
                                    </AvGroup>
                                    <ul className="list-inline wizard mt-2 mb-0">
                                        <li className="previous list-inline-item">
                                            <Button onClick={previous} color="secondary">
                                                
                                                Trở lại  
                                            </Button>
                                        </li>
                                        <li className="next list-inline-item float-right">
                                            <Button color="success" type="submit">
                                                Hoàn tất
                                            </Button>
                                        </li>
                                    </ul>
                                </AvForm>
                                )}
                            />
                        </Steps>
                    </React.Fragment>
                )}
            />
            </CardBody>
            </Card>
            </ModalBody>
        </Modal>
    );
}
