const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const user = require('../models/user');

// Register
router.post("/register", async (req, res, next) => {

    console.log('req body', req.body);

    let newUser = new user.User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });    

    await user.addUser(newUser);
    console.log('addUser returned');
    res.json({success: true, msg:'User registered'});
});

// Authenticate
router.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('waiting to authenticate '+username);

    user.getUserbyUsername(username).then((userData) => {
        console.log('getUserbyUsername', userData);
        // if(err) throw err;
        if(!userData){
            return res.json({success: false, msg:'User not found'});
        }

        user.comparePassword(password, userData.password, (err, isMatch) => {
            console.log(err, isMatch);
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({ data: userData }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success:true,
                    token: 'JWT '+token,
                    user: {
                        id: userData._id,
                        name: userData.name,
                        username: userData.username,
                        email: userData.email
                    }
                });
            } else {
                return res.json({success: false, msg:'Password is incorrect'});
            }
        });
    });
});

// Profile
router.get("/profile", passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user})
});

module.exports = router;


