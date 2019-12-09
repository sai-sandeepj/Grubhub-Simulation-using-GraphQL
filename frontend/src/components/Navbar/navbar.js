import React, { Component } from "react";
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
// import {Redirect} from 'react-router';

class NavBar extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem('accountType')
        localStorage.clear();
    }

    render() {
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        // let ownerLogin;
        let navLogin = null;
        // if(cookie.load('cookie')){
        //     console.log("Able to read cookie");
        if (localStorage.getItem('accountType') === "2") {
            console.log("near nav login")
            navLogin = (
                <ul className="nav navbar-inverse ">
                    {/* <li><Link to="/ownerhome">Home</Link></li>&nbsp;&nbsp; */}
                    <li><Link to="/menu">Menu</Link></li>&nbsp;&nbsp;
                         <li><Link to="/account">{localStorage.getItem("firstName")}</Link></li>&nbsp;&nbsp;
                         <li><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
                </ul>
            )
        }
        if (localStorage.getItem('accountType') === "1") {
            console.log("near nav login")
            navLogin = (
                <ul className="nav navbar-inverse ">
                    <li><Link to="/userhome">Home</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                             {/* <li className="dropdown active">
                        <a className="dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Orders
                                    </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/upcomingorders">Upcoming Orders</a>
                            <a className="dropdown-item" href="/pastorders">Past Orders</a>
                        </div> */}
                    {/* </li> */}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                             {/* <li><Link to="/cart">Cart</Link></li>&nbsp;&nbsp;&nbsp;&nbsp; */}
                    <li><Link to="/account">{localStorage.getItem("firstName")}</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
                             <li><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
                </ul>
            )
        }
        //   }
        return (
            <header id="header">
                {/* {redirectVar} */}
                <nav className="navbar shadow-sm bg-white rounded navbar-dark bg-white text-left">
                    <a className="navbar-brand" href="/">
                        <h3 className="font-weight-bold text-danger" >&nbsp; GRUBHUB</h3>
                    </a>
                    {navLogin}
                </nav>
            </header>
        );
    }
}

export default NavBar;