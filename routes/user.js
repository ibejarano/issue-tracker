const router = require('express').Router();
const User = require('../models/user.model');

// GET ALL THE USERS
router.route('/').get((req,res) =>{
    User.find()
        .then( data => res.json(data) )
        .catch((err) => res.status(400).json('Error ocurred!' + err))
})

// REGISTER NEW USER
router.route('/register').post( async (req, res) => {
    try {
        const {username, password, passwordConf, email, isDev, isAdmin} = req.body
        if (password === passwordConf){
            const newUser = new User({
                username,
                email,
                password,
                isDev,
                isAdmin
            })
            const savedUser = await newUser.save()
            if (savedUser && savedUser.isDev){
                res.json('new Developer registered!')
            } else if (savedUser){
                res.json('new User registered!')
            } else {
                throw new Error('Error saving user!')    
            }
        }
        else {
            //console.log('Passwords dont match!')
            //res.json('pass dont match')
            throw new Error('Passwords dont match!')
        }
    } catch(error){
        res.status(400).json({
            type: 'error',
            message: error.message})
    }
})

// LOGIN
router.route('/login').post( async (req, res) =>{
        try {
            const { email , password} = req.body;
            const user = await User.authenticate(email, password);
            const token = await user.generateAuthToken();
            res.json('Token generated! ' + token)
            res.send({user})
            return res.status(200).json('Login succesful!')
        } 
        catch(error){
            return res.status(400).json({
                type: 'error',
                message: error.message
            })
        }
    }
);

module.exports = router;