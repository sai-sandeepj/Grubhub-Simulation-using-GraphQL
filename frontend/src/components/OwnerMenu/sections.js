import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import rootUrl from "../config/settings";
import swal from "sweetalert"
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

const ALL_SECTIONS_QUERY = gql`
query($userEmail: String){
    sections(userEmail: $userEmail)
  }`


class Sections extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sections: []
        }
    }

    componentDidMount() {
        let data = {
            userEmail: localStorage.getItem("userEmail")
        }
        console.log("Inside get profile after component did mount");
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.client.query({
            query: ALL_SECTIONS_QUERY,
            variables: {
                userEmail: localStorage.getItem("userEmail")
            }
        })
            .then(response => {
                console.log("inside success")
                console.log("response in all sections ", response.data);
                if (response.data.sections.length > 0) {
                    console.log("response", response.data)
                    this.setState({
                        sections: response.data.sections
                    });
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                // alert("User credentials not valid. Please try again!");
            })
    }

    deleteSection(details) {
        const data = {
            itemType: details,
            userEmail: localStorage.getItem("userEmail")
        }
        console.log("data", data)
        axios.post(rootUrl + '/restaurant/deletesection', data)
            .then(response => {
                console.log("inside success")
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log("response", response.data)
                    // alert("success")
                    swal("Deleted", "Section deleted succesfully!", "error");
                }
            })
            .catch(error => {
                console.log("In error");
                console.log(error);
                swal("Oops...", "Something went wrong! Please try again later", "error");
                // alert("User credentials not valid. Please try again!");
            })

    }


    render() {
        let sectionDetails;
        sectionDetails = this.state.sections.map((section) => {
            console.log("section", section)
            return (
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <span className="text-left font-weight-bold">{section}</span> &nbsp;&nbsp;&nbsp;
                        <Link to={{
                                pathname: `/editsection`,
                                section: section
                            }} className="text-outline-primary">Edit</Link> &nbsp;&nbsp;&nbsp;
                        <a className="inline text-danger" id="btn-edit" href="#edit" onClick={() => this.deleteSection(section.itemType)}>Delete</a>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {sectionDetails}
            </div>
        )
    }
}

export default withApollo(Sections);