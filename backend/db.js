const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
require('dotenv').config();


const getDb = () =>
{
    return MongoClient.connect(process.env.DB_URI, {useUnifiedTopology: true}).then(client =>
    {
        console.log('Connection to DB established');
        const db = client.db('doodle');
        const images = db.collection('images');
        return db;
    }).catch(err =>
    {
        console.log(err);
    });
};

module.exports = getDb;