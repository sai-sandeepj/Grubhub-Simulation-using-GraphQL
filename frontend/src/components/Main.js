import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import LoginForm from '../components/Login/login';
import CustomerSignUp from './Signup/customersignup'
import OwnerSignUp from './Signup/ownersignup';
import Account from './Account/account';
import OwnerHome from './Home/Owner/ownerhome';
import Menu from '../components/OwnerMenu/menu';
import EditItem from './OwnerMenu/edititem';
import EditSection from './OwnerMenu/editsection';
import restCard from '../components/Search/restCards';
import searchResults from '../components/Search/searchResults'
import RestaurantHome from '../components/restaurants/restaurantHome'
import Home from '../components/userhome/userhome'


class MainRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LoginForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/customersignup" component={CustomerSignUp} />
                <Route path="/ownersignup" component={OwnerSignUp} />
                <Route path="/account" component={Account} />
                <Route path="/ownerhome" component={OwnerHome} />
                <Route path="/menu" component={Menu} />
                <Route path="/edititem" component={EditItem} />
                <Route path="/editsection" component={EditSection} />
                <Route path="/userhome" component={Home} />
                <Route path="/restcard" component={restCard} />
                <Route path="/searchresults" component={searchResults} />
                <Route path="/resthome" component={RestaurantHome} />
            </div>
        )
    }
}

export default MainRoutes;