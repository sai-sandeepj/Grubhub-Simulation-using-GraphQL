import React, { Component } from "react";
// import {Link} from "react-router-dom";
import NavBar from "../Navbar/navbar";
import Profile from "../Profile/profile";
// import Pastorders from "../Orders/pastorders";
// import Upcomingorders from "../Orders/upcomingorders"
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: ''
        }

        this.onProfile = this.onProfile.bind(this);
        this.onPastorders = this.onPastorders.bind(this);
        this.onUpcomingorders = this.onUpcomingorders.bind(this)
    }

    onProfile() {
        this.setState({
            option: '1'
        })
    }

    onPastorders() {
        this.setState({
            option: '2'
        })
    }

    onUpcomingorders() {
        this.setState({
            option: '3'
        })
    }


    render() {
        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        let selectedView = null
        if (this.state.option === '') {
            selectedView = <Profile />
        }
        if (this.state.option === '1') {
            selectedView = <Profile />
            document.getElementById('profile').style.color = 'black'
            // document.getElementById('pastorders').style.color='blue'
            // document.getElementById('upcomingorders').style.color='blue'
        }
        if (this.state.option === '2') {
            // selectedView = <Pastorders />
            document.getElementById('profile').style.color = 'blue'
            document.getElementById('pastorders').style.color = 'black'
            document.getElementById('upcomingorders').style.color = ''
        }
        if (this.state.option === '3') {
            // selectedView = <Upcomingorders />
            document.getElementById('profile').style.color = ''
            document.getElementById('pastorders').style.color = ''
            document.getElementById('upcomingorders').style.color = 'black'
        }
        return (
            <div>
                {redirectVar}
                <NavBar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-fluid shadow-sm" id="side-nav">
                                <div className="card-body text-left list-group-flush" >
                                    <h3 className="font-weight-bold">Your account</h3>
                                    <ul className="navbar-nav">
                                        <li className="nav-item  text-left">
                                            <a className="nav-link font-weight-bold" id='profile' href="#/profile" onClick={this.onProfile}>Profile</a>
                                        </li>
                                        {/* <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders'  href="#/pastorders" onClick={this.onPastorders}>Past Orders</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='upcomingorders' href="#/upcomingorders" onClick={this.onUpcomingorders}>Upcoming Orders</a>
                                </li> */}
                                    </ul>
                                    {/* <br/><br/><br/><br/><br/><br/><br/> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            {selectedView}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Account;