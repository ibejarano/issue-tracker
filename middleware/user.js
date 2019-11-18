const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const userInfo = async(req,res,next) => {
    try {
       const token = req.header('Authorization').replace('Bearer ','');
       try {
        const data = await jwt.verify(token, process.env.JWT_KEY);
        try {
            const user = await User.findOne({ _id: data._id});
            if (!user) {
                next( new Error('Unauthorized') )
            }
            req.user = user;
            next();
        } catch(error){
            next( new Error('Not authorized to acces this resource') )
        }
    } catch(error){
        res.status(401).send({error: 'Cannot verify with JWT'})
    }
    } catch(error) {
        throw new Error('Unauthorized')
    }

}

module.exports = userInfo;