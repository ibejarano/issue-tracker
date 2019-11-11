const router = require('express').Router();
let User = require('../models/user.model');

// GET ALL THE USERS
router.route('/').get((req,res) =>{
    User.find()
        .then( data => res.json(data) )
        .catch((err) => res.status(400).json('Error ocurred!' + err))
})

// REGISTER NEW USER
router.route('/register').post((req, res) => {
    const username = req.body.username
    const password = req.body.password
    const passwordConf = req.body.passwordConf
    const email = req.body.email
    const isDev = req.body.isDev

    if (password === passwordConf){
        const newUser = new User({
            username,
            email,
            password,
            isDev
        })
        newUser.save()
        .then( () => {
            if (isDev){
                res.json('new Developer registered!')
            } else {
                res.json('new User registered!')} 
            })
        .catch(err => res.status(400).json('Error ocurred: '+ err))
    }
    else{
        res.status(400).json('Passwords dont match!')
    }

})

// LOGIN
router.route('/login').post((req, res, next) => {
    const password = req.body.password
    const email = req.body.email
    if(email && password){
        User.authenticate(email, password, function(err, user){
            if(err || !user){
                return res.json('Wrong email or password')
            } else {
                req.session.userId = user._id;
                return res.json('login succesful!')
            }
        })
    } else {
        return res.status(401).json('Email and password are required.');
    }
});


module.exports = router;