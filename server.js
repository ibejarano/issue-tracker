const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userHandler = require('./controllers/user');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully.');
});

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,POST,PATCH,DELETE,PUT,OPTIONS',
  credentials: true, // required to pass
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/cookie', (req, res) => {
  const options = {
    httpOnly: true,
  };
  console.log('Sending cookie!')
  console.log('cookies from client:', req.cookies)
  res.cookie('cookiename', 'cookievalue', options)
    .status(200)
    .send('cookie sent!');
});
app.use('/bugs', userHandler.authUser);

app.use('/user', userHandler.authUser);

const bugsRouter = require('./routes/bugs');
const userRouter = require('./routes/user');

app.post('/login', userHandler.login);
app.post('/register', userHandler.register);

app.use('/bugs', bugsRouter);
app.use('/user', userRouter);


app.use(function(error, req, res, next) {
  console.log(error.toString());
  res.json({message: error.message});
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
