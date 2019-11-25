const router = require('express').Router();
const issueHandler = require('../controllers/issue-handlers');
const userHandler = require('../controllers/user');

router.route('/').get(issueHandler.getAll)

router.route('/:id').get(issueHandler.getById)

router.route('/').post(issueHandler.add,  userHandler.updateActivityLog);

router.route('/:id').put(issueHandler.update, userHandler.updateActivityLog )

router.route('/:id').delete(issueHandler.delete)

router.route('/add-comment/:id').put(issueHandler.addComment, userHandler.updateActivityLog)

module.exports = router;