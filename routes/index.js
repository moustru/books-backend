const mongoose = require('mongoose');
const jsonParser = require('express').json();
const Book = mongoose.model('Book');

const mainPage = (req, res) => {
    res.send('Hello, Express!');
}

const getBooks = (req, res) => {
    Book.find((err, results) => {
        if(err) console.log(err);

        res.send(results);
    })
}

const addBook = (req, res) => {
    if(!req.body) res.status(400).json('Проверьте правильность заполненных полей');

    Book.create({
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    }, err => {
        if(err) console.log(err);
        res.json({ message: 'Добавлено' });
    })
}

const deleteBook = (req, res) => {
    Book.findOneAndDelete({ _id: req.params.id }, err => {
        if(err) console.log(err);
        res.json({ message: 'Книга удалена' })
    })
}

module.exports = app => {
    app.get('/', mainPage);
    app.get('/books', getBooks);
    app.post('/books/add', jsonParser, addBook);
    app.delete('books/:id/delete', deleteBook);
}