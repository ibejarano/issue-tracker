const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10 , function(err, hash){
        if(err){
            return next(err)
        }
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;