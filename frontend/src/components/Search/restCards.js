
import React, { Component } from 'react';
import './cardstyles.css';
// import {Redirect} from 'react-router-dom'
// import axios from 'axios'
// import logo from '../../images/login-page-burger.png'
import rootUrl from '../config/settings';
import rest_image from "../../images/restaurant_defaultimage.jpg"

// var images = require.context('../../../../backend/uploads/', true);
let redirectVar = null;
class restCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let unknown;
        let { restId, restImage, restName, restDesc } = this.props.restIndividual.restaurant;
        if (restImage) {
            unknown =
                <img src={rootUrl + '/profile/download-file/' + restImage} className="card-img-top" id="card-img-top" alt="..." />
        }
        else {
            unknown =
                <img src={rest_image} className="card-img-top" id="card-img-top" alt="..." />
        }
        // let profileImageData = <img src={logo} className="card-img-top" alt="..."/>
        // if (this.state.photos[this.props.key]) {
        //     profileImageData = <img src={this.state.photos[this.props.key]} className="card-img-top img-responsive fit-image" id="itemimage" alt="..."/>
        // }


        return (
            <div>

                <div className="restRight" >
                    <div className="col-md-3 col-sm-6">
                        <div className="card cardclass" id="cardclass" >
                            {unknown}
                            {/* {profileImageData} */}
                            <div className="card-block" id="card-title-text">
                                <h4 className="card-title" id="card-title">{restName}</h4>
                                <p className="card-text" id="card-text">{restDesc} </p>
                                <button id="btn-rest-visit" onClick={() => this.props.visitRest(restName)} className="btn btn-primary">Visit Restaurant</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default restCard;