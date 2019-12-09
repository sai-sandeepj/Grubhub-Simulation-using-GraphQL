import React, { Component } from 'react';
// import { rootUrl } from '../../components/config/settings';
import { Redirect } from 'react-router-dom'
import ItemDisplay from './itemCard'
import Navbar from '../Navbar/Navbar'
import './restHome.css'

class RestaurantHome extends Component {
    constructor() {
        super()
        this.state = {
            restItemDetails: ""
        }
    }

    visitItem = () => {

    }
    render() {
        let redirectVar = null;
        let itemDetails = null;
        if (!sessionStorage.getItem('restItemResults')) {
            redirectVar = <Redirect to="/" />
        }
        else {
            let restItemResults = sessionStorage.getItem("restItemResults")
            let sessionItemDetails = JSON.parse(restItemResults);
            this.state.restItemDetails = sessionItemDetails;
        }
        if (this.state.restItemDetails) {
            itemDetails = this.state.restItemDetails.map((item, index) => {
                return (
                    <ItemDisplay
                        key={item.itemId}
                        itemIndividual={item}
                        visitItem={this.visitItem.bind(this, index)}
                    />
                )
            })
        }
        return (
            <div>
                {redirectVar}
                <Navbar />
                <div>
                    <div className="container">
                        <div className="row justify-content-start">
                            <div className="col">
                                <div className=" pad-left">
                                    {itemDetails}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default RestaurantHome;