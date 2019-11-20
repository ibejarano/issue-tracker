const router = require('express').Router();
const Bug = require('../models/bug.model');
const issueHandler = require('../controllers/issue-handlers');

router.route('/').get(issueHandler.getAll)

router.route('/:id').get(issueHandler.getById)

router.route('/').post(issueHandler.add);

router.route('/:id').put(issueHandler.update)

router.route('/:id').delete(issueHandler.delete)

router.route('/add-comment/:id').put(issueHandler.addComment)

module.exports = router;