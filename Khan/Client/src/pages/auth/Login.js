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
                                                                QUẢN LÝ NHIỆT ĐỘ KHO LẠNH
                                                            </h4>
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-2">Chào mừng bạn!</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Vui lòng đăng nhập để quản lý và giám sát nhiệt độ kho lạnh của bạn
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
                                                            <Label for="username">Tên đăng nhập</Label>
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
                                                                    placeholder="nhập tên đăng nhập"
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>Tên đăng nhập không hợp lệ</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">Mật khẩu</Label>
                                                            <Link
                                                                to="/account/forget-password"
                                                                className="float-right text-muted text-unline-dashed ml-1">
                                                                Quên mật khẩu?
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
                                                                    placeholder="nhập mật khẩu"
                                                                    value={this.state.password}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>Mật khuẩu không hợp lệ</AvFeedback>
                                                        </AvGroup>

                                                        <FormGroup className="form-group mb-0 text-center">
                                                            <Button color="primary" className="btn-block">
                                                                Đăng nhập
                                                            </Button>
                                                        </FormGroup>
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial">
                                                            <p className="font-size-24 font-weight-bold text-white mb-1">
                                                                Xin Chào!
                                                            </p>
                                                            <p className="lead">
                                                                "Cảm ơn bạn đã sử dụng hệ thống của chúng tôi !"
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
                                        Bạn không có tài khoản?{' '}
                                        <Link to="/account/register" className="text-primary font-weight-bold ml-1">
                                            Đăng kí
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
