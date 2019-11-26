const router = require('express').Router();
const User = require('../models/user.model');
const userHandler = require('../controllers/user');

router.route('/').get( userHandler.getAll )

router.route('/info').get( userHandler.getInfo )

router.route('/logout').put( userHandler.logout );

router.route('/:id').delete( userHandler.delete );

router.route('/:id').put( userHandler.update, userHandler.updateActivityLog );


module.exports = router;