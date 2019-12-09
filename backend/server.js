const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./GraphqlSchema/schema')
var session = require('express-session');
// const mongoose = require('mongoose');
const mongoose = require("./mongoConnection");
const cors = require("cors");

const app = express();

app.use(session({
    secret: 'cmpe273-grubhub-app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//Allow acceess control headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3001, () => console.log("Server started on port 3001"));