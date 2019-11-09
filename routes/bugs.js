const router = require('express').Router();
let Bug = require('../models/bug.model');


// SHOW BUGS
router.route('/').get((req,res) => {
    Bug.find()
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json('Error: '+err));
})

// GET A SINGLE BUG INFO
router.route('/update/:id').get((req,res) => {
    Bug.findById(req.params.id)
        .then(bug => res.json(bug))
        .catch(err => res.status(400).json('Error: '+ err));
})

// ADD A BUG
router.route('/add').post((req, res) =>{
    const severity = req.body.severity;
    const priority = req.body.priority;
    const assignee = req.body.assignee;
    const state = req.body.state;
    const resolution = req.body.resolution;
    const shortDescription = req.body.shortDescription;

    const newBug = new Bug({
        severity,
        priority,
        assignee,
        state,
        resolution,
        shortDescription
    })

    newBug.save()
        .then(()=> res.json('New Bug Registered'))
        .catch(err => res.status(400).json('Error: '+err))
});

// UPDATE BUG REGISTRY

router.route('/update/:id').put((req, res) =>{
    const id = req.params.id;
    Bug.findById(id)
        .then(bug => {
            Object.assign(bug, req.body);
            bug.save()
                .then(() => res.json('Bug info. Updated!'))
                .catch(err => res.status(400).json('Error: ' + err) );
        })
        .catch(err => res.status(400).json('Error: ' + err) );
})

// DELETE BUG REGISTRY 
router.route('/:id').delete((req,res) => {
    const id = req.params.id;
    Bug.findByIdAndDelete(id)
        .then(() => res.json('Bug #' + id + ' deleted!'))
        .catch(err => res.status(400).json('Cannot delete Err: '+ err) );
})

module.exports = router;