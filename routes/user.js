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

    if (password === passwordConf){
        const newUser = new User({
            username,
            email,
            password
        })
        newUser.save()
        .then( () => res.json('new user registered!') )
        .catch(err => res.status(400).json('Error ocurred: '+ err))
    }
    else{

        res.status(400).json('Passwords dont match!')
    }

})


module.exports = router;