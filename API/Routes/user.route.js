const express = require('express');
const app = express();
const _ = require('lodash');
let userRoutes = express.Router();
var config = require('../config/config');
let User = require('../models/user');
let Commandes = require('../models/commandes');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');
var myPassportService = require('../config/passportconfig')(passport);
var ObjectId = require('mongoose').Types.ObjectId;
userRoutes.get('/getcmd',  function(req, res) {
  Commandes.find(function (err, commandes) {
    if (err) {res.send('error');
  next();}
    res.json(commandes);
  });
})
module.exports = userRoutes;