const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async(req,res,next) => {
    try{
        console.log('[AUTH Middleware]')
        console.log("headers", req.header("Authorization"));
        const token = req.header('Authorization').replace('Bearer ','');
        const data = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({ _id: data._id});
            if (!user) {
            next( new Error('User ID not finded!'))
            }
            req.user = user;
            req.token = token;
            console.log('authentication succesful!')
            next();
    } catch(error){
        res.status(401).json('Error during Auth' + error.toString())
    }
}

module.exports = auth;