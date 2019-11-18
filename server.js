const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const user = require('./middleware/user')
const User = require('./models/user.model');

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

app.post('/login', async (req, res) =>{
    try {
        const { email , password} = req.body;
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
);

app.use('/bugs', bugsRouter);
app.use('/user', userRouter);

app.use(function(error, req, res, next) {
    console.log(error.toString())
    res.json({ message: error.message });
  });

app.listen(port , () => {
    console.log(`Server is running on port: ${port}`);
});