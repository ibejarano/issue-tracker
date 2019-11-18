const router = require('express').Router();
const User = require('../models/user.model');

// GET ALL THE USERS
router.route('/').get((req,res) =>{
    User.find()
        .then( data => res.json(data) )
        .catch((err) => res.status(400).json('Error ocurred!' + err))
})

// GET ONE USER INFO
router.route('/info').get((req,res) =>{
    console.log('INFO: /route/info', req.user.username)
    res.status(200).json(req.user)
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

// LOGOUT

router.route('/logout').post( async (req, res) =>{
    try {
        console.log('INFO: Logging out User', req.user)
        req.user.token = ''
        await req.user.save()
        res.send('Logout succesful!')
    } catch(error){
        console.log(error.toString())
        res.status(500).send(error)
    }
});

module.exports = router;