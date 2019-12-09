import React, { Component } from "react";
import NavBar from "../../Navbar/navbar";
import NewOrders from "./neworders";
import PreparingOrders from "./preparingorders";
import DeliveryOrders from "./deliveryorders";
import PastOrders from "./pastorders";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class OwnerHome extends Component{
    constructor(props){
        super(props)
        this.state={
            option:''
        }
        this.onNewOrders=this.onNewOrders.bind(this);
        this.onPreparing=this.onPreparing.bind(this);
        this.onDelivering=this.onDelivering.bind(this);
        this.onPastOrders=this.onPastOrders.bind(this);
    }

    onNewOrders(){
        this.setState({
            option:'1'
        })
    }

    onPreparing(){
        this.setState({
            option:'2'
        })
    }

    onDelivering(){
        this.setState({
            option:'3'
        })
    }

    onPastOrders(){
        this.setState({
            option:'4'
        })
    }


    render(){
        let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/login"/>
        // }
        // let redirectVar;
        if(localStorage.getItem("accountType")!=='2'){
            redirectVar = <Redirect to= "/login"/>
        }
        let selectedView = null
        if(this.state.option==='')
        {
           selectedView=<NewOrders/>
        }
        if(this.state.option==='1'){
            selectedView=<NewOrders/>
            document.getElementById('neworders').style.color='black'
            document.getElementById('preparing').style.color=''
            document.getElementById('delivering').style.color=''
            document.getElementById('pastorders').style.color=''
        }
        if(this.state.option==='2'){
            selectedView=<PreparingOrders/>
            document.getElementById('neworders').style.color=''
            document.getElementById('preparing').style.color='black'
            document.getElementById('delivering').style.color=''
            document.getElementById('pastorders').style.color=''
        }
        if(this.state.option==='3'){
            selectedView=<DeliveryOrders/>
            document.getElementById('neworders').style.color=''
            document.getElementById('preparing').style.color=''
            document.getElementById('delivering').style.color='black'
            document.getElementById('pastorders').style.color=''
        }
        if(this.state.option==='4'){
            selectedView=<PastOrders/>
            document.getElementById('neworders').style.color=''
            document.getElementById('preparing').style.color=''
            document.getElementById('delivering').style.color=''
            document.getElementById('pastorders').style.color='black'
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
                             <h3 className="font-weight-bold">Orders</h3>
                             <ul className="navbar-nav">
                                <li className="nav-item  text-left">
                                    <a className="nav-link font-weight-bold"  id='neworders' href="#/neworders"  onClick={this.onNewOrders}>New Orders</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='preparing'  href="#/preparing" onClick={this.onPreparing}>Preparing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='delivering'  href="#/delivering" onClick={this.onDelivering}>Delivering</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="#/pastorders" onClick={this.onPastOrders}>Past Orders</a>
                                </li>
                             </ul>
                                {/* <br/><br/><br/><br/><br/><br/><br/> */}
                             </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card-fluid shadow-sm p-3 mb-5 rounded text-left">
                            {selectedView}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default OwnerHome;