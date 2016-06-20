'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/pg');
const usersDB = require('./db/users_pg');

const app = express();
const thePort = process.argv[2] || process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.load();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//const editorRoute = require('./routes/editor');
const usersRoute = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/editor', editorRoute);
app.use('/users', usersRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.listen(thePort, function(){
  console.log('Your sweet, sweet code is ready to be edited on ' + thePort);
});
