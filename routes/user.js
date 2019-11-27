const router = require('express').Router();
const User = require('../models/user.model');
const userHandler = require('../controllers/user');

router.route('/').get( userHandler.getAll )

router.route('/username/:id').get( userHandler.getUsernameById )

router.route('/info').get( userHandler.getInfo )

router.route('/logout').put( userHandler.logout );

router.route('/:id').delete( userHandler.delete );

router.route('/:id').put( userHandler.update, userHandler.updateActivityLog );

router.route('/change-password/:id').put( userHandler.changePassword , userHandler.updateActivityLog )


module.exports = router;