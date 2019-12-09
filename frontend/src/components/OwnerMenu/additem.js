import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import rootUrl from "../config/settings";
import swal from "sweetalert";
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { ADD_ITEM } from '../../mutations/mutation'
import { Query, withApollo } from 'react-apollo';



const Price = /^\d+(,\d{3})*(\.\d{1,2})?$/

const AddItemSchema = Yup.object().shape({
    itemName: Yup.string()
        .required("Item Name is required"),
    itemType: Yup.string()
        .required("Item type is required"),
    cuisineName: Yup.string()
        .required("Cuisine name is required"),
    itemPrice: Yup.string()
        .matches(Price, 'Price is not valid')
        .required("Price is required")
})


class AddItems extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: "",
            itemType: "",
            itemPrice: "",
            itemDesc: "",
            cuisineName: "",
            itemImage: "",
            itemImagePreview: ""
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;

        if (name === "ProfileImage") {
            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post(rootUrl + '/profile/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Item Photo Name: ', profilePhoto.name);
                        this.setState({
                            itemImage: profilePhoto.name,
                            itemImagePreview: rootUrl + '/profile/download-file/' + profilePhoto.name
                        })
                    }
                });
        }
    }


    addItem = (details) => {
        console.log("Inside add items", details);
        const data = {
            itemName: details.itemName,
            itemType: details.itemType,
            itemPrice: details.itemPrice,
            itemDesc: details.itemDesc,
            cuisineName: details.cuisineName,
            itemImage: this.state.itemImage,
            userEmail: localStorage.getItem("userEmail")
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.client.mutate({
            mutation: ADD_ITEM,
            variables: {
                itemName: details.itemName,
                itemType: details.itemType,
                itemPrice: details.itemPrice,
                itemDesc: details.itemDesc,
                cuisineName: details.cuisineName,
                itemImage: this.state.itemImage,
                userEmail: localStorage.getItem("userEmail")
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.data);
                if (response.data.additem.success === true) {
                    console.log("success", response)
                    swal("Success", "Item added to the menu", "success");
                    // alert("success")

                    // window.location.reload();
                    // console.log(response)
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
                // alert("Update failed! Please try again")
            })
    }


    render() {
        let redirectVar;
        if (localStorage.getItem("accountType") !== '2') {
            redirectVar = <Redirect to="/login" />
        }
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        let itemImageData = <img src="https://mk0tarestaurantt3wcn.kinstacdn.com/wp-content/uploads/2018/01/premiumforrestaurants_0.jpg" alt="logo" />
        if (this.state.itemImagePreview) {
            itemImageData = <img src={this.state.itemImagePreview} alt="logo" />
        }
        return (
            <div className="row">
                {redirectVar}
                <div className="col-md-7">
                    <span className="font-weight-bold">Add Item</span>
                    {/* <button className="btn btn-link" id="btn-edit" onClick={this.edit}>Edit</button> */}
                    <Formik
                        enableReinitialize
                        initialValues={
                            {
                                itemName: this.state.itemName,
                                itemPrice: this.state.itemPrice,
                                itemType: this.state.itemType,
                                itemDesc: this.state.itemDesc,
                                cuisineName: this.state.cuisineName
                            }}
                        validationSchema={AddItemSchema}
                        onSubmit={(values, actions) => {
                            this.addItem(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ touched, errors, isSubmitting }) => (
                            <Form id="profile-form">
                                <div className="form-group text-left col-sm-5">
                                    <br />
                                    <label htmlFor="itemName">Item Name</label>
                                    <Field
                                        type="text"
                                        name="itemName"
                                        id="itemName"
                                        //   onChange={this.userNameChangeHandler}
                                        //   value={this.state.userName}
                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.itemName && errors.itemName ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="itemName"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="itemPrice">Item Price</label>
                                    <Field
                                        type="number"
                                        name="itemPrice"
                                        // onChange={this.passwordChangeHandler}
                                        // value={this.state.password}

                                        className={`form-control ${
                                            touched.itemPrice && errors.itemPrice ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="itemPrice"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="itemType">Section</label>
                                    <Field
                                        type="itemType"
                                        name="itemType"
                                        //   onChange={this.userEmailChangeHandler}
                                        //   value={this.state.userEmail}

                                        className={`form-control ${
                                            touched.itemType && errors.itemType ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="itemType"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5">
                                    <label htmlFor="itemDesc">Item Description</label>
                                    <Field
                                        type="textarea"
                                        name="itemDesc"
                                        //   onChange={this.userPhoneChangeHandler}
                                        //   value={this.state.userPhone}

                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.itemDesc && errors.itemDesc ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="itemDesc"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="form-group text-left col-sm-5" id="userAddress">
                                    <label htmlFor="cuisineName">Cuisine Name</label>
                                    <Field
                                        type="text"
                                        name="cuisineName"
                                        //   onChange={this.userAdrChangeHandler}
                                        //   value={this.state.userAdr}

                                        //   autofocus="true"
                                        className={`form-control ${
                                            touched.cuisineName && errors.cuisineName ? "is-invalid" : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="cuisineName"
                                        align="text-left"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <br />

                                <div className="form-group">
                                    <label htmlFor="ProfileImage"><strong>Item Image : </strong></label><br />
                                    <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-sm photo-upload-btn" onChange={this.handleChange} />
                                </div>
                                <div className="formholder">
                                    <span>
                                        <button className="btn btn-primary" type="submit" id="btn-addItem">Add Item</button>
                                        {/* &nbsp; <a href="/account" className="btn btn-outline-primary font-weight-bold" id="btn-cancel-profile" name="cancel">Cancel</a> */}
                                    </span>
                                </div>

                            </Form>

                        )}
                    </Formik>
                </div>
                <div className="col-md-5 center-content profile-heading">
                    {itemImageData}
                </div>
            </div>
        )
    }
}

export default withApollo(AddItems);