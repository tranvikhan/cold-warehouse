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
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { User, Lock } from 'react-feather';

import { loginUser } from 'redux/actions';
import { isUserAuthenticated } from 'helpers/authUtils';
import Loader from 'components/Loader';
import logo from 'assets/images/logo.png';
import {useSelector}  from 'react-redux';

class Login extends Component {
    _isMounted = false;
   

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            username: 'vikhan',
            password: '123456',
        };
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
        this.props.loginUser(values.username, values.password, this.props.history);
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

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages my-5">
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

                                                    <h6 className="h5 mb-0 mt-2">Ch??o m???ng b???n!</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Vui l??ng ????ng nh???p ????? qu???n l?? v?? gi??m s??t nhi???t ????? kho l???nh c???a b???n
                                                    </p>

                                                    {this.props.errorLogin && (
                                                        <Alert color="danger" isOpen={this.props.errorLogin ? true : false}>
                                                            <div>{this.props.errorLogin}</div>
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
                                                                    value={this.state.username}
                                                                    placeholder="nh???p t??n ????ng nh???p"
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>T??n ????ng nh???p kh??ng h???p l???</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">M???t kh???u</Label>
                                                            <Link
                                                                to="/account/forget-password"
                                                                className="float-right text-muted text-unline-dashed ml-1">
                                                                Qu??n m???t kh???u?
                                                            </Link>
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
                                                                    value={this.state.password}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>M???t khu???u kh??ng h???p l???</AvFeedback>
                                                        </AvGroup>

                                                        <FormGroup className="form-group mb-0 text-center">
                                                            <Button color="primary" className="btn-block">
                                                                ????ng nh???p
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

                            <Row className="mt-3">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        B???n kh??ng c?? t??i kho???n?{' '}
                                        <Link to="/account/register" className="text-primary font-weight-bold ml-1">
                                            ????ng k??
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
    const { user, loading, errorLogin } = state.Auth;
    return { user, loading, errorLogin };
};

export default connect(mapStateToProps, { loginUser })(Login);
