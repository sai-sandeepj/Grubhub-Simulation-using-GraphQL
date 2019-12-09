import React, { Component } from 'react';
import Navbar from '../Navbar/navbar';
import RestCard from './restCards';
import LeftPanel from './leftPanel';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import rootUrl from '../config/settings';
import cookie from 'react-cookies';
import './cardstyles.css';
import { ITEMS_BY_RESTAURANT, RESTAURANTS_BY_ITEM_CUISINE } from '../../queries/queries'
import { Query, withApollo } from 'react-apollo';


class searchResults extends Component {
    constructor() {
        super()
        this.state = {
            restSearchResults: "",
            restCuisineResults: "",
            uniquecuisines: ""
        }
    }

    componentDidMount() {
        if (localStorage.getItem("restaurantResults")) {
            let restResultsBySearch = localStorage.getItem("restaurantResults")
            let restDetails = JSON.parse(restResultsBySearch);
            this.setState({
                restSearchResults: restDetails
            })
            console.log(restDetails)
        }
        let cuisineDetails = JSON.parse(localStorage.getItem("restaurantResults"));
        console.log("cuisine", cuisineDetails[0].restaurant)
        let lookup = {};
        let items = []
        cuisineDetails.map((rest, index) => {
            console.log("rest", rest.restaurant.items)
            rest.restaurant.items.map((item, index) => {
                items.push(item)
            })
        })
        // let items = cuisineDetails
        let result = [];
        console.log("items", items)
        for (let item, i = 0; item = items[i++];) {
            console.log("item", item)

            let itemtype = item.cuisineName;

            if (!(itemtype in lookup)) {
                lookup[itemtype] = 1;
                result.push(itemtype);
            }
        }
        console.log(result)
        result.sort()
        this.setState({
            uniquecuisines: result
        })
        console.log("cuisines:", this.state.uniquecuisines)
        if (localStorage.getItem("restCuisineDetails")) {
            let restResultsBySearch = localStorage.getItem("restCuisineDetails")
            let restDetails = JSON.parse(restResultsBySearch);
            this.setState({

                restCuisineResults: restDetails
            })
        }
    }


    visitRestaurant = (restName) => {
        console.log("in VisitRestaurant method", restName);
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        this.props.client.query({
            query: ITEMS_BY_RESTAURANT,
            variables: {
                restName: restName
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.restaurantitems.restaurant.items.length > 0) {
                    let itemDetails = JSON.stringify(response.data.restaurantitems.restaurant)
                    console.log(response.data);

                    localStorage.setItem('itemsByRestaurant', itemDetails)
                    console.log("itemDetails:" + typeof itemDetails)
                    this.props.history.push('/resthome')
                }
                else {
                    console.log("Didn't fetch items data")
                }
            })

    }
    visitCuisine = (cuisineName) => {
        //e.preventDefault()
        console.log("in VisitCuisine method");
        console.log(cuisineName);

        if (cuisineName) {
            this.props.client.query({
                query: RESTAURANTS_BY_ITEM_CUISINE,
                variables: {
                    itemName: localStorage.getItem("itemName"),
                    cuisineName: cuisineName
                }
            })
                .then(response => {
                    console.log(response.data.restaurantbyitemcuisine)
                    if (response.data.restaurantbyitemcuisine.length > 0) {
                        let restCuisineDetails = JSON.stringify(response.data.restaurantbyitemcuisine)
                        console.log(response.data);

                        localStorage.setItem('restCuisineDetails', restCuisineDetails)
                        console.log("itemDetails:" + restCuisineDetails)
                        window.location.reload();
                        // this.props.history.push('/searchresults')
                    }
                    else {
                        console.log("Didn't fetch items data")
                    }
                })
        }
        else {
            alert("Please try again")
        }
    }


    render() {
        let redirectVar = null;
        if (localStorage.getItem("accountType") !== '1') {
            redirectVar = <Redirect to="/login" />
        }

        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/login" />
        // }
        let route = null
        if (this.state.restCuisineResults) {
            route = this.state.restCuisineResults;
            localStorage.removeItem("restCuisineDetails")
        }
        else if (this.state.restSearchResults) {
            route = this.state.restSearchResults;
        }
        if (route) {
            let restCards = route.map((restaurant, index) => {
                return (
                    <RestCard
                        // key={restaurant.restId}
                        restIndividual={restaurant}
                        visitRest={this.visitRestaurant.bind(this)}
                    />
                )
            })

            let cuisinePanel = this.state.uniquecuisines.map((cuisine, ind) => {
                return (
                    <LeftPanel
                        key={cuisine}
                        cuisineIndividual={cuisine}
                        visitCuisine={this.visitCuisine.bind(this)}
                    />
                )
            })
            return (
                <div>
                    {redirectVar}
                    <Navbar />
                    <div>
                        <div className="restLeft" id="left">
                            <div className="list-group">
                                {cuisinePanel}
                            </div>
                        </div>
                        <div id="right">
                            <div id="search-results-text"><p>Your Search Results....</p></div>
                            <div className="card-group" >
                                {restCards}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        // let restCards = this.state.people.map(person => {
        //     return (
        //         <RestCard key={person.id} removePerson={this.removePerson.bind(this)} person={person} />
        //     )
        // })
        else {
            return (
                <div>
                    <Navbar />
                    {redirectVar}
                    <h3>No Items found. </h3>
                </div>
            );
        }
    }
}

export default withApollo(searchResults);