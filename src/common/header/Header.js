import React, {Fragment, useEffect, useState} from "react";
import logo from '../../assets/logo.svg';
import {Button, Tabs, Tab, Typography, Grid, InputLabel, Input, FormHelperText} from "@material-ui/core";
import Modal from 'react-modal';
import './Header.css';
import FormControl from "@material-ui/core/FormControl";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div {...other}>
            {value === index && <Typography component={'div'}>{children}</Typography>}
        </div>
    );
}

function Error() {
    return (
        <FormHelperText style={{color: "red"}}>required</FormHelperText>
    );
}


const Header = function (props) {

    const [addUserForm, setAddUserForm] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        email_address: '',
        password: '',
        mobile_number: '',
        errors: {
            first_name: '',
            last_name: '',
            email_address: '',
            password: '',
            mobile_number: '',
        }
    });
    const [loginForm, setLoginForm] = useState({
        id: 0,
        username: '1@gmail.com',
        password: '',
        errors: {
            username: '',
            password: ''
        }
    });
    const [addUserFormMessage, setAddUserFormMessage] = useState("");
    const [loginFormMessage, setLoginFormMessage] = useState("");
    const [userInformation, setUserInformation] = useState({});
    // const [token, setToken] = useState("eyJraWQiOiJkN2NmNzQxYS1mMjViLTQ0YjItOTI3ZS1jYTE3ZWY3NWM2YzQiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdWQiOiI2ODE4MmEzMi0yYWQ1LTRhNGUtOWMxOC1jMmVjNDQ4NGRkZDgiLCJpc3MiOiJodHRwczovL21vdmllYXBwLmNvbSIsImV4cCI6MTYzNDYxMSwiaWF0IjoxNjM0NTgyfQ.eZLe8MhYT3Dk2SnNc-yItVKvxIavfLRp2k9FlS9z0XSwtLfPd4OtWINgmGFgCQfEAlaqODoXXCPl1JcOZxb1LA");
    const [token, setToken] = useState("");

    async function addUserHandler(newUser) {

        const rawResponse = await fetch("http://localhost:8085/api/v1/signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }
        );

        const data = await rawResponse.json();

        if (data.status === "ACTIVE") {
            setAddUserFormMessage("Registration Successful. Please Login!");
        } else {
            setAddUserFormMessage(data.message);
        }
    }

    async function loginHandler(user) {

        const authentication = btoa(`${user.username}:${user.password}`);

        const rawResponse = await fetch("http://localhost:8085/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Basic ${authentication}`
                }
            }
        );

        const data = await rawResponse.json();
        const headers = await rawResponse.headers;

        if (data.status === "ACTIVE") {
            setToken(headers.get('access-token'));
            setUserInformation(data);
            setModalShow(false)
        } else {
            setLoginFormMessage(data.message);
        }
    }

    async function logoutHandler(token) {
        await fetch("http://localhost:8085/api/v1/auth/logout",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }
            }
        );

        setToken("");
        setUserInformation("");
        setModalShow(false)
        setLoginFormMessage("");
    }

    function BeforeLoginButtons() {
        return (
            <Fragment>
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    className="custom-button"*/}
                {/*    color="primary"*/}
                {/*    onClick={() => setModalShow(true)}>Book*/}
                {/*    Show</Button>*/}
                <Button
                    variant="contained"
                    className="custom-button"
                    onClick={() => setModalShow(true)}>Login</Button>
            </Fragment>
        );
    }

    function AfterLoginButtons() {
        return (
            <Fragment>
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    className="custom-button"*/}
                {/*    color="primary">Book*/}
                {/*    Show</Button>*/}


                <Button
                    variant="contained"
                    className="custom-button"
                    onClick={() => logoutHandler(token)}>Logout</Button>
            </Fragment>
        );
    }

    function checkEmptyValue(value) {
        return (value.length === 0)
            ? 'required'
            : '';
    }

    const inputLoginChangedHandler = (e) => {
        const state = loginForm;
        const {name, value} = e.target;
        let errors = state.errors;

        switch (name) {
            case 'username':
                errors.username = checkEmptyValue(value);
                break;
            case 'password':
                errors.password = checkEmptyValue(value);
                break;
            default:
                break;
        }

        state[e.target.name] = e.target.value;
        setLoginForm({...state});
    }

    const onLoginFormSubmitted = (e) => {
        e.preventDefault();
        const state = loginForm;
        let errors = state.errors;
        // On submit validation
        if (state.username.length === 0) {
            errors.username = "required";
        }
        if (state.password.length === 0) {
            errors.password = "required";
        }

        // set state if errors found
        if (state.errors.username.length > 0 ||
            state.errors.password.length > 0) {
            setLoginForm({...state});
        } else {
            loginHandler(loginForm);
        }
    }

    const inputChangedHandler = (e) => {
        const state = addUserForm;
        const {name, value} = e.target;
        let errors = state.errors;

        switch (name) {
            case 'first_name':
                errors.first_name = checkEmptyValue(value);
                break;
            case 'last_name':
                errors.last_name = checkEmptyValue(value);
                break;
            case 'mobile_number':
                errors.mobile_number = checkEmptyValue(value);
                break;
            case 'email_address':
                errors.email_address = checkEmptyValue(value);
                break;
            case 'password':
                errors.password = checkEmptyValue(value);
                break;
            default:
                break;
        }

        state[e.target.name] = e.target.value;
        setAddUserForm({...state});
    }

    const onRegisterFormSubmitted = (e) => {
        e.preventDefault();
        const state = addUserForm;
        let errors = state.errors;
        // On submit validation
        if (state.first_name.length === 0) {
            errors.first_name = "required";
        }
        if (state.last_name.length === 0) {
            errors.last_name = "required";
        }
        if (state.email_address.length === 0) {
            errors.email_address = "required";
        }
        if (state.password.length === 0) {
            errors.password = "required";
        }
        if (state.mobile_number.length === 0) {
            errors.mobile_number = "required";
        }

        // set state if errors found
        if (state.errors.first_name.length > 0 ||
            state.errors.last_name.length > 0 ||
            state.errors.email_address.length > 0 ||
            state.errors.password.length > 0 ||
            state.errors.mobile_number.length > 0) {
            setAddUserForm({...state});
        } else {
            addUserHandler(addUserForm);
        }
    }

    const {first_name, last_name, email_address, password, mobile_number} = addUserForm;

    const {username, loginPassword} = loginForm;

    const [modalShow, setModalShow] = useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log(token)
        console.log("props: ", props.baseUrl);
    }, [userInformation]);

    return (
        <Fragment>
            <div className="header">
                <img src={logo} alt="movie app logo" className="appLogo"/>
                <div>
                    {token.length === 0 ? <BeforeLoginButtons/> : <AfterLoginButtons/>}
                </div>
            </div>
            <Modal
                isOpen={modalShow}
                shouldCloseOnOverlayClick={false}
                onRequestClose={() => setModalShow(false)}
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        width: '340px',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="LOGIN"/>
                    <Tab label="REGISTER"/>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <form onSubmit={onLoginFormSubmitted}>
                        <Grid container direction="column" alignItems="center" justify="center">
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}>
                                <InputLabel htmlFor="password">Username *</InputLabel>
                                <Input
                                    id="username"
                                    className="form-field"
                                    type="text"
                                    name="username"
                                    onChange={inputLoginChangedHandler}
                                    value={username}/>
                                {loginForm.errors.username.length > 0 &&
                                <Error>{loginForm.errors.username}</Error>}
                            </FormControl>
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}>
                                <InputLabel htmlFor="password">Password *</InputLabel>
                                <Input
                                    id="password"
                                    className="form-field"
                                    type="password"
                                    name="password"
                                    onChange={inputLoginChangedHandler}
                                    value={loginPassword}/>
                                {loginForm.errors.password.length > 0 &&
                                <Error>{loginForm.errors.password}</Error>}
                            </FormControl>
                            {loginFormMessage.length > 0 &&
                            <Typography
                                style={{
                                    marginTop: "30px",
                                    fontSize: "16px"
                                }}>{loginFormMessage}</Typography>}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{
                                    marginTop: "40px"
                                }}
                            >LOGIN</Button>
                        </Grid>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form onSubmit={onRegisterFormSubmitted}>
                        <Grid container direction="column" alignItems="center" justify="center">
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}
                            >
                                <InputLabel
                                    htmlFor="first_name"
                                    required
                                >First Name</InputLabel>
                                <Input
                                    id="first_name"
                                    className="form-field"
                                    type="text"
                                    name="first_name"
                                    onChange={inputChangedHandler}
                                    value={first_name}
                                />
                                {addUserForm.errors.first_name.length > 0 &&
                                <Error>{addUserForm.errors.first_name}</Error>}
                            </FormControl>
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}
                            >
                                <InputLabel htmlFor="last_name">Last Name *</InputLabel>
                                <Input
                                    id="last_name"
                                    className="form-field"
                                    type="text"
                                    name="last_name"
                                    onChange={inputChangedHandler}
                                    value={last_name}/>
                                {addUserForm.errors.last_name.length > 0 &&
                                <Error>{addUserForm.errors.last_name}</Error>}
                            </FormControl>
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}
                            >
                                <InputLabel htmlFor="email_address">Email *</InputLabel>
                                <Input
                                    id="email_address"
                                    className="form-field"
                                    type="email"
                                    name="email_address"
                                    onChange={inputChangedHandler}
                                    value={email_address}/>
                                {addUserForm.errors.email_address.length > 0 &&
                                <Error>{addUserForm.errors.email_address}</Error>}
                            </FormControl>
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}>
                                <InputLabel htmlFor="password">Password *</InputLabel>
                                <Input
                                    id="password"
                                    className="form-field"
                                    type="password"
                                    name="password"
                                    onChange={inputChangedHandler}
                                    value={password}/>
                                {addUserForm.errors.password.length > 0 &&
                                <Error>{addUserForm.errors.password}</Error>}
                            </FormControl>
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}>
                                <InputLabel htmlFor="mobile_number">Contact No *</InputLabel>
                                <Input
                                    id="mobile_number"
                                    className="form-field"
                                    type="text"
                                    name="mobile_number"
                                    onChange={inputChangedHandler}
                                    value={mobile_number}/>
                                {addUserForm.errors.mobile_number.length > 0 &&
                                <Error>{addUserForm.errors.mobile_number}</Error>}
                            </FormControl>

                            {addUserFormMessage.length > 0 &&
                            <Typography
                                style={{
                                    marginTop: "30px",
                                    fontSize: "16px"
                                }}>{addUserFormMessage}</Typography>}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{
                                    marginTop: "30px"
                                }}
                            >REGISTER</Button>
                        </Grid>
                    </form>
                </TabPanel>
            </Modal>
        </Fragment>
    );
}

export default Header;