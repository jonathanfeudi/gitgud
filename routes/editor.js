'use strict'

const express = require('express');
const editor = express.Route();
const db = require('../db/pg');
const dotenv = require('dotenv');
dotenv.load();
const SECRET = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
