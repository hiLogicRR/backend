var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', require('./routes/api'));


app.listen(process.env.port || 5000, function() {
    console.log('Server is listening ... ');
});