const axios = require('axios');

exports.home = (req, res) => {
    axios.get('http://localhost:3000/pr/api/site')
    .then(function(response) {
        res.render('index', { posts: response.data })
    })
    .catch(err => {
        res.send(err);
    })
}

exports.add_post = (req, res) => {
    res.render('add_post');
}

exports.update_post = (req, res) => {
    axios.get('http://localhost:3000/pr/api/site', { params: { id: req.query.id } })
    .then(function(postdata) {
        res.render("update_post", { post: postdata.data })
    })
    .catch(err => {
        res.send(err);
    })
}

exports.login_user = (req, res) => {
    res.render('login_user');
}

exports.register_user = (req, res) => {
    res.render('register_user');
}