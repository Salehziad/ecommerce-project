import React, {useState, useRef} from "react";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const Signin = () => {
    const form = useRef();
    const [values,
        setValues] = useState({email: "", password: "", error: "", loading: false, redirectToReferrer: false});

    const {email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true
        });
        signin({email, password}).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false
                });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }

        });
    };

    const signUpForm = () => (
        <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"/>

            <Form onSubmit={handleSubmit} ref={form}>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <Input
                        type="email"
                        className="form-control"
                        onChange={handleChange('email')}
                        value={email}
                        validations={[required]}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-control"
                        autoComplete="on"
                        onChange={handleChange('password')}
                        value={password}
                        validations={[required]}/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                    </button>
                    <p>Don't have account?&nbsp;<Link to='/signup'>Signup</Link>
                    </p>
                </div>
            </Form>
        </div>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{
            display: error
                ? ""
                : "none"
        }}>
            {error}
        </div>
    );

    const showLoading = () => loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>;
            } else {
                return <Redirect to="/user/dashboard"/>;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/"/>;
        }
    };

    return (
        <div>
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </div>
    );
};

export default Signin;
