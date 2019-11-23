const Bug = require('../models/bug.model');

exports.getAll = async (req, res) => {
    try {
        const issues = await Bug.find().populate("assignee");
        console.log('Getting all the issues!', issues)
        res.status(200).json({ issues, user: req.user })

    } catch (error) {
        console.log(' And error has ocurred! ', error.toString())
        res.status(400).json('An error has ocurred getting all the Issues: ' + error.toString())
    }
}

exports.getById = async (req, res) => {
    try {
        console.log('Issue request #', req.params.id);
        const issue = await Bug.findById(req.params.id);
        res.status(200).json({ issue, user: req.user });
    } catch (error) {
        console.log(' And error has ocurred! ', error.toString())
        res.status(400).json('An error has ocurred getting this Issue: ' + error.toString())
    }
}

exports.add = async (req, res) => {
    try {
        // TODO: Make this shorter
        // 1. view req.body properties and save directly
        const priority = req.body.priority;
        const status = req.body.status;
        const title = req.body.title;
        const type = req.body.type;
        const newIssue = new Bug({
            priority,
            status,
            title,
            type
        })
        const saveResponse = await newIssue.save();
        console.log('New Issue Registered!');
        res.status(200).json(saveResponse)

    } catch (error) {
        console.log(error.toString());
        res.status(500).json(error.toString());
    }
}

exports.update = async (req, res) => {
    try {
        console.log('Updating issue #', req.params.id);
        const id = req.params.id
        const issue = await Bug.findByIdAndUpdate(id, req.body);
        console.log('Succesful issue update!')
        res.status(200).json(issue);
    } catch (error) {
        console.log('Error ocurred during issue editing!', error.toString());
        res.status(500).json(error.ToString());
    }
}

exports.delete = async (req, res) => {
    try {
        const deleteResponse = await Bug.findByIdAndDelete(req.params.id);
        console.log('Issue deleted!', deleteResponse);
        res.status(200).json('Issue #' + req.params.id + ' deleted!')
    } catch (error) {
        console.log('Error deleting issue!')
        res.status(500).json('Error deleting the issue!')
    }
}

exports.addComment = async (req, res) => {
    try {
        const id = req.params.id;
        const author = req.user.username;
        req.body.author = author
        const issue = await Bug.findById(id)
        issue.comments.push(req.body)
        const saved = await issue.save()
        console.log('new omment saved!', saved);
        res.status(200).json('Comment added succesully!')
    } catch (error) {
        console.log('Error ocurrend when adding a comment!', error.ToString())
        res.status(400).json(error);
    }
}
