const Bug = require("../models/bug.model");

exports.getAll = async (req, res) => {
  try {
    console.log("[Controller Issues]: Getting all the issues from db");
    const issues = await Bug.find().populate("assignee");
    console.log("[Controller Issues]: Succesful! Retrieving...");
    res.status(200).json({ issues, user: req.user });
  } catch (error) {
    console.log(
      "[Controller Issues]: And error has ocurred! ",
      error.toString()
    );
    res
      .status(400)
      .json("An error has ocurred getting all the Issues: " + error.toString());
  }
};

exports.getById = async (req, res) => {
  try {
    console.log("[Controller Issues]: Issue request from db #", req.params.id);
    const issue = await Bug.findById(req.params.id).populate("assignee");
    console.log("[Controller Issues]: Succesful! retrieving");
    res.status(200).json({ issue, user: req.user });
  } catch (error) {
    console.log(
      "[Controller Issues]: And error has ocurred! ",
      error.toString()
    );
    res
      .status(400)
      .json("An error has ocurred getting this Issue: " + error.toString());
  }
};

exports.add = async (req, res, next) => {
  try {
    console.log("[Controller Issues]: Registering new issue:");
    const priority = req.body.priority;
    const status = req.body.status;
    const title = req.body.title;
    const type = req.body.type;
    const newIssue = new Bug({
      priority,
      status,
      title,
      type
    });
    await newIssue.save();
    console.log("[Controller Issues]: New Issue Registered!");
    req.activityLogMsg = "New Issue added: " + newIssue.title;
    next();
  } catch (error) {
    console.log(
      "[Controller Issues]: Error during issue register",
      error.toString()
    );
    res.status(400).json(error.toString());
  }
};

exports.update = async (req, res, next) => {
  try {
    console.log("[Controller Issues]: Updating issue #", req.params.id);
    const id = req.params.id;
    const issue = await Bug.findByIdAndUpdate(id, req.body);
    issue.comments.push({
      text: "Update Issue State",
      author: req.user.username,
      updateStatus: req.body
    });
    console.log(issue);
    await issue.save();
    console.log("[Controller Issues]: Succesful issue update!");
    req.activityLogMsg = "Update issue: " + issue.title;
    next();
  } catch (error) {
    console.log(
      "[Controller Issues]: Error ocurred during issue editing!",
      error.toString()
    );
    res.status(400).json(error.ToString());
  }
};

exports.delete = async (req, res) => {
  try {
    console.log("[Controller Issues]: Deleting issue");
    const deleteResponse = await Bug.findByIdAndDelete(req.params.id);
    console.log("[Controller Issues]: Issue deleted!", deleteResponse);
    res.status(200).json("Issue #" + req.params.id + " deleted!");
  } catch (error) {
    console.log("[Controller Issues]: ERROR deleting issue", error.toString());
    res.status(400).json("Error deleting the issue!");
  }
};

exports.addComment = async (req, res, next) => {
  try {
    console.log("[Controller Issues]: Saving new comment");
    const id = req.params.id;
    const author = req.user.username;
    req.body.author = author;
    const issue = await Bug.findById(id);
    req.activityLogMsg = "New comment added in issue: " + issue.title;
    console.log(
      "[Controller Issues]: New comment added in issue: " + issue.title
    );
    issue.comments.push(req.body);
    await issue.save();
    next();
  } catch (error) {
    console.log(
      "[Controller Issues]: Error ocurrend when adding a comment!",
      error.toString()
    );
    res.status(400).json(error);
  }
};
