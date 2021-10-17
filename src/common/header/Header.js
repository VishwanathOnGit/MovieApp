import React, {Fragment, useState} from "react";
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

    const [addSubscriberForm, setAddSubscriberForm] = useState({
        id: 0,
        firstname: '',
        lastname: '',
        phone: '',
        errors: {
            firstname: '',
            lastname: '',
            phone: '',
        }
    });

    const inputChangedHandler = (e) => {

        const state = addSubscriberForm;
        state[e.target.name] = e.target.value;
        console.log(state)
        setAddSubscriberForm({...state});
    }

    const onFormSubmitted = (e) => {
        e.preventDefault();

        // addSubscriberHandler(addSubscriberForm);
        setAddSubscriberForm({id: 0, firstname: '', phone: '', lastname: ''});
        // history.push("/")
    }

    const {firstname, phone} = addSubscriberForm;

    const [modalShow, setModalShow] = useState(false);
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <div className="header">
                <img src={logo} alt="movie app logo" className="appLogo"/>
                <div>
                    <Button
                        variant="contained"
                        className="custom-button"
                        color="primary">Book
                        Show</Button>
                    <Button
                        variant="contained"
                        className="custom-button"
                        onClick={() => setModalShow(true)}>Login</Button>
                    <Button
                        variant="contained"
                        className="custom-button">Logout</Button>
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
                    <Grid container direction="column" alignItems="center" justify="center">
                        <FormControl
                            className="form-field"
                            variant="standard"
                            style={{
                                marginTop: "20px"
                            }}
                        >
                            <InputLabel htmlFor="username">Username *</InputLabel>
                            <Input id="username"/>
                        </FormControl>
                        <FormControl
                            className="form-field"
                            variant="standard"
                            style={{
                                marginTop: "20px"
                            }}>
                            <InputLabel htmlFor="password">Password *</InputLabel>
                            <Input id="password"/>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{
                                marginTop: "40px"
                            }}
                        >LOGIN</Button>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form onSubmit={onFormSubmitted}>
                        <Grid container direction="column" alignItems="center" justify="center">
                            <FormControl
                                style={{
                                    marginTop: "20px"
                                }}
                            >
                                <InputLabel
                                    htmlFor="firstname"
                                    required
                                >First Name</InputLabel>
                                <Input
                                    id="firstname"
                                    className="form-field"
                                    type="text"
                                    name="firstname"
                                    onChange={inputChangedHandler}
                                    value={firstname}
                                />
                                <Error >required</Error>
                            </FormControl>
                            {/*<FormControl*/}
                            {/*    className="form-field"*/}
                            {/*    variant="standard"*/}
                            {/*    style={{*/}
                            {/*        marginTop: "20px"*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <InputLabel htmlFor="lastname">Last Name *</InputLabel>*/}
                            {/*    <Input id="lastname"/>*/}
                            {/*</FormControl>*/}
                            {/*<FormControl*/}
                            {/*    className="form-field"*/}
                            {/*    variant="standard"*/}
                            {/*    style={{*/}
                            {/*        marginTop: "20px"*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <InputLabel htmlFor="email">Email *</InputLabel>*/}
                            {/*    <Input id="email"/>*/}
                            {/*</FormControl>*/}
                            {/*<FormControl*/}
                            {/*    className="form-field"*/}
                            {/*    variant="standard"*/}
                            {/*    style={{*/}
                            {/*        marginTop: "20px"*/}
                            {/*    }}>*/}
                            {/*    <InputLabel htmlFor="password">Password *</InputLabel>*/}
                            {/*    <Input id="password"/>*/}
                            {/*</FormControl>*/}
                            {/*<FormControl*/}
                            {/*    className="form-field"*/}
                            {/*    variant="standard"*/}
                            {/*    style={{*/}
                            {/*        marginTop: "20px"*/}
                            {/*    }}>*/}
                            {/*    <InputLabel htmlFor="contact">Contact No *</InputLabel>*/}
                            {/*    <Input id="contact"/>*/}
                            {/*</FormControl>*/}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{
                                    marginTop: "40px"
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