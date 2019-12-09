import React, { Component } from "react";
// import {Link} from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import OwnerProfile from "./ownerprofile";
import UserProfile from "./userprofile";

class Profile extends Component {
    render() {
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        let selectedProfile = null;
        // if(this.state.accountType===2){
        console.log("location storage", localStorage.getItem('accountType'))
        if (localStorage.getItem("accountType") === "2") {
            console.log("inside owner profile")
            selectedProfile = <OwnerProfile />
        }
        if (localStorage.getItem("accountType") === "1") {
            console.log("inside user profile")
            selectedProfile = <UserProfile />
        }
        return (
            <div className="container-fluid">
                {redirectVar}
                <div className="card-fluid shadow-sm p-3 mb-5 rounded text-left">
                    {selectedProfile}
                </div>
            </div>
        )
    }
}

export default Profile;