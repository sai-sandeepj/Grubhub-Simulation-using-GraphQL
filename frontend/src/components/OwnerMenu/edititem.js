import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import NavBar from "../Navbar/navbar";
import rootUrl from "../config/settings";
import swal from "sweetalert";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


const Price=/^\d+(,\d{3})*(\.\d{1,2})?$/

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


class EditItem extends Component{
   constructor(props){
       super(props)
       console.log(props.location.item)
       this.state={
           itemId: props.location.item.itemId,
           itemName:props.location.item.itemName,
           itemType:props.location.item.itemType,
           itemPrice:props.location.item.itemPrice,
           itemDesc:props.location.item.itemDesc,
           cuisineName:props.location.item.cuisineName,
           itemImage:props.location.item.itemImage,
           itemImagePreview:props.location.item.itemImage
       }
       console.log(this.state)
   }

   editItem=(details)=>{
    // console.log("Inside edit items",details);
    const data = {
           itemId: this.state.itemId,
           itemName:details.itemName,
           itemType:details.itemType,
           itemPrice:details.itemPrice,
           itemDesc:details.itemDesc,
           itemImage:this.state.itemImage,
           cuisineName:details.cuisineName,
           userEmail: localStorage.getItem("userEmail")
        //    itemImage:"",
        //    itemImagePreview:""
        }
        console.log("Inside edit items",data);
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post(rootUrl+'/restaurant/updateitem',data)
        .then(response => {
            console.log("inside success" )
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                console.log("success",response)
            // alert("success")
            swal("Success","Item details updated", "success");
            // console.log(response)
            }
        })
        .catch(error => {
            console.log("In error");
            console.log(error);
            swal("Oops...","Something went wrong! Please try again later", "error");
            // alert("Update failed! Please try again")
        })
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
            axios.post(rootUrl+'/profile/upload-file', data)
            .then(response => {
                if (response.status === 200) {
                    console.log('Item Photo Name: ', profilePhoto.name);
                    this.setState({
                        itemImage: profilePhoto.name,
                        itemImagePreview: rootUrl+'/profile/download-file/' +profilePhoto.name
                    })
                }
            });
    }
    }


    render(){
        let redirectVar;
            if(localStorage.getItem("accountType")!=='2'){
                redirectVar = <Redirect to= "/login"/>
            }
            if (!cookie.load('cookie')) {
                redirectVar = <Redirect to="/login" />
            }
        let itemImageData = <img  src="https://mk0tarestaurantt3wcn.kinstacdn.com/wp-content/uploads/2018/01/premiumforrestaurants_0.jpg" alt="logo" />
        if (this.state.itemImage) {
            itemImageData = <img src= {rootUrl+'/profile/download-file/' +this.state.itemImage} alt="logo" />
        }
        return(
        <div>
            {redirectVar}
            <NavBar/>
        <div className="row">
              
            <div className="col-md-5"> 
             
                <span  className="font-weight-bold">Edit Item</span>
                {/* <button className="btn btn-link" id="btn-edit" onClick={this.edit}>Edit</button> */}
                    <Formik
                    enableReinitialize
                    initialValues={
                        {
                            itemName:this.state.itemName,
                            itemPrice:this.state.itemPrice,
                            itemType:this.state.itemType,
                            itemDesc:this.state.itemDesc,
                            cuisineName:this.state.cuisineName
                           }}
                    validationSchema={AddItemSchema}
                    onSubmit={(values, actions) => {
                        this.editItem(values);
                        actions.setSubmitting(false);
                    }}
                    >
                    {({ touched, errors, isSubmitting }) => (
                        <Form id="profile-form">
                            <div className="form-group text-left col-sm-5">
                            <br/>
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
                                    type="itemPrice"
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

                            <br/>
                            <div className="form-group">
                    <label htmlFor="ProfileImage"><strong>Item Image : </strong></label><br />
                    <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-sm photo-upload-btn" onChange={this.handleChange}/>
                </div>
                                <div className="formholder">
                <span>
                    <button className="btn btn-primary" type="submit" id="btn-editItem">Save</button> 
                {/* &nbsp; <a href="/account" className="btn btn-outline-primary font-weight-bold" id="btn-cancel-profile" name="cancel">Cancel</a> */}
                </span>
                </div>  
                 {/* <div className="form-group">
                    <label htmlFor="ProfileImage"><strong>Profile Image : </strong></label><br />
                    <input type="file" name="ProfileImage" id="ProfileImage" className="btn btn-sm photo-upload-btn" onChange={this.handleChange}/>
                </div>   */} 
                 </Form>
                 
                 )}
                </Formik>
            </div>
            <div className="col-md-5 center-content profile-heading">
                {itemImageData}
            </div>  
         </div>
         </div>
        )
    }
}

export default EditItem;