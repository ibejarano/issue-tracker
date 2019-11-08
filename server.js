const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

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

const bugsRouter = require('./routes/bugs');
// const userRouter = require('./routes/users');

app.use('/bugs', bugsRouter);
// app.use('/users', userRouter);


app.listen(port , () => {
    console.log(`Server is running on port: ${port}`);
});