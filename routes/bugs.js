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
        .then(bug => res.json({bug, user:req.user}))
        .catch(err => res.status(400).json('Error: '+ err));
})

// ADD A BUG
router.route('/add').post( async (req, res) =>{
    try{
        const priority = req.body.priority;
        const status = req.body.status;
        const title = req.body.title;
        const type = req.body.type;
        const newBug = new Bug({
            priority,
            status,
            title,
            type
        })
    
        const saveResponse =  await newBug.save();
        console.log('New Bug Registered!');
        res.status(200).json(saveResponse)

    } catch(error){
        console.log(error.toString())
    }
});

// UPDATE BUG REGISTRY

router.route('/update/:id').put(async (req, res) =>{
    try{

        console.log('Editing bug #', req.params.id);
        const id = req.params.id
        const bug = await Bug.findById(id);
        console.log('Bug finded in db! #:', bug._id);
        Object.assign(bug, req.body);
        const resFromDb = await bug.save();
        console.log('Succesful bug update!')
        res.status(200).json(resFromDb);
    } catch(error){
        console.log('Error ocurred during bug editing!', error.toString());
        res.status(500).json(error);
    }
})

// DELETE BUG REGISTRY 
router.route('/:id').delete( async (req,res) => {
    const id = req.params.id;
    try{
        const res = await Bug.findByIdAndDelete(id);
        res.status(200).json('Bug #' + id + ' deleted!')
    } catch(error) {
        res.status(500).json('Error deleting the bug!')
    }
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