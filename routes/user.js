const router = require('express').Router();
const User = require('../models/user.model');

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
    const isAdmin = req.body.isAdmin

    if (password === passwordConf){
        const newUser = new User({
            username,
            email,
            password,
            isDev,
            isAdmin
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
router.route('/login').post( async (req, res) =>{
        try {
            const { email , password} = req.body;
            const user = await User.authenticate(email, password);
            if(!user){
                return res.status(401).send(({error: 'Login failed! Check inputs'}))
            }
            //const token = await user.generateAuthToken();
            //res.send({user, token})
            return res.status(200).json('Login succesful!')
        } 
        catch(error){
            return res.status(400).json(error)
        }
    }
);

module.exports = router;