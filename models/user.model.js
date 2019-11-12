const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    isDev: {
        type: Boolean,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
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

UserSchema.statics.authenticate = async (email, password) => {
    const user = await User.findOne({email}).exec();
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}

UserSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token
}

const User = mongoose.model('User', UserSchema);

module.exports = User;