const usersDb = require('../models/users_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
    //encrypting password
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        const user = new usersDb ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
        user
        .save(user)
        .then(user => {
            res.redirect('/home/register-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "CREATE: error occurred"
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.name
    var password = req.body.password
    usersDb.findOne({name: username}) //find user by matching name in db
    .then(user => {
        if(user) { //user exists
            //compare inputted pw with user's hashed pw
            bcrypt.compare(password, user.password, function(err, result) {
                console.log(password, user.password);
                if(result){ //account found, login
                    let token = jwt.sign({ name: user.name}, "random", {expiresIn: '2h'})
                    res.redirect('/pr')
                } 
                else { //no matching account, cant login
                    res.send({
                        message: 'ERROR: incorrect password or user may not exist'
                    })
                }
            })
        } 
        else{ //user doesnt exist
            res.status(500).send({
                message: 'ERROR: could not find user'
            })
        }
    })
}
module.exports = { register, login }