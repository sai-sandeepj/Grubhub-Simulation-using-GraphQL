import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/navbar";
import axios from 'axios';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import swal from 'sweetalert';
// import rootUrl from "../config/settings";
import { SIGNUP_QUERY } from '../../mutations/mutation'
import { Query, withApollo } from 'react-apollo';


const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const zipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First Name is required"),
    lastName: Yup.string()
        .required("Last Name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
    userPhone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone number is required"),
    userAddress: Yup.string()
        .required("Address is required"),
    userZip: Yup.string()
        .matches(zipRegEx, "Zip code is not valid")
        .required("ZIP code is required")
});

class CustomerSignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            authFlag: false
        }
        this.submitSignup = this.submitSignup.bind(this)
    }

    submitSignup = (details) => {
        console.log("Inside submit login", details);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.client.mutate({
            mutation: SIGNUP_QUERY,
            variables:
            {
                "userEmail": details.email,
                "userPassword": details.password,
                "firstName": details.firstName,
                "lastName": details.lastName,
                "userPhone": details.userPhone,
                "userAddress": details.userAddress,
                "userZip": details.userZip,
                "accountType": 1
            }
        })
            .then(response => {
                console.log("inside success", response.data)
                if (response.data.customersignup.success === true) {
                    this.setState({
                        authFlag: true
                    })
                    // alert("Signup successfull! You can now login in to your account!")
                    swal("Successful", "You can now login to your account!", "success");
                }
                console.log(this.state.authFlag)
            })
            .catch(error => {
                console.log("In error");
                this.setState({
                    authFlag: false
                });
                swal("Oops", "Something went wrong! Please try agian later.", "error");
                console.log(error);
                // alert("User credentials not valid. Please try again!");
            })
    }


    render() {
        let redirectVar = null;
        if (this.state.authFlag === true) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <NavBar />
                <div className="container-fluid" id="signup">
                    <div className="row align-items-center h-100 ">
                        <div className="col-md-4 mx-auto">
                            <div className="card shadow p-3 mb-5 rounded">
                                <div className="card-body">
                                    <h4 className="text-black text-left font-weight-bold">Create your customer account!</h4>
                                    <br />
                                    <Formik
                                        initialValues={{
                                            email: "",
                                            firstName: "",
                                            lastName: "",
                                            password: "",
                                            userPhone: "",
                                            userAddress: "",
                                            userZip: ""
                                        }}
                                        validationSchema={SignUpSchema}
                                        onSubmit={(values, actions) => {
                                            this.submitSignup(values)
                                            actions.setSubmitting(false);
                                        }}
                                    >
                                        {({ touched, errors, isSubmitting }) => (
                                            <Form>

                                                <div className="form-group text-left">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <Field
                                                        type="text"
                                                        name="firstName"
                                                        //   autofocus="true"
                                                        className={`form-control ${
                                                            touched.firstName && errors.firstName ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="firstName"
                                                        align="text-left"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div className="form-group text-left">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <Field
                                                        type="text"
                                                        name="lastName"
                                                        //   autofocus="true"
                                                        className={`form-control ${
                                                            touched.lastName && errors.lastName ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="lastName"
                                                        align="text-left"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div className="form-group text-left">
                                                    <label htmlFor="email">Email</label>
                                                    <Field
                                                        type="email"
                                                        name="email"
                                                        className={`form-control ${
                                                            touched.email && errors.email ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="email"
                                                        align="text-left"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div className="form-group text-left">
                                                    <label htmlFor="email">Password (8 character minimum)</label>
                                                    <Field
                                                        type="password"
                                                        name="password"
                                                        className={`form-control ${
                                                            touched.password && errors.password ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="password"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div className="form-group text-left">
                                                    <label htmlFor="userPhone">Phone number</label>
                                                    <Field
                                                        type="text"
                                                        name="userPhone"
                                                        //   autofocus="true"
                                                        className={`form-control ${
                                                            touched.userPhone && errors.userPhone ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="userPhone"
                                                        align="text-left"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div className="form-group text-left">
                                                    <label htmlFor="userAddress">Address</label>
                                                    <Field
                                                        type="text"
                                                        name="userAddress"
                                                        //   autofocus="true"
                                                        className={`form-control ${
                                                            touched.userAddress && errors.userAddress ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="userAddress"
                                                        align="text-left"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <div className="form-group text-left">
                                                    <label htmlFor="userZip">ZIP Code</label>
                                                    <Field
                                                        type="text"
                                                        name="userZip"
                                                        //   autofocus="true"
                                                        className={`form-control ${
                                                            touched.userZip && errors.userZip ? "is-invalid" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="userZip"
                                                        align="text-left"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <br />
                                                <button
                                                    type="submit"
                                                    id="signin"
                                                    className="btn btn-block text-white font-weight-bold"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Please wait..." : "Sign Up"}
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>

                                    <br />
                                    Already have an account?&nbsp;<Link to="/login">Sign in!</Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withApollo(CustomerSignUpForm);


