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
        required: false,
        default: false
    },
    isDev: {
        type: Boolean,
        required: false,
        default: false
    },
    token: {
        type: String,
        required: false
    },
    issues: {
        type: Schema.Types.ObjectId,
        ref: "Bug"
    },
    activities: [
        {
            type: String,
            required: false
        }
    ]
});

UserSchema.pre('save', async function(next){
    let user = this;
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
    next();
});

UserSchema.statics.authenticate = async (email, password) => {
    try{

        const user = await User.findOne({email});
        if (!user) {
            throw new Error('Invalid user')
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            throw new Error('Invalid login credentials')
        }
        return user
    } catch(err){
        return err
    }
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.token = token
    await user.save()
    return token
}

const User = mongoose.model('User', UserSchema);

module.exports = User;