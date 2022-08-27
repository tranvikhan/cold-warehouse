import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, Card, CardBody, FormGroup, Button, Alert, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail,User } from 'react-feather';

import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import { forgetPassword } from 'redux/actions';

class ForgetPassword extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
           email:'',
           username:''
        }
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
     * On errorFogot dismiss
     */
    onDismiss() {
        this.props.forgetPasswordFailed('loi',this.props.history);
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.forgetPassword(values.email,values.username, this.props.history);
    }


    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }   

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages my-5">
                    <Container>
                    <Row className="justify-content-center">
                            <Col xl={10}>
                                <Card className="">
                                    <CardBody className="p-0">
                                        <Row>
                                            <Col md={6} className="p-5 position-relative">
                                                { /* preloader */}
                                                {this.props.loading && <Loader />}
                                                <div className="mx-auto mb-5">
                                                        <a href="/">
                                                            
                                                            <img src={logo} alt="" height="50" />
                                                            <h4 className="align-middle mt-2 text-logo">
                                                                QUẢN LÝ NHIỆT ĐỘ KHO LẠNH
                                                            </h4>
                                                        </a>
                                                    </div>

                                                <h6 className="h5 mb-0 mt-4">Khôi phục mật khẩu</h6>
                                                <p className="text-muted mt-1 mb-4">
                                                    Vui lòng nhập đúng email và username của bạn, chúng tôi sẽ gửi cho bạn mật khẩu mới
                                                </p>


                                                {this.props.errorFogot && <Alert color="danger" isOpen={this.props.errorFogot ? true : false}>
                                                    <div>{this.props.errorFogot}</div>
                                                </Alert>}
                                                {this.props.passwordResetStatus && <Alert color="success" isOpen={this.props.passwordResetStatus ? true : false}>
                                                    <div>{this.props.passwordResetStatus}</div>
                                                </Alert>}

                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                    <AvGroup className="">
                                                        <Label for="email">Email</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="text" name="email" id="email" placeholder="nhập email" 
                                                                value={this.state.email} required />
                                                        </InputGroup>
                                                        
                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>
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

                                                    <FormGroup className="form-group mb-0 text-center">
                                                        <Button color="primary" className="btn-block">Lấy mật khẩu</Button>
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

                        <Row className="mt-1">
                            <Col className="col-12 text-center">
                                <p className="texttext-muted">Trở về trang <Link to="/account/login" className="text-primary font-weight-bold ml-1">Đăng nhập</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    
    const { passwordResetStatus, loading, errorFogot } = state.Auth;
    return { passwordResetStatus, loading, errorFogot };
};

export default connect(mapStateToProps, { forgetPassword })(ForgetPassword);