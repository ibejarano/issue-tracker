const User = require('../models/user.model');
const Bug = require('../models/bug.model');
const bcrypt = require('bcrypt');

const authTokens = {};

exports.getAll = async (req, res) => {
  console.log('[Controller User]: Getting all users info!');
  try {
    if (req.user.role) {
      throw new Error('You must have Admin privileges to view/edit this page');
    }
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log('[Controller User]: Get All users Error:', error.toString());
    res.status(401).json(error.toString());
  }
};

exports.getInfo = async (req, res) => {
  console.log('[Controller User]: Getting user info!');
  const issues = await Bug.find({assignee: req.user._id});
  res.status(200).json({user: req.user, issues});
};

exports.getUsernameById = async (req, res) => {
  try {
    console.log('[Controller User]: Getting username for id!', req.params.id);
    const user = await User.findById(req.params.id);
    res.status(200).json(user.username);
  } catch (error) {
    console.log('[Controller User]: Cannot get user info:', error.toString());
    res.status(400).json(error.toString());
  }
};

exports.register = async (req, res) => {
  console.log('[Controller User]: Registering new user');
  try {
    const {password, passwordConf} = req.body;
    if (password === passwordConf) {
      console.log('[Controller User]: Passwords match');
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      if (savedUser && savedUser.isDev) {
        console.log('New Dev registered!');
        res.json('new Developer registered!');
      } else {
        console.log('New user registered!');
        res.json('new User registered!');
      }
    } else {
      console.log('[Controller User]: Passwords dont match!');
      res.json('pass dont match');
    }
  } catch (error) {
    console.log('[Controller User]: Error:', error.toString());
    res.status(400).json('Cannot register:' + error.toString());
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log('[Controller User]: Logging user with email', email);
    console.log('[Controller User]: Logging user with pass', password);
    const userAuth = await User.authenticate(email, password);
    const token = await userAuth.generateAuthToken();
    authTokens[token] = userAuth;
    res.cookie('Issue-tracker-cookie', token 
    ).send('cookie set');
  } catch (error) {
    console.log('[Controller User]: Error login:', error.toString());
    res.status(400).json('Cannot login:' + error.toString());
  }
};

exports.logout = async (req, res) => {
  try {
    console.log('[Controller User]: Logging out User', req.user);
    req.user.token = req.body.token;
    await req.user.save();
    console.log('[Controller User]: Logout succesful!');
    res.status(200).json('Logout succesful!');
  } catch (error) {
    console.log('[Controller User]: error.toString()');
    res.status(500).json(error.toString());
  }
};

exports.delete = async (req, res) => {
  try {
    const deleteResponse = await User.findByIdAndDelete(req.params.id);
    console.log('[Controller User]: User deleted!', deleteResponse);
    res.status(200).json('User deleted!');
  } catch (error) {
    console.log('[Controller User]: Error deleting issue!' + error.toString());
    res.status(400).json('Error deleting the issue!');
  }
};

exports.updateActivityLog = async (req, res) => {
  try {
    console.log(
      '[Controller User]: Saving activity for... ' + req.user.username,
    );
    const activityMsg = req.activityLogMsg;
    const user = req.user;
    user.activities.push(activityMsg);
    await user.save();
    console.log(
      '[Controller User]: Update activity of user: ' + req.user.username,
    );
    res.status(200).json('Update activity of user: ' + req.user.username);
  } catch (error) {
    res
      .status(400)
      .json(
        '[Controller User]: Fail to update user activity ' + error.toString(),
      );
  }
};

exports.update = async (req, res, next) => {
  try {
    const updateResponse = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    req.activityLogMsg = '[Admin Only] User Edit';
    console.log('[Controller User]: User Edit', updateResponse);
    next();
  } catch (error) {
    console.log('[Controller User]: Error deleting issue!' + error.toString());
    res.status(400).json('Error deleting the issue!');
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    console.log('[Controller User]: Changing passwords');

    const {password, passwordConf} = req.body;
    if (password === passwordConf) {
      console.log('[Controller User]: Passwords match');
      const passwordCrypt = await bcrypt.hash(password, 10);
      const params = {password: passwordCrypt};
      console.log(params);
      const savedUser = await User.findByIdAndUpdate(req.params.id, params);
      console.log(
        '[Controller User]: Changed password for: ' + savedUser.username,
      );
    } else {
      console.log('[Controller User]: Passwords dont match!');
      res.status(400).json('pass dont match');
    }
    req.activityLogMsg = '[Admin Only] User Edit';
    next();
  } catch (error) {
    console.log('[Controller User]: Error deleting issue!' + error.toString());
    res.status(400).json('Error deleting the issue!');
  }
};

exports.authUser = async (req, res, next) => {
  try {
    console.log('[AUTH COOKIES]');
    const cookieToken = req.cookies['Issue-tracker-cookie'];
    req.user = authTokens[cookieToken];
    next();
  } catch {
    console.log('UNREGISTERED USER OR MISSING COOKIE');
  }
};
