const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
var db, collectionBooks;
const PORT = process.env.PORT || 8002;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, Express!')
});

app.get('/books', (req, res) => {
    collectionBooks.find().toArray((err, results) => {
        if(err) console.log(err)
        res.send(results)
    })
});

MongoClient.connect(process.env.DB_CONN, (err, client) => {
    if(err) console.log(err)
    db = client.db('books-shop');
    collectionBooks = db.collection('books')

    console.log('MongoDB is connected')


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
});