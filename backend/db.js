const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://diyar:Osmanali1994@mycluster.5bkea.mongodb.net/doodle?retryWrites=true&w=majority';
const mongoose = require('mongoose');


const getDb = () =>
{
    return MongoClient.connect(uri, {useUnifiedTopology: true}).then(client =>
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