var postDb = require('../models/posts_model');
var d = new Date();
var formattedDate = d.toLocaleString('default', { month: 'short' }) + " "  //post time formatting
    + d.getDate() + ", " + d.getFullYear() + " at " 
    + d.getHours() + ":" + d.getMinutes(); 

//create new post
exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({ message: "CREATE: cannot be empty"});
        return;
    }
    //creating new post
    const post = new postDb({
        date: formattedDate,
        title: req.body.title,
        description: req.body.description
    })
    //saving to db
    post
    .save(post)
    .then(res.redirect('/pr'))
    .catch(err => {
        res.status(500).send({
            message: err.message || "CREATE: error occurred"
        });
    });
}

//retrieve posts
exports.find = (req, res) => {
    if(req.query.id) { //retrieve single post
        const id = req.query.id;
        postDb.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: "GET: post id " + id + " not found"})
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "GET: post with id" + id + " could not be found" })
        })
    }
    else { //retrieve all posts
        postDb.find()
        .then(post => {
            res.send(post)
        })
        .catch(err => {
            res.status(500).send({ 
                message: err.message || "GET: error occurred"
            });
        })
    }
}
//update post
exports.update = (req, res) => {
    if(!req.body) {
        return res 
        .status(400)
        .send({ message: "UPDATE: cannot be empty" })
    }
    const id = req.params.id;

    req.body.date = formattedDate; //updating post date
    postDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data) {
            res.status(404).send({ message: `UPDATE: post with id ${id} not found` })
        }
        else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ message: "UPDATE: error updating information" })
    })
}

//delete post by id
exports.delete = (req, res) => {
    const id = req.params.id;
    postDb.findByIdAndDelete(id)
    .then(data => {
        if(!data) {
            res.status(404).send({ message: `DELETE: post id ${id} not found`})
        }
        else {
            res.send({
                message: "post deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "DELETE: post with id" + id + " could not be deleted"
        });
    });
}