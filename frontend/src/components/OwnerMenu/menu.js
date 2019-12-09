import React, { Component } from "react";
import NavBar from "../Navbar/navbar";
import Items from "./items";
import Sections from "./sections";
import AddItems from "./additem";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Menu extends Component{
    constructor(){
        super()
        this.state={
            option:''
        }
        this.onItems=this.onItems.bind(this);
        this.onSections=this.onSections.bind(this);
        this.onAddItems=this.onAddItems.bind(this);
    }

    onItems(){
        this.setState({
            option:'1'
        })
    }

    onSections(){
        this.setState({
            option:'2'
        })
    }

    onAddItems(){
        this.setState({
            option:'3'
        })
    }
    render(){
        let redirectVar;
        if(localStorage.getItem("accountType")!=='2'){
            redirectVar = <Redirect to= "/login"/>
        }
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        let selectedView = null
        if(this.state.option==='')
        {
           selectedView=<Items/>
        }
        if(this.state.option==='1'){
            selectedView=<Items/>
            document.getElementById('items').style.color='black'
            document.getElementById('pastorders').style.color=''
            document.getElementById('additems').style.color=''
        }
        if(this.state.option==='2'){
            selectedView=<Sections/>
            document.getElementById('items').style.color=''
            document.getElementById('pastorders').style.color='black'
            document.getElementById('additems').style.color=''
        }
        if(this.state.option==='3'){
            selectedView=<AddItems/>
            document.getElementById('items').style.color=''
            document.getElementById('pastorders').style.color=''
            document.getElementById('additems').style.color='black'
        }
        return(
            <div>
                {redirectVar}
                 <NavBar/>
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card-fluid shadow-sm" id="side-nav">  
                             <div className="card-body text-left list-group-flush" >
                             <h3 className="font-weight-bold">Restaurant Items and Sections</h3>
                             <ul className="navbar-nav">
                                <li className="nav-item  text-left">
                                    <a className="nav-link font-weight-bold"  id='items' href="#/items" onClick={this.onItems}>View Items</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders'  href="#/sections" onClick={this.onSections}>Manage Sections</a>
                                </li>
                                <li className="nav-item  text-left">
                                    <a className="nav-link font-weight-bold"  id='additems' href="#/items" onClick={this.onAddItems}>Add Items</a>
                                </li>
                             </ul>
                                {/* <br/><br/><br/><br/><br/><br/><br/> */}
                             </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                    <div className="container-fluid">
                        <div className="card-group-fluid shadow-sm p-3 mb-5 rounded text-left">
                            {selectedView}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}




export default Menu;