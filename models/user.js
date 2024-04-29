const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

function getUserbyId(id){
    return User.findById(id);
}

function getUserbyUsername(username){
    const query = {username: username};
    return User.findOne(query);
}

function addUser(newUser){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            return newUser.save();
        });
    });
}

function comparePassword(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports = {
    addUser: addUser,
    getUserbyUsername: getUserbyUsername,
    getUserbyId: getUserbyId,
    User: User,
    comparePassword: comparePassword
}

