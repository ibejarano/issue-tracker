const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const data = await jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id});
            if (!user) {
            next( new Error('User ID not finded!'))
            }
            req.user = user;
            req.token = token;
            next();
    } catch(error){
        next(error);
    }
}

module.exports = auth;