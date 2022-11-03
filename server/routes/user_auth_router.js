const express = require('express')
const route = express.Router()
const services = require('../services/render');
const controller = require('../controllers/auth_controller')

/**
 * @description login
 * @method GET /home/login-user
 */
route.get('/login-user', services.login_user);

/**
 * @description register
 * @method GET /home/register-user
 */
route.get('/register-user', services.register_user);

route.post('/api/user/login', controller.login)    
route.post('/api/user/register', controller.register)  //POST

module.exports = route

