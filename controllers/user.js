const User = require("../models/user.model");

exports.getAll = async (req, res) => {
  console.log("Getting all users info!");
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log("Get All users Error:", error.toString());
    res.status(400).json(error.toString());
  }
};

exports.getInfo = (req, res) => {
  console.log("INFO: /route/info", req.user.username);
  res.status(200).json(req.user);
};

exports.register = async (req, res) => {
  console.log('Registering new user')
  try {
    const { password, passwordConf } = req.body;
    if (password === passwordConf) {
      console.log('Passwords match!')
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      if (savedUser && savedUser.isDev) {
        console.log('New Dev registered!')
        res.json("new Developer registered!");
      } else {
        console.log('New user registered!')
        res.json("new User registered!");
      }
    } else {
      console.log("Passwords dont match!");
      res.json("pass dont match");
    }
  } catch (error) {
    console.log('Error...:', error.toString())
    res.status(400).json({
      type: "error",
      message: error.message
    });
  }
};

exports.login = async (req, res) =>{
  try {
      const { email , password} = req.body;
      console.log('Logging user with email', email);
      console.log('Logging user with pass', password);
      const userAuth = await User.authenticate(email, password);
      const token = await userAuth.generateAuthToken();
      res.status(200).send({userAuth, token})
  } 
  catch(error){
      res.status(401).json({
          type: 'error',
          message: error.message
      })
  }
}

exports.logout = async (req, res) => {
  try {
    console.log("INFO: Logging out User", req.user);
    req.user.token = "";
    await req.user.save();
    res.status(200).json("Logout succesful!");
  } catch (error) {
    console.log(error.toString());
    res.status(500).json(error.toString());
  }
};

exports.delete = async (req, res) => {
  try {
      const deleteResponse = await User.findByIdAndDelete(req.params.id);
      console.log('User deleted!', deleteResponse);
      res.status(200).json('User deleted!')
  } catch (error) {
      console.log('Error deleting issue!')
      res.status(500).json('Error deleting the issue!')
  }
}