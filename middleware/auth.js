const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async(req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ','');
    const data = await jwt.verify(token, process.env.JWT_KEY);
    try {
        try {
            const user = await User.findOne({ _id: data._id , 'tokens.token': token });
            if (!user) {
                throw new Error()
            }
            req.user = user;
            req.token = token;
            next();
        } catch(error){
            res.status(401).send({error: 'Not authorized to acces this resource'})
        }
    } catch(error){
        res.status(401).send({error: 'Cannot verify with JWT'})
    }
}

module.exports = auth;