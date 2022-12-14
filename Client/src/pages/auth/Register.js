import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Label,
    FormGroup,
    Button,
    Alert,
    InputGroup,
    InputGroupAddon,
    CustomInput,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback,AvCheckboxGroup } from 'availity-reactstrap-validation';
import { Mail, Lock, User } from 'react-feather';

import { registerUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';

class Register extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        console.log(values);
        this.props.registerUser(values.username, values.email, values.password);
        
        
    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to="/" />;
        }
    };

    /**
     * Redirect to confirm
     */
    renderRedirectToConfirm = () => {
        return <Redirect to="/account/confirm" />;
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {Object.keys(this.props.user || {}).length > 0 && this.renderRedirectToConfirm()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages mt-5 mb-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10}>
                                    <Card className="">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col md={6} className="p-5 position-relative">
                                                    {/* preloader */}
                                                    {this.props.loading && <Loader />}

                                                    <div className="mx-auto mb-5">
                                                        <a href="/">
                                                            
                                                            <img src={logo} alt="" height="50" />
                                                            <h4 className="align-middle mt-2 text-logo">
                                                                QU???N L?? NHI???T ????? KHO L???NH
                                                            </h4>
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-2">????ng k??</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        B???t ?????u ????ng k?? m???t t??i kho???n m???i ????? s??? d???ng d???ch v??? c???a ch??ng t??i
                                                    </p>

                                                    {this.props.errorRegister && (
                                                        <Alert color="danger" isOpen={this.props.errorRegister ? true : false}>
                                                            <div>{this.props.errorRegister}</div>
                                                        </Alert>
                                                    )}

                                                    <AvForm
                                                        onValidSubmit={this.handleValidSubmit}
                                                        className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="username">T??n ????ng nh???p</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <User className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    placeholder="nh???p t??n ????ng nh???p"
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>Th??ng tin sai</AvFeedback>
                                                        </AvGroup>
                                                        <AvGroup className="">
                                                            <Label for="email">Email</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Mail className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    placeholder="nh???p email"
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>Email sai</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">Password</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="password"
                                                                    id="password"
                                                                    placeholder="nh???p m???t kh???u"
                                                                    required
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>M???t kh???u kh??ng h???p l???</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup check className="mb-4">
                                                            <CustomInput
                                                                type="checkbox"
                                                                id="termsX"
                                                                name ='termsX'
                                                                className="pl-1"
                                                                defaultChecked
                                                                label="T??i ?????ng ?? s??? d???ng d???ch v???"
                                                            />
                                                            <AvFeedback>M???t kh???u kh??ng h???p l???</AvFeedback>
                                                        </AvGroup>

                                                        <FormGroup className="form-group mb-0 text-center">
                                                            <Button color="primary" className="btn-block">
                                                                ????ng k??
                                                            </Button>
                                                        </FormGroup>
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial">
                                                            <p className="font-size-24 font-weight-bold text-white mb-1">
                                                                Xin Ch??o!
                                                            </p>
                                                            <p className="lead">
                                                                "C???m ??n b???n ???? s??? d???ng h??? th???ng c???a ch??ng t??i !"
                                                            </p>
                                                            <p>- Admin</p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                       B???n ???? c?? t??i kho???n ?{' '}
                                        <Link to="/account/login" className="text-primary font-weight-bold ml-1">
                                            ????ng nh???p
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, errorRegister } = state.Auth;
    return { user, loading, errorRegister };
};

export default connect(mapStateToProps, { registerUser })(Register);
