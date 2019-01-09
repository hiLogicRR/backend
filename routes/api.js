var express = require('express');
var router = express.Router();
var UsersGateway = require('../database/UsersGateway');
var TrainingGateway = require('../database/TrainingGateway');
var ChestGateway = require('../database/ChestGateway');
var BackGateway = require('../database/BackGateway');
var LegsGateway = require('../database/LegsGateway');


// GET

router.get('/', function(req, res) {
    console.log('GET request');
    res.send('home page');
});

router.get('/users', function(req, res) {
    console.log('GET /users request');
    UsersGateway.UsersGateway.getUsers().then(result => {
        //console.log(result.recordset);
        res.send(result.recordset);
    });
});

router.get('/chest', function(req, res) {
    console.log('GET /chest request');
    ChestGateway.ChestGatewat.getChest()
    .then(result => {
        res.send(result.recordset);
    })
});


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

// router.post('/register2', function(req, res) {
//     console.log('POST /register request');
//     console.log(req.body);
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log(username + '&' + password + ' attempt to register');
//     UsersGateway.UsersGateway.addUserAndGiveID(username, password)
//     .then(result => {
//         console.log(result);
//         res.send(result);
//     })
//     //console.log(success);
//     //res.send(success);
// });

router.post('/updatePassword', function(req, res) {
    console.log('POST /updatePassword request');
    const id = req.body.id;
    const password = req.body.password;
    UsersGateway.UsersGateway.updatePassword(id, password).then(result => {
        res.send(result);
    })
});

router.post('/updateReps', function(req, res) {
    console.log('POST /updateReps request');
    const id = req.body.id;
    const pullups = req.body.pullups;
    const pushups = req.body.pushups;
    const squats = req.body.squats;
    UsersGateway.UsersGateway.updateReps(id, pullups, pushups, squats).then(result => {
        res.send(result);
    })
});

router.post('/trainings', function(req, res) {
    console.log('POST /trainings request');
    const user_id = req.body.user_id;
    TrainingGateway.TrainingGateway.getTrainingIDsByUserID(user_id).then(result => {
        res.send(result.recordset);
    })
});

router.post('/chest', function(req, res) {
    console.log('POST /chest request');
    const training_id = req.body.training_id;
    ChestGateway.ChestGateway.getChestByTrainingID(training_id).then(result => {
        res.send(result.recordset);
    })
});

router.post('/back', function(req, res) {
    console.log('POST /back request');
    const training_id = req.body.training_id;
    BackGateway.BackGateway.getBackByTrainingID(training_id).then(result => {
        res.send(result.recordset);
    })
});

router.post('/legs', function(req, res) {
    console.log('POST /legs request');
    const training_id = req.body.training_id;
    LegsGateway.LegsGateway.getLegsByTrainingID(training_id).then(result => {
        res.send(result.recordset);
    })
});

router.post('/addtraining', function(req, res) {
    console.log('POST /addtraining request');
    const user_id = req.body.user_id;
    const name = req.body.name;
    TrainingGateway.TrainingGateway.insertTraining(user_id, name).then(result => {
        res.send(result.toString());
    })
});

router.post('/updatetraining', function(req, res) {
    console.log('POST /updatetraining request');
    req.body.training.map((ex) => {
        console.log(ex);
        const muscle = ex['muscle'];
        if(muscle == 'chest') {
            ChestGateway.ChestGateway.insertChest(req.body.training_id, ex).then(result => {
                console.log('chest updated');
                res.send(result);
            })
        }
        if(muscle == 'back') {
            BackGateway.BackGateway.insertBack(req.body.training_id, ex).then(result => {
                console.log('back updated');
                res.send(result);
            })
        }
        if(muscle == 'legs') {
            LegsGateway.LegsGateway.insertLegs(req.body.training_id, ex).then(result => {
                console.log('legs updated');
                res.send(result);
            })
        }
    });
    
})


module.exports = router;