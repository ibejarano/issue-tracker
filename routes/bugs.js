const router = require('express').Router();
const Bug = require('../models/bug.model');


// SHOW BUGS
router.route('/').get((req,res) => {
    Bug.find()
        .then(bugs => {
            res.json({bugs, user: req.user})})
        .catch(err => res.status(400).json('Error: '+err));
})

// GET A SINGLE BUG INFO
router.route('/:id').get((req,res) => {
    console.log('Bug request #', req.params.id)
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
                .then(()=> res.redirect('/'))
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

// ADD A COMMENT TO A BUG
router.route('/add-comment/:id').put( async (req, res) =>{
    const id = req.params.id;
    const author = req.user.username;
    req.body.author = author
    try{
        const bug = await Bug.findById(id)
        bug.comments.push(req.body)
        const saved = await bug.save()
        console.log(saved);
        res.status(200).json(saved)
    } catch(error){
        console.log('Error', error)
        res.status(400).json(error)
    }
})

module.exports = router;