const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

//connect to DB
mongoose.connect('mongodb+srv://SP:sp@1995@cluster0-yc0d1.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },() => 
    console.log('connected to db')
);


app.use(express.json());



//Route middeleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and running'));