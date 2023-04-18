const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/admincontroller');

const passport = require('passport');

routes.post('/register',admincontroller.register);
routes.post('/login',admincontroller.login);
routes.get('/viewadmin',passport.authenticate('jwt',{session: false}),admincontroller.viewadmin);
routes.patch('/updatedata',passport.authenticate('jwt',{session: false}),admincontroller.updatedata);
routes.delete('/deletedata',passport.authenticate('jwt',{session: false}),admincontroller.deletedata);

module.exports = routes;