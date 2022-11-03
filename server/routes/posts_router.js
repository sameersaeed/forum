const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controllers/post_controller')

/**
 * @description root route
 * @method GET /
 */
route.get('/', services.home);

/**
 * @description add post
 * @method GET /add-post
 */
route.get('/add-post', services.add_post);

/**
 * @description update post
 * @method GET /update-post
 */
route.get('/update-post', services.update_post);

//API requests
route.post('/api/site', controller.create)       //POST
route.get('/api/site', controller.find)          //GET
route.put('/api/site/:id', controller.update)    //UPDATE
route.delete('/api/site/:id', controller.delete) //DELETE

module.exports = route