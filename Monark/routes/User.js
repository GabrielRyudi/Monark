var express = require('express');
var mongoose = require('../database/mongoose');
var User = require('../model/UserModel');
var router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let data = await user.save();
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        var email = req.body.email;
        var password = req.body.password;
        let user = await User.findByCredentials(email, password);
        if (!user) {
          return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        let token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
});

module.exports = router;