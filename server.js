const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const user = require('./middleware/user')
const User = require('./models/user.model');
const userHandler = require('./controllers/user');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection ;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.");
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}) )


app.use( '/bugs', auth );

app.use( '/user', user );

const bugsRouter = require('./routes/bugs');
const userRouter = require('./routes/user');

app.post('/login', userHandler.login);
app.post('/register', userHandler.register);

app.use('/bugs', bugsRouter);
app.use('/user', userRouter);

app.use(function(error, req, res, next) {
    console.log(error.toString())
    res.json({ message: error.message });
  });

app.listen(port , () => {
    console.log(`Server is running on port: ${port}`);
});