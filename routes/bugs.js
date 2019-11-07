const router = require('express').Router();
let Bug = require('../models/bug.model');

// SHOW BUGS
router.route('/').get((req,res) => {
    Bug.find()
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json('Error: '+err));
})

// ADD A BUG
router.route('/add').post((req, res) =>{
    console.log(req.body)
    const severity = req.body.severity;
    const priority = req.body.priority;
    const assignee = req.body.assignee;
    const state = req.body.state;
    const resolution = req.body.resolution;
    const shortDescription = req.body.shortDescription;
    const dateOpen = new Date()

    const newBug = new Bug({
        severity,
        priority,
        assignee,
        state,
        resolution,
        shortDescription,
        dateOpen
    })

    newBug.save()
        .then(()=> res.json('New Bug Registered'))
        .catch(err => res.status(400).json('Error: '+err))
});

module.exports = router;