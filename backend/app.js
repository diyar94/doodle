const express = require('express');
const router = require('./routes/router');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();



const app = express();


app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

mongoose.connect(process.env.DB_URI, {
    dbName: 'doodle',
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('open', () =>
{
    console.log('connected to Db.....');
});


const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', router);

app.listen(port, () =>
{
    console.log(`App listening on port: ${port}`);
});