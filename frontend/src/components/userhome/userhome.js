import React, { Component } from 'react';
import './homestyle.css';
import { Redirect } from 'react-router-dom'
import NavBar from '../Navbar/navbar'
import Background from '../../images/pexels-photo-1640772.jpeg';
import axios from 'axios'
import rootUrl from '../config/settings';
import swal from 'sweetalert'
import { SEARCH } from '../../queries/queries'
import { Query, withApollo } from 'react-apollo';


let sectionStyle = {
    width: "100%",
    height: "650px",
    backgroundImage: `url(${Background})`
};


class Home extends Component {
    constructor() {
        super()
        this.state = {
            itemSearch: "",
            restResults: [

            ],
            cuisineResults: [

            ]
        }
        this.searchHandle = this.searchHandle.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }



    searchHandle = e => {
        e.preventDefault();
        this.setState({
            itemSearch: e.target.value
        });
        console.log(this.state.itemSearch.length);
        // if(this.state.itemSearch.length >=2){
        //     document.getElementById("searchButton").disabled = false;
        // }

    }


    submitSearch = async (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.client.query({
            query: SEARCH,
            variables: {
                itemName: this.state.itemSearch
            }
        })
            .then(response => {
                console.log(response.data);
                if (response.data.search.length > 0) {
                    let restDetails = JSON.stringify(response.data.search)
                    console.log(response.data)
                    if (Object.keys(response.data).length > 0) {
                        localStorage.setItem("restaurantResults", restDetails)
                        localStorage.setItem("itemName", this.state.itemSearch);
                        this.props.history.push('/searchresults')
                    }
                    console.log("response is 200. data received")
                }

            }).catch((err) => {
                if (err) {
                    if (err === 401) {

                        console.log("Error messagw", err.response.status);
                        swal(err.response.data)
                    }
                    else {
                        swal("Something went wrong! please try again later")
                    }
                }

            });
    }


    render() {
        // for (let i = 0; i < localStorage.length; i++) {
        //     let k = localStorage.key(i);
        //     console.log(k)
        // }

        let redirectVar = null
        if (localStorage.getItem('accountType') !== '1') {
            redirectVar = <Redirect to='/login' />
        }
        // if(localStorage.getItem('restaurantResults')){
        //     console.log("get item rest");

        //     redirectVar = <Redirect to='/searchresults' />
        // }

        return (
            <div >
                {redirectVar}
                <NavBar />
                <div style={sectionStyle} >
                    <div className="centerit">
                        <div className="col-12 col-md-10 col-lg-8">
                            <form className="card card-sm">
                                <div className="card-body row no-gutters align-items-center">
                                    <div >
                                    </div>
                                    <div className="col">
                                        <input onChange={this.searchHandle} name="searchbar" className="form-control form-control-lg form-control-borderless" type="text" placeholder="Search food items" />
                                    </div>
                                    <div >
                                        <button id="searchButton" onClick={this.submitSearch} className="btn btn-lg btn-success"  >Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(Home);
