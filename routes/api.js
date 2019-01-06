var express = require('express');
var router = express.Router();
var UsersGateway = require('../database/UsersGateway');


// GET

router.get('/', function(req, res) {
    console.log('GET request');
    res.send('home page');
});

router.get('/users', function(req, res) {
    console.log('GET /users request');
    UsersGateway.getUsers().then(result => {
        //console.log(result.recordset);
        res.send(result.recordset);
    });
});

router.get('/profile', function(req, res) {
    console.log('Get /profile request');
    UsersGateway.UsersGateway.getProfile()
})


// POST

router.post('/login', function(req, res) {
    console.log('POST /login request');
    console.log(req.body);
    const login = req.body.username;
    const password = req.body.password;
    var logged = false;
    var user = false;
    console.log(login + '&' + password + ' attempt to logg in');
    UsersGateway.UsersGateway.getUsers().then(result => {
        for(var i=0; i<result.recordset.length; i++) {
            if (result.recordset[i].username == login && result.recordset[i].password == password) {
                logged = true;
                user = result.recordset[i];
                console.log(login + ' logged in');
            }
        };
        console.log(user);
        res.send(user);
    });
});

router.post('/register', function(req, res) {
    console.log('POST /register request');
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + '&' + password + ' attempt to register');
    UsersGateway.UsersGateway.addUser(username, password).then(result => {
        console.log(result);
        res.send(result);
    })
    //console.log(success);
    //res.send(success);
});

router.post('/updatePassword', function(req, res) {
    console.log('POST /updatePassword request');
    const id = req.body.id;
    const password = req.body.password;
    UsersGateway.UsersGateway.updatePassword(id, password);
});

router.post('/updateReps', function(req, res) {
    console.log('POST /updatePassword request');
    const id = req.body.id;
    const pullups = req.body.pullups;
    const pushups = req.body.pushups;
    const squats = req.body.squats;
    UsersGateway.UsersGateway.updateReps(id, pullups, pushups, squats);
});

module.exports = router;