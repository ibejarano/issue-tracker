const Bug = require("../models/bug.model");

exports.getAll = async (req, res) => {
  try {
    let queryOpt;
    const { query } = req;
    const { rows, page, status } = query;

    if (!rows || !page) {
      throw new Error("No se especifico parametros del query");
    }

    if (status != "Cerrado") {
      queryOpt = { status: { $ne: "Cerrado" } };
    } else {
      queryOpt = { status: "Cerrado" };
    }

    const totalCount = await Bug.countDocuments(queryOpt);

    const issues = await Bug.find(queryOpt)
      .skip(parseInt(page * rows))
      .limit(parseInt(rows))
      .sort({ updatedAt: -1 })
      .populate("assignee");
    res.status(200).json({ issues, totalCount, page: parseInt(page) });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json(error.toString());
  }
};

exports.getById = async (req, res) => {
  try {
    const issue = await Bug.findById(req.params.id)
      .populate("assignee")
      .populate({
        path: "comments.updateStatus.assignee",
      })
      .exec();
    res.status(200).json({ issue, user: req.user });
  } catch (error) {
    res.status(400).json(error.toString());
  }
};

exports.add = async (req, res, next) => {
  try {
    const { priority, status, title, type } = req.body;
    const newIssue = new Bug({
      priority,
      status,
      title,
      type,
    });
    await newIssue.save();
    req.activityLogMsg = `Nuevo Issue agregado: ${newIssue.title}`;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const issue = await Bug.findByIdAndUpdate(id, req.body);
    issue.comments.push({
      text: "Estado actualizado",
      author: req.user.username,
      updateStatus: req.body,
    });
    await issue.save();
    req.activityLogMsg = `Actualización de estado: ${issue.title}`;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    await Bug.findByIdAndDelete(req.params.id);
    res.status(200).json("Issue eliminado");
  } catch (error) {
    res.status(400).json("Error eliminando issue");
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = req.user.username;
    req.body.author = author;
    const issue = await Bug.findById(id);
    req.activityLogMsg = `Nuevo comentario en: ${issue.title}`;
    issue.comments.push(req.body);
    await issue.save();
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
